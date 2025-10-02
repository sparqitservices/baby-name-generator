const ABACUS_ENDPOINT = 'https://api.abacus.ai/api/v0/chat';

const ALLOWED_GENDERS = new Set(['boy', 'girl', 'any']);
const ALLOWED_RELIGIONS = new Set([
  'muslim',
  'hindu',
  'christian',
  'sikh',
  'buddhist',
  'jain',
  'jewish'
]);

export async function POST(request) {
  try {
    const {
      gender = 'any',
      religion = 'muslim',
      style = 'modern',
      count = 20
    } = await request.json();

    const normalizedGender = normalizeValue(gender, ALLOWED_GENDERS, 'any');
    const normalizedReligion = normalizeValue(
      religion,
      ALLOWED_RELIGIONS,
      'muslim'
    );
    const normalizedStyle = String(style || 'modern').trim().toLowerCase();
    const normalizedCount = clamp(Number(count) || 20, 1, 100);

    console.log('📝 Request params:', {
      gender: normalizedGender,
      religion: normalizedReligion,
      style: normalizedStyle,
      count: normalizedCount
    });

    const apiKey = process.env.ABACUS_API_KEY;
    if (!apiKey) {
      console.error(
        '❌ Missing ABACUS_API_KEY env variable. Using fallback names.'
      );
      return Response.json({
        names: getFallbackNames(normalizedGender, normalizedReligion, Math.min(normalizedCount, 10)),
        isApiWorking: false,
        message: 'Using sample names. Configure API key for AI-generated names.'
      });
    }

    console.log('🔑 API key detected:', apiKey.substring(0, 15) + '...');

    const prompt = buildPrompt({
      gender: normalizedGender,
      religion: normalizedReligion,
      style: normalizedStyle,
      count: normalizedCount
    });

    console.log('🚀 Calling Abacus API at:', ABACUS_ENDPOINT);

    const response = await fetch(ABACUS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful baby name expert. Always respond with valid JSON arrays only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        deploymentId: 'gpt-4o'
      }),
      signal: AbortSignal.timeout(45_000)
    });

    console.log('📡 API response status:', response.status);
    console.log('📡 API response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await safeReadText(response);
      console.error('❌ API error payload:', errorText);
      return Response.json({
        names: getFallbackNames(normalizedGender, normalizedReligion, Math.min(normalizedCount, 10)),
        isApiWorking: false,
        message: `API error (${response.status}). Showing sample names.`
      });
    }

    const payload = await response.json();
    console.log('✅ API Response:', JSON.stringify(payload).substring(0, 500));

    // Extract text from response
    let responseText = '';
    if (payload.response) {
      responseText = payload.response;
    } else if (payload.choices && payload.choices[0]?.message?.content) {
      responseText = payload.choices[0].message.content;
    } else if (payload.text) {
      responseText = payload.text;
    } else if (payload.content) {
      responseText = payload.content;
    }

    console.log('📄 Extracted text:', responseText.substring(0, 300));

    const parsedNames = extractNames(responseText, normalizedCount);

    if (parsedNames.length === 0) {
      console.warn('⚠️ No valid names parsed from Abacus response.');
      console.debug('🔍 Raw response text:', responseText.substring(0, 500));
      return Response.json({
        names: getFallbackNames(normalizedGender, normalizedReligion, Math.min(normalizedCount, 10)),
        isApiWorking: false,
        message: 'Could not parse AI response. Showing sample names.'
      });
    }

    console.log(`🎉 Returning ${parsedNames.length} names from Abacus.`);
    return Response.json({
      names: parsedNames.slice(0, normalizedCount),
      isApiWorking: true
    });
  } catch (error) {
    console.error('❌ Unhandled server error:', error);
    console.error('❌ Error stack:', error.stack);
    const { gender = 'any', religion = 'muslim', count = 20 } = await request.json().catch(() => ({}));
    return Response.json({
      names: getFallbackNames(gender, religion, Math.min(count, 10)),
      isApiWorking: false,
      message: 'Server error. Showing sample names.'
    });
  }
}

function normalizeValue(value, allowedSet, fallbackValue) {
  const normalized = String(value || '').trim().toLowerCase();
  return allowedSet.has(normalized) ? normalized : fallbackValue;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function buildPrompt({ gender, religion, style, count }) {
  const genderText =
    gender === 'any' ? 'unisex or any gender' : `${gender} babies`;
  return `Generate exactly ${count} unique baby names that match all of the following filters:
- Gender: ${genderText}
- Religion/Cultural tradition: ${religion}
- Style or vibe: ${style}

For every name respond with a JSON object following this schema:
{
  "name": "string",
  "meaning": "string – detailed description of the meaning and significance",
  "origin": "string – cultural or linguistic origin",
  "gender": "boy | girl | any"
}

Return ONLY a valid JSON array (no prose, no markdown, no commentary). Example:
[{"name":"Amina","meaning":"Trustworthy","origin":"Arabic","gender":"girl"}]

Generate the ${count} names now.`;
}

function extractNames(text, desiredCount) {
  if (!text || typeof text !== 'string') return [];

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) return [];

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.name === 'string' &&
          item.name.trim().length > 0 &&
          typeof item.meaning === 'string' &&
          typeof item.origin === 'string' &&
          typeof item.gender === 'string'
      )
      .map((item) => ({
        name: item.name.trim(),
        meaning: item.meaning.trim(),
        origin: item.origin.trim(),
        gender: item.gender.trim().toLowerCase(),
        style: item.style?.trim() ?? '',
        pronunciation: item.pronunciation?.trim() ?? '',
        translation: typeof item.translation === 'object' ? item.translation : {}
      }))
      .slice(0, desiredCount);
  } catch (error) {
    console.error('❌ Failed to parse Abacus response JSON:', error);
    return [];
  }
}

async function safeReadText(response) {
  try {
    return await response.text();
  } catch (err) {
    console.error('⚠️ Unable to read error response body:', err);
    return '';
  }
}

function getFallbackNames(gender, religion, count = 10) {
  const fallbackData = {
    muslim: {
      boy: [
        { name: 'Amir', meaning: 'Prince, commander, leader', origin: 'Arabic', gender: 'boy' },
        { name: 'Zain', meaning: 'Beauty, grace, excellence', origin: 'Arabic', gender: 'boy' },
        { name: 'Ibrahim', meaning: 'Father of nations, prophet', origin: 'Arabic', gender: 'boy' },
        { name: 'Omar', meaning: 'Long-lived, flourishing, eloquent', origin: 'Arabic', gender: 'boy' },
        { name: 'Yusuf', meaning: 'God increases, prophet Joseph', origin: 'Arabic', gender: 'boy' },
        { name: 'Hassan', meaning: 'Handsome, good, beautiful', origin: 'Arabic', gender: 'boy' },
        { name: 'Ali', meaning: 'Elevated, noble, exalted', origin: 'Arabic', gender: 'boy' },
        { name: 'Rayyan', meaning: 'Gates of heaven, luxuriant', origin: 'Arabic', gender: 'boy' },
        { name: 'Idris', meaning: 'Studious, prophet Enoch', origin: 'Arabic', gender: 'boy' },
        { name: 'Zayd', meaning: 'Growth, abundance, prosperity', origin: 'Arabic', gender: 'boy' }
      ],
      girl: [
        { name: 'Aisha', meaning: 'Living, prosperous, alive', origin: 'Arabic', gender: 'girl' },
        { name: 'Zara', meaning: 'Princess, flower, radiance', origin: 'Arabic', gender: 'girl' },
        { name: 'Fatima', meaning: 'Captivating, one who weans', origin: 'Arabic', gender: 'girl' },
        { name: 'Maryam', meaning: 'Beloved, wished-for child', origin: 'Arabic', gender: 'girl' },
        { name: 'Layla', meaning: 'Night, dark beauty, intoxication', origin: 'Arabic', gender: 'girl' },
        { name: 'Amina', meaning: 'Trustworthy, faithful, honest', origin: 'Arabic', gender: 'girl' },
        { name: 'Safiya', meaning: 'Pure, sincere, best friend', origin: 'Arabic', gender: 'girl' },
        { name: 'Zaynab', meaning: 'Fragrant flower, father\'s precious jewel', origin: 'Arabic', gender: 'girl' },
        { name: 'Hafsa', meaning: 'Young lioness, gathering', origin: 'Arabic', gender: 'girl' },
        { name: 'Sumaya', meaning: 'High above, exalted', origin: 'Arabic', gender: 'girl' }
      ],
      any: [
        { name: 'Noor', meaning: 'Light, divine light, illumination', origin: 'Arabic', gender: 'any' },
        { name: 'Rayan', meaning: 'Gates of heaven, watered, luxuriant', origin: 'Arabic', gender: 'any' },
        { name: 'Iman', meaning: 'Faith, belief, trust', origin: 'Arabic', gender: 'any' },
        { name: 'Safa', meaning: 'Purity, clarity, serenity', origin: 'Arabic', gender: 'any' },
        { name: 'Amin', meaning: 'Trustworthy, faithful, honest', origin: 'Arabic', gender: 'any' },
        { name: 'Hadi', meaning: 'Guide, leader, calm', origin: 'Arabic', gender: 'any' },
        { name: 'Nur', meaning: 'Light, brightness', origin: 'Arabic', gender: 'any' },
        { name: 'Salam', meaning: 'Peace, safety, security', origin: 'Arabic', gender: 'any' },
        { name: 'Basil', meaning: 'Brave, fearless', origin: 'Arabic', gender: 'any' },
        { name: 'Karim', meaning: 'Generous, noble', origin: 'Arabic', gender: 'any' }
      ]
    },
    hindu: {
      boy: [
        { name: 'Arjun', meaning: 'Bright, shining, white, silver', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Aarav', meaning: 'Peaceful, wisdom, sound', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Vihaan', meaning: 'Dawn, morning, beginning', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Aditya', meaning: 'Sun, son of Aditi', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Aryan', meaning: 'Noble, honorable, high-born', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Krishna', meaning: 'Dark, black, all-attractive', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Rohan', meaning: 'Ascending, growing, sandalwood', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Vivaan', meaning: 'Full of life, lord Krishna', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Ayaan', meaning: 'Gift of God, speed', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Reyansh', meaning: 'Ray of light, part of Vishnu', origin: 'Sanskrit', gender: 'boy' }
      ],
      girl: [
        { name: 'Ananya', meaning: 'Unique, incomparable, goddess Parvati', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Diya', meaning: 'Lamp, light, brightness', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Saanvi', meaning: 'Goddess Lakshmi, knowledge', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Aadhya', meaning: 'First power, goddess Durga', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Pari', meaning: 'Fairy, angel, beauty', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Anika', meaning: 'Grace, favor, goddess Durga', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Ishita', meaning: 'Desired, superior, goddess Lakshmi', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Navya', meaning: 'New, young, praise-worthy', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Myra', meaning: 'Sweet, beloved, admirable', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Kiara', meaning: 'Dark-haired, clear, bright', origin: 'Sanskrit', gender: 'girl' }
      ],
      any: [
        { name: 'Aarya', meaning: 'Noble, honorable, goddess Parvati', origin: 'Sanskrit', gender: 'any' },
        { name: 'Kiran', meaning: 'Ray of light, beam', origin: 'Sanskrit', gender: 'any' },
        { name: 'Avni', meaning: 'Earth, nature', origin: 'Sanskrit', gender: 'any' },
        { name: 'Jai', meaning: 'Victory, triumph', origin: 'Sanskrit', gender: 'any' },
        { name: 'Dev', meaning: 'Divine, god, deity', origin: 'Sanskrit', gender: 'any' },
        { name: 'Priya', meaning: 'Beloved, dear', origin: 'Sanskrit', gender: 'any' },
        { name: 'Shanti', meaning: 'Peace, calm', origin: 'Sanskrit', gender: 'any' },
        { name: 'Anand', meaning: 'Bliss, happiness', origin: 'Sanskrit', gender: 'any' },
        { name: 'Jaya', meaning: 'Victory, success', origin: 'Sanskrit', gender: 'any' },
        { name: 'Ravi', meaning: 'Sun, light', origin: 'Sanskrit', gender: 'any' }
      ]
    },
    christian: {
      boy: [
        { name: 'Matthew', meaning: 'Gift of God, God\'s gift', origin: 'Hebrew', gender: 'boy' },
        { name: 'Daniel', meaning: 'God is my judge', origin: 'Hebrew', gender: 'boy' },
        { name: 'Gabriel', meaning: 'God is my strength, hero of God', origin: 'Hebrew', gender: 'boy' },
        { name: 'Michael', meaning: 'Who is like God', origin: 'Hebrew', gender: 'boy' },
        { name: 'Samuel', meaning: 'God has heard, name of God', origin: 'Hebrew', gender: 'boy' },
        { name: 'Joshua', meaning: 'The Lord is salvation', origin: 'Hebrew', gender: 'boy' },
        { name: 'Elijah', meaning: 'My God is Yahweh', origin: 'Hebrew', gender: 'boy' },
        { name: 'Noah', meaning: 'Rest, comfort, peace', origin: 'Hebrew', gender: 'boy' },
        { name: 'Caleb', meaning: 'Faithful, devotion, whole-hearted', origin: 'Hebrew', gender: 'boy' },
        { name: 'Isaac', meaning: 'He will laugh, laughter', origin: 'Hebrew', gender: 'boy' }
      ],
      girl: [
        { name: 'Grace', meaning: 'Divine grace, blessing, elegance', origin: 'Latin', gender: 'girl' },
        { name: 'Faith', meaning: 'Complete trust, belief, confidence', origin: 'English', gender: 'girl' },
        { name: 'Hope', meaning: 'Expectation and desire, optimism', origin: 'English', gender: 'girl' },
        { name: 'Hannah', meaning: 'Favor, grace, God has favored me', origin: 'Hebrew', gender: 'girl' },
        { name: 'Sarah', meaning: 'Princess, noblewoman, lady', origin: 'Hebrew', gender: 'girl' },
        { name: 'Abigail', meaning: 'Father\'s joy, source of joy', origin: 'Hebrew', gender: 'girl' },
        { name: 'Elizabeth', meaning: 'God is my oath, pledged to God', origin: 'Hebrew', gender: 'girl' },
        { name: 'Mary', meaning: 'Beloved, wished-for child', origin: 'Hebrew', gender: 'girl' },
        { name: 'Ruth', meaning: 'Companion, friend, vision of beauty', origin: 'Hebrew', gender: 'girl' },
        { name: 'Naomi', meaning: 'Pleasantness, my delight', origin: 'Hebrew', gender: 'girl' }
      ],
      any: [
        { name: 'Angel', meaning: 'Messenger of God, divine messenger', origin: 'Greek', gender: 'any' },
        { name: 'Eden', meaning: 'Paradise, delight, place of pleasure', origin: 'Hebrew', gender: 'any' },
        { name: 'Jordan', meaning: 'To flow down, descend', origin: 'Hebrew', gender: 'any' },
        { name: 'Trinity', meaning: 'Triad, threefold', origin: 'Latin', gender: 'any' },
        { name: 'Jesse', meaning: 'Gift, God exists', origin: 'Hebrew', gender: 'any' },
        { name: 'Shiloh', meaning: 'Peaceful, tranquil', origin: 'Hebrew', gender: 'any' },
        { name: 'Salem', meaning: 'Peace, complete', origin: 'Hebrew', gender: 'any' },
        { name: 'Zion', meaning: 'Highest point, monument', origin: 'Hebrew', gender: 'any' },
        { name: 'Bethel', meaning: 'House of God', origin: 'Hebrew', gender: 'any' },
        { name: 'Carmel', meaning: 'Garden, orchard', origin: 'Hebrew', gender: 'any' }
      ]
    },
    sikh: {
      boy: [
        { name: 'Arjan', meaning: 'Bright, shining, earning', origin: 'Punjabi', gender: 'boy' },
        { name: 'Harman', meaning: 'Beloved of God, everyone\'s beloved', origin: 'Punjabi', gender: 'boy' },
        { name: 'Gurpreet', meaning: 'Love of the Guru, devoted to Guru', origin: 'Punjabi', gender: 'boy' },
        { name: 'Amrit', meaning: 'Nectar of immortality, holy water', origin: 'Punjabi', gender: 'boy' },
        { name: 'Karan', meaning: 'Helper, compassionate, ear', origin: 'Punjabi', gender: 'boy' },
        { name: 'Manvir', meaning: 'Brave-hearted, courageous', origin: 'Punjabi', gender: 'boy' },
        { name: 'Navjot', meaning: 'New light, new flame', origin: 'Punjabi', gender: 'boy' },
        { name: 'Tejvir', meaning: 'Radiant and brave', origin: 'Punjabi', gender: 'boy' },
        { name: 'Harjot', meaning: 'God\'s light', origin: 'Punjabi', gender: 'boy' },
        { name: 'Simran', meaning: 'Remembrance of God, meditation', origin: 'Punjabi', gender: 'boy' }
      ],
      girl: [
        { name: 'Simran', meaning: 'Remembrance of God, meditation', origin: 'Punjabi', gender: 'girl' },
        { name: 'Navleen', meaning: 'New, fresh, absorbed in the new', origin: 'Punjabi', gender: 'girl' },
        { name: 'Jasleen', meaning: 'Absorbed in singing God\'s praises', origin: 'Punjabi', gender: 'girl' },
        { name: 'Harleen', meaning: 'Absorbed in God, God\'s love', origin: 'Punjabi', gender: 'girl' },
        { name: 'Kirandeep', meaning: 'Ray of light, lamp of light', origin: 'Punjabi', gender: 'girl' },
        { name: 'Manpreet', meaning: 'Love of the mind, beloved', origin: 'Punjabi', gender: 'girl' },
        { name: 'Navjot', meaning: 'New light, new flame', origin: 'Punjabi', gender: 'girl' },
        { name: 'Harnoor', meaning: 'God\'s light', origin: 'Punjabi', gender: 'girl' },
        { name: 'Amandeep', meaning: 'Lamp of peace', origin: 'Punjabi', gender: 'girl' },
        { name: 'Gurleen', meaning: 'Absorbed in the Guru', origin: 'Punjabi', gender: 'girl' }
      ],
      any: [
        { name: 'Jas', meaning: 'Glory, fame, praise', origin: 'Punjabi', gender: 'any' },
        { name: 'Preet', meaning: 'Love, affection', origin: 'Punjabi', gender: 'any' },
        { name: 'Jot', meaning: 'Light, flame, divine light', origin: 'Punjabi', gender: 'any' },
        { name: 'Noor', meaning: 'Divine light, God\'s light', origin: 'Punjabi', gender: 'any' },
        { name: 'Aman', meaning: 'Peace, safety, protection', origin: 'Punjabi', gender: 'any' },
        { name: 'Sukh', meaning: 'Peace, happiness, comfort', origin: 'Punjabi', gender: 'any' },
        { name: 'Anmol', meaning: 'Priceless, invaluable', origin: 'Punjabi', gender: 'any' },
        { name: 'Ekam', meaning: 'Oneness, unity with God', origin: 'Punjabi', gender: 'any' },
        { name: 'Sahib', meaning: 'Lord, master, companion', origin: 'Punjabi', gender: 'any' },
        { name: 'Gian', meaning: 'Knowledge, wisdom', origin: 'Punjabi', gender: 'any' }
      ]
    },
    buddhist: {
      boy: [
        { name: 'Bodhi', meaning: 'Enlightenment, awakening, understanding', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Tenzin', meaning: 'Holder of teachings, upholder of dharma', origin: 'Tibetan', gender: 'boy' },
        { name: 'Karma', meaning: 'Action, fate, deed', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Dorje', meaning: 'Thunderbolt, diamond, indestructible', origin: 'Tibetan', gender: 'boy' },
        { name: 'Sonam', meaning: 'Merit, virtue, good fortune', origin: 'Tibetan', gender: 'boy' },
        { name: 'Lobsang', meaning: 'Kind-hearted, noble-minded', origin: 'Tibetan', gender: 'boy' },
        { name: 'Thupten', meaning: 'Holder of Buddha\'s teachings', origin: 'Tibetan', gender: 'boy' },
        { name: 'Jamyang', meaning: 'Gentle voice, melodious', origin: 'Tibetan', gender: 'boy' },
        { name: 'Norbu', meaning: 'Jewel, precious', origin: 'Tibetan', gender: 'boy' },
        { name: 'Rinzen', meaning: 'Holder of the teachings', origin: 'Tibetan', gender: 'boy' }
      ],
      girl: [
        { name: 'Tara', meaning: 'Star, goddess, liberator', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Pema', meaning: 'Lotus, pure, untainted', origin: 'Tibetan', gender: 'girl' },
        { name: 'Dawa', meaning: 'Moon, month', origin: 'Tibetan', gender: 'girl' },
        { name: 'Yangchen', meaning: 'Melodious voice, sweet sound', origin: 'Tibetan', gender: 'girl' },
        { name: 'Dolma', meaning: 'Tara, savior, liberator', origin: 'Tibetan', gender: 'girl' },
        { name: 'Choden', meaning: 'Devout, religious', origin: 'Tibetan', gender: 'girl' },
        { name: 'Lhamo', meaning: 'Goddess, deity', origin: 'Tibetan', gender: 'girl' },
        { name: 'Dechen', meaning: 'Great bliss, happiness', origin: 'Tibetan', gender: 'girl' },
        { name: 'Tsering', meaning: 'Long life, longevity', origin: 'Tibetan', gender: 'girl' },
        { name: 'Yeshe', meaning: 'Wisdom, primordial awareness', origin: 'Tibetan', gender: 'girl' }
      ],
      any: [
        { name: 'Dharma', meaning: 'Universal truth, cosmic law', origin: 'Sanskrit', gender: 'any' },
        { name: 'Nirvana', meaning: 'Liberation, enlightenment, bliss', origin: 'Sanskrit', gender: 'any' },
        { name: 'Sangha', meaning: 'Community, assembly', origin: 'Sanskrit', gender: 'any' },
        { name: 'Metta', meaning: 'Loving-kindness, benevolence', origin: 'Pali', gender: 'any' },
        { name: 'Zen', meaning: 'Meditation, absorption', origin: 'Japanese', gender: 'any' },
        { name: 'Karuna', meaning: 'Compassion, mercy', origin: 'Sanskrit', gender: 'any' },
        { name: 'Bodhi', meaning: 'Awakening, enlightenment', origin: 'Sanskrit', gender: 'any' },
        { name: 'Siddhi', meaning: 'Spiritual power, accomplishment', origin: 'Sanskrit', gender: 'any' },
        { name: 'Prajna', meaning: 'Wisdom, insight', origin: 'Sanskrit', gender: 'any' },
        { name: 'Ananda', meaning: 'Bliss, joy, happiness', origin: 'Sanskrit', gender: 'any' }
      ]
    },
    jain: {
      boy: [
        { name: 'Aditya', meaning: 'Sun, son of Aditi', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Rishabh', meaning: 'Superior, first Tirthankara, bull', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Mahavir', meaning: 'Great hero, 24th Tirthankara', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Parshva', meaning: '23rd Tirthankara, side', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Nemi', meaning: '22nd Tirthankara, rim', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Ajitnath', meaning: 'Invincible lord, 2nd Tirthankara', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Sambhav', meaning: 'Possible, 3rd Tirthankara', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Abhinandan', meaning: 'Congratulations, 4th Tirthankara', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Sumati', meaning: 'Good wisdom, 5th Tirthankara', origin: 'Sanskrit', gender: 'boy' },
        { name: 'Padmaprabha', meaning: 'Lotus light, 6th Tirthankara', origin: 'Sanskrit', gender: 'boy' }
      ],
      girl: [
        { name: 'Ahimsa', meaning: 'Non-violence, compassion', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Jivika', meaning: 'Source of life, living', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Ratna', meaning: 'Jewel, precious gem', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Chandana', meaning: 'Sandalwood, fragrant', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Mallika', meaning: 'Jasmine, queen', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Suvrata', meaning: 'Good vow, virtuous', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Prabhavati', meaning: 'Powerful, mighty', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Sulochana', meaning: 'Beautiful eyes', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Padmavati', meaning: 'Lotus lady, goddess', origin: 'Sanskrit', gender: 'girl' },
        { name: 'Anupama', meaning: 'Incomparable, unique', origin: 'Sanskrit', gender: 'girl' }
      ],
      any: [
        { name: 'Shanti', meaning: 'Peace, tranquility, calm', origin: 'Sanskrit', gender: 'any' },
        { name: 'Moksha', meaning: 'Liberation, salvation, freedom', origin: 'Sanskrit', gender: 'any' },
        { name: 'Satya', meaning: 'Truth, reality, honesty', origin: 'Sanskrit', gender: 'any' },
        { name: 'Karuna', meaning: 'Compassion, mercy, kindness', origin: 'Sanskrit', gender: 'any' },
        { name: 'Anand', meaning: 'Bliss, joy, happiness', origin: 'Sanskrit', gender: 'any' },
        { name: 'Jina', meaning: 'Conqueror, victor', origin: 'Sanskrit', gender: 'any' },
        { name: 'Siddha', meaning: 'Accomplished, perfected soul', origin: 'Sanskrit', gender: 'any' },
        { name: 'Ratna', meaning: 'Jewel, gem, treasure', origin: 'Sanskrit', gender: 'any' },
        { name: 'Dharma', meaning: 'Righteousness, duty, virtue', origin: 'Sanskrit', gender: 'any' },
        { name: 'Tattva', meaning: 'Reality, truth, essence', origin: 'Sanskrit', gender: 'any' }
      ]
    },
    jewish: {
      boy: [
        { name: 'Noah', meaning: 'Rest, comfort, peace', origin: 'Hebrew', gender: 'boy' },
        { name: 'Elijah', meaning: 'My God is Yahweh, the Lord is my God', origin: 'Hebrew', gender: 'boy' },
        { name: 'Isaac', meaning: 'He will laugh, laughter', origin: 'Hebrew', gender: 'boy' },
        { name: 'Jacob', meaning: 'Supplanter, holder of the heel', origin: 'Hebrew', gender: 'boy' },
        { name: 'Benjamin', meaning: 'Son of the right hand, son of the south', origin: 'Hebrew', gender: 'boy' },
        { name: 'David', meaning: 'Beloved, dear, darling', origin: 'Hebrew', gender: 'boy' },
        { name: 'Solomon', meaning: 'Peace, peaceful', origin: 'Hebrew', gender: 'boy' },
        { name: 'Aaron', meaning: 'Mountain of strength, exalted', origin: 'Hebrew', gender: 'boy' },
        { name: 'Levi', meaning: 'Joined, attached', origin: 'Hebrew', gender: 'boy' },
        { name: 'Asher', meaning: 'Happy, blessed, fortunate', origin: 'Hebrew', gender: 'boy' }
      ],
      girl: [
        { name: 'Sarah', meaning: 'Princess, noblewoman, lady', origin: 'Hebrew', gender: 'girl' },
        { name: 'Rachel', meaning: 'Ewe, innocent, pure', origin: 'Hebrew', gender: 'girl' },
        { name: 'Leah', meaning: 'Weary, delicate, languid', origin: 'Hebrew', gender: 'girl' },
        { name: 'Miriam', meaning: 'Wished-for child, rebellion', origin: 'Hebrew', gender: 'girl' },
        { name: 'Esther', meaning: 'Star, hidden, myrtle', origin: 'Persian', gender: 'girl' },
        { name: 'Rebecca', meaning: 'To bind, captivating', origin: 'Hebrew', gender: 'girl' },
        { name: 'Deborah', meaning: 'Bee, to speak kind words', origin: 'Hebrew', gender: 'girl' },
        { name: 'Hannah', meaning: 'Grace, favor, God has favored me', origin: 'Hebrew', gender: 'girl' },
        { name: 'Naomi', meaning: 'Pleasantness, my delight', origin: 'Hebrew', gender: 'girl' },
        { name: 'Abigail', meaning: 'Father\'s joy, source of joy', origin: 'Hebrew', gender: 'girl' }
      ],
      any: [
        { name: 'Shalom', meaning: 'Peace, harmony, wholeness', origin: 'Hebrew', gender: 'any' },
        { name: 'Zion', meaning: 'Highest point, monument, promised land', origin: 'Hebrew', gender: 'any' },
        { name: 'Ariel', meaning: 'Lion of God, altar, hero', origin: 'Hebrew', gender: 'any' },
        { name: 'Eden', meaning: 'Paradise, delight, place of pleasure', origin: 'Hebrew', gender: 'any' },
        { name: 'Oren', meaning: 'Pine tree, ash tree', origin: 'Hebrew', gender: 'any' },
        { name: 'Tal', meaning: 'Dew, morning dew', origin: 'Hebrew', gender: 'any' },
        { name: 'Noa', meaning: 'Movement, motion', origin: 'Hebrew', gender: 'any' },
        { name: 'Yarden', meaning: 'To flow down, descend', origin: 'Hebrew', gender: 'any' },
        { name: 'Lior', meaning: 'My light, I have light', origin: 'Hebrew', gender: 'any' },
        { name: 'Gal', meaning: 'Wave, heap, spring', origin: 'Hebrew', gender: 'any' }
      ]
    }
  };

  const religionData = fallbackData[religion] || fallbackData.muslim;
  const genderData = religionData[gender] || religionData.any;
  
  return genderData.slice(0, count);
}