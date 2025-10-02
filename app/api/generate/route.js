export async function POST(request) {
  try {
    const { gender, religion, style, count = 20 } = await request.json();

    console.log('📝 Request params:', { gender, religion, style, count });

    // Try API call first
    try {
      const apiKey = process.env.ABACUS_API_KEY;
      
      if (!apiKey) {
        console.warn('⚠️ No API key found, using fallback');
        return Response.json({ names: getFallbackNames(gender, religion) });
      }

      const prompt = `Generate ${count} beautiful ${gender === 'any' ? '' : gender} baby names for ${religion} religion with ${style} style. 
      
For each name, provide:
- name: the actual name
- meaning: detailed meaning
- origin: cultural origin
- gender: boy/girl/any

Return ONLY a valid JSON array of objects. Example format:
[{"name":"Amir","meaning":"Prince, commander","origin":"Arabic","gender":"boy"}]`;

      console.log('🚀 Calling API...');

      const response = await fetch('https://api.abacus.ai/api/v0/generateText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          model: 'gpt-4o',
          temperature: 0.8,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        console.error('❌ API Error:', response.status, response.statusText);
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);

      // Parse the generated text
      let names = [];
      if (data.text) {
        try {
          // Try to extract JSON from the response
          const jsonMatch = data.text.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            names = JSON.parse(jsonMatch[0]);
          }
        } catch (parseError) {
          console.error('❌ Parse error:', parseError);
        }
      }

      // If API worked but parsing failed, use fallback
      if (!names || names.length === 0) {
        console.warn('⚠️ API returned no names, using fallback');
        names = getFallbackNames(gender, religion);
      }

      return Response.json({ names });

    } catch (apiError) {
      console.error('❌ API call failed:', apiError.message);
      // Return fallback data
      
      return Response.json({ names: getFallbackNames(gender, religion, count) });
    }

  } catch (error) {
    console.error('❌ Server error:', error);
    return Response.json(
      { error: 'Failed to generate names', names: [] },
      { status: 500 }
    );
  }
}

function getFallbackNames(gender, religion, count = 20) {
  const fallback = {
    muslim: {
      boy: [
        { name: 'Amir', meaning: 'Prince, commander', gender: 'boy', origin: 'Arabic' },
        { name: 'Zain', meaning: 'Beauty, grace', gender: 'boy', origin: 'Arabic' },
        { name: 'Ibrahim', meaning: 'Father of nations', gender: 'boy', origin: 'Arabic' },
        { name: 'Omar', meaning: 'Long-lived, flourishing', gender: 'boy', origin: 'Arabic' },
        { name: 'Yusuf', meaning: 'God increases', gender: 'boy', origin: 'Arabic' },
        { name: 'Hassan', meaning: 'Handsome, good', gender: 'boy', origin: 'Arabic' },
        { name: 'Rayyan', meaning: 'Gates of heaven', gender: 'boy', origin: 'Arabic' },
        { name: 'Idris', meaning: 'Studious, smart', gender: 'boy', origin: 'Arabic' },
        { name: 'Ayaan', meaning: 'Gift of God', gender: 'boy', origin: 'Arabic' },
        { name: 'Zayd', meaning: 'Growth, abundance', gender: 'boy', origin: 'Arabic' }
      ],
      girl: [
        { name: 'Aisha', meaning: 'Living, prosperous', gender: 'girl', origin: 'Arabic' },
        { name: 'Zara', meaning: 'Princess, flower', gender: 'girl', origin: 'Arabic' },
        { name: 'Fatima', meaning: 'Captivating', gender: 'girl', origin: 'Arabic' },
        { name: 'Maryam', meaning: 'Beloved, wished-for child', gender: 'girl', origin: 'Arabic' },
        { name: 'Layla', meaning: 'Night, dark beauty', gender: 'girl', origin: 'Arabic' },
        { name: 'Amina', meaning: 'Trustworthy, faithful', gender: 'girl', origin: 'Arabic' },
        { name: 'Safiya', meaning: 'Pure, serene', gender: 'girl', origin: 'Arabic' },
        { name: 'Nadia', meaning: 'Hope, tender', gender: 'girl', origin: 'Arabic' },
        { name: 'Yasmin', meaning: 'Jasmine flower', gender: 'girl', origin: 'Arabic' },
        { name: 'Zahra', meaning: 'Radiant, blooming', gender: 'girl', origin: 'Arabic' }
      ],
      any: [
        { name: 'Noor', meaning: 'Light', gender: 'any', origin: 'Arabic' },
        { name: 'Rayan', meaning: 'Gates of heaven', gender: 'any', origin: 'Arabic' },
        { name: 'Iman', meaning: 'Faith', gender: 'any', origin: 'Arabic' },
        { name: 'Safa', meaning: 'Purity', gender: 'any', origin: 'Arabic' }
      ]
    },
    hindu: {
      boy: [
        { name: 'Arjun', meaning: 'Bright, shining', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Aarav', meaning: 'Peaceful, wisdom', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Vihaan', meaning: 'Dawn, morning', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Aditya', meaning: 'Sun', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Aryan', meaning: 'Noble, honorable', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Reyansh', meaning: 'Ray of light', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Krishna', meaning: 'Dark, all-attractive', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Shiv', meaning: 'Auspicious', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Rudra', meaning: 'Roarer, Shiva', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Ved', meaning: 'Sacred knowledge', gender: 'boy', origin: 'Sanskrit' }
      ],
      girl: [
        { name: 'Ananya', meaning: 'Unique, incomparable', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Diya', meaning: 'Lamp, light', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Saanvi', meaning: 'Goddess Lakshmi', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Aadhya', meaning: 'First power', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Pari', meaning: 'Fairy, angel', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Navya', meaning: 'New, young', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Ishani', meaning: 'Goddess Parvati', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Myra', meaning: 'Sweet, beloved', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Riya', meaning: 'Singer, graceful', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Kiara', meaning: 'Dark-haired', gender: 'girl', origin: 'Sanskrit' }
      ],
      any: [
        { name: 'Aarya', meaning: 'Noble', gender: 'any', origin: 'Sanskrit' },
        { name: 'Kiran', meaning: 'Ray of light', gender: 'any', origin: 'Sanskrit' },
        { name: 'Avni', meaning: 'Earth', gender: 'any', origin: 'Sanskrit' },
        { name: 'Jai', meaning: 'Victory', gender: 'any', origin: 'Sanskrit' }
      ]
    },
    christian: {
      boy: [
        { name: 'Matthew', meaning: 'Gift of God', gender: 'boy', origin: 'Hebrew' },
        { name: 'Daniel', meaning: 'God is my judge', gender: 'boy', origin: 'Hebrew' },
        { name: 'Gabriel', meaning: 'God is my strength', gender: 'boy', origin: 'Hebrew' },
        { name: 'Michael', meaning: 'Who is like God', gender: 'boy', origin: 'Hebrew' },
        { name: 'Samuel', meaning: 'God has heard', gender: 'boy', origin: 'Hebrew' },
        { name: 'Joshua', meaning: 'The Lord is salvation', gender: 'boy', origin: 'Hebrew' },
        { name: 'Elijah', meaning: 'My God is Yahweh', gender: 'boy', origin: 'Hebrew' },
        { name: 'Noah', meaning: 'Rest, comfort', gender: 'boy', origin: 'Hebrew' },
        { name: 'Isaac', meaning: 'He will laugh', gender: 'boy', origin: 'Hebrew' },
        { name: 'Caleb', meaning: 'Faithful, devoted', gender: 'boy', origin: 'Hebrew' }
      ],
      girl: [
        { name: 'Grace', meaning: 'Divine grace', gender: 'girl', origin: 'Latin' },
        { name: 'Faith', meaning: 'Complete trust', gender: 'girl', origin: 'English' },
        { name: 'Hope', meaning: 'Expectation and desire', gender: 'girl', origin: 'English' },
        { name: 'Hannah', meaning: 'Favor, grace', gender: 'girl', origin: 'Hebrew' },
        { name: 'Sarah', meaning: 'Princess', gender: 'girl', origin: 'Hebrew' },
        { name: 'Abigail', meaning: 'Father\'s joy', gender: 'girl', origin: 'Hebrew' },
        { name: 'Rachel', meaning: 'Ewe', gender: 'girl', origin: 'Hebrew' },
        { name: 'Esther', meaning: 'Star', gender: 'girl', origin: 'Persian' },
        { name: 'Ruth', meaning: 'Companion, friend', gender: 'girl', origin: 'Hebrew' },
        { name: 'Naomi', meaning: 'Pleasantness', gender: 'girl', origin: 'Hebrew' }
      ],
      any: [
        { name: 'Angel', meaning: 'Messenger of God', gender: 'any', origin: 'Greek' },
        { name: 'Eden', meaning: 'Paradise', gender: 'any', origin: 'Hebrew' },
        { name: 'Jordan', meaning: 'To flow down', gender: 'any', origin: 'Hebrew' },
        { name: 'Trinity', meaning: 'Triad', gender: 'any', origin: 'Latin' }
      ]
    },
    sikh: {
      boy: [
        { name: 'Arjan', meaning: 'Bright, shining', gender: 'boy', origin: 'Punjabi' },
        { name: 'Harman', meaning: 'Beloved of God', gender: 'boy', origin: 'Punjabi' },
        { name: 'Gurpreet', meaning: 'Love of the Guru', gender: 'boy', origin: 'Punjabi' },
        { name: 'Amrit', meaning: 'Nectar of immortality', gender: 'boy', origin: 'Punjabi' },
        { name: 'Karan', meaning: 'Helper, compassionate', gender: 'boy', origin: 'Punjabi' },
        { name: 'Harjot', meaning: 'God\'s light', gender: 'boy', origin: 'Punjabi' },
        { name: 'Navjot', meaning: 'New light', gender: 'boy', origin: 'Punjabi' },
        { name: 'Manvir', meaning: 'Brave heart', gender: 'boy', origin: 'Punjabi' },
        { name: 'Tejvir', meaning: 'Radiant warrior', gender: 'boy', origin: 'Punjabi' },
        { name: 'Gurbir', meaning: 'Brave Guru', gender: 'boy', origin: 'Punjabi' }
      ],
      girl: [
        { name: 'Simran', meaning: 'Remembrance of God', gender: 'girl', origin: 'Punjabi' },
        { name: 'Navleen', meaning: 'New', gender: 'girl', origin: 'Punjabi' },
        { name: 'Jasleen', meaning: 'Absorbed in singing God\'s praises', gender: 'girl', origin: 'Punjabi' },
        { name: 'Harleen', meaning: 'Absorbed in God', gender: 'girl', origin: 'Punjabi' },
        { name: 'Kirandeep', meaning: 'Ray of light', gender: 'girl', origin: 'Punjabi' },
        { name: 'Manpreet', meaning: 'Love of the mind', gender: 'girl', origin: 'Punjabi' },
        { name: 'Amandeep', meaning: 'Lamp of peace', gender: 'girl', origin: 'Punjabi' },
        { name: 'Gurleen', meaning: 'Absorbed in the Guru', gender: 'girl', origin: 'Punjabi' },
        { name: 'Navpreet', meaning: 'New love', gender: 'girl', origin: 'Punjabi' },
        { name: 'Harnoor', meaning: 'God\'s light', gender: 'girl', origin: 'Punjabi' }
      ],
      any: [
        { name: 'Jas', meaning: 'Glory', gender: 'any', origin: 'Punjabi' },
        { name: 'Preet', meaning: 'Love', gender: 'any', origin: 'Punjabi' },
        { name: 'Jot', meaning: 'Light', gender: 'any', origin: 'Punjabi' },
        { name: 'Noor', meaning: 'Divine light', gender: 'any', origin: 'Punjabi' }
      ]
    },
    buddhist: {
      boy: [
        { name: 'Bodhi', meaning: 'Enlightenment', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Tenzin', meaning: 'Holder of teachings', gender: 'boy', origin: 'Tibetan' },
        { name: 'Karma', meaning: 'Action, fate', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Dorje', meaning: 'Thunderbolt', gender: 'boy', origin: 'Tibetan' },
        { name: 'Sonam', meaning: 'Merit, virtue', gender: 'boy', origin: 'Tibetan' },
        { name: 'Lobsang', meaning: 'Kind-hearted', gender: 'boy', origin: 'Tibetan' },
        { name: 'Thupten', meaning: 'Upholder of teachings', gender: 'boy', origin: 'Tibetan' },
        { name: 'Jamyang', meaning: 'Gentle voice', gender: 'boy', origin: 'Tibetan' },
        { name: 'Norbu', meaning: 'Jewel', gender: 'boy', origin: 'Tibetan' },
        { name: 'Rinchen', meaning: 'Precious', gender: 'boy', origin: 'Tibetan' }
      ],
      girl: [
        { name: 'Tara', meaning: 'Star, goddess', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Pema', meaning: 'Lotus', gender: 'girl', origin: 'Tibetan' },
        { name: 'Dawa', meaning: 'Moon', gender: 'girl', origin: 'Tibetan' },
        { name: 'Yangchen', meaning: 'Melodious voice', gender: 'girl', origin: 'Tibetan' },
        { name: 'Dolma', meaning: 'Tara, savior', gender: 'girl', origin: 'Tibetan' },
        { name: 'Lhamo', meaning: 'Goddess', gender: 'girl', origin: 'Tibetan' },
        { name: 'Choden', meaning: 'Devout', gender: 'girl', origin: 'Tibetan' },
        { name: 'Dechen', meaning: 'Great bliss', gender: 'girl', origin: 'Tibetan' },
        { name: 'Tsering', meaning: 'Long life', gender: 'girl', origin: 'Tibetan' },
        { name: 'Yeshe', meaning: 'Wisdom', gender: 'girl', origin: 'Tibetan' }
      ],
      any: [
        { name: 'Dharma', meaning: 'Universal truth', gender: 'any', origin: 'Sanskrit' },
        { name: 'Nirvana', meaning: 'Liberation', gender: 'any', origin: 'Sanskrit' },
        { name: 'Sangha', meaning: 'Community', gender: 'any', origin: 'Sanskrit' },
        { name: 'Metta', meaning: 'Loving-kindness', gender: 'any', origin: 'Pali' }
      ]
    },
    jain: {
      boy: [
        { name: 'Aditya', meaning: 'Sun', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Rishabh', meaning: 'Superior, first Tirthankara', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Mahavir', meaning: 'Great hero', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Parshva', meaning: '23rd Tirthankara', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Nemi', meaning: '22nd Tirthankara', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Anant', meaning: 'Infinite, eternal', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Jivin', meaning: 'To give life', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Siddharth', meaning: 'One who has accomplished', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Vardhan', meaning: 'One who increases', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Tejas', meaning: 'Brilliance, sharpness', gender: 'boy', origin: 'Sanskrit' }
      ],
      girl: [
        { name: 'Ahimsa', meaning: 'Non-violence', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Jivika', meaning: 'Source of life', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Ratna', meaning: 'Jewel', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Chandana', meaning: 'Sandalwood', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Mallika', meaning: 'Jasmine', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Suvrata', meaning: 'Good vow', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Priya', meaning: 'Beloved', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Anupama', meaning: 'Incomparable', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Sumati', meaning: 'Good wisdom', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Vimala', meaning: 'Pure', gender: 'girl', origin: 'Sanskrit' }
      ],
      any: [
        { name: 'Shanti', meaning: 'Peace', gender: 'any', origin: 'Sanskrit' },
        { name: 'Moksha', meaning: 'Liberation', gender: 'any', origin: 'Sanskrit' },
        { name: 'Satya', meaning: 'Truth', gender: 'any', origin: 'Sanskrit' },
        { name: 'Karuna', meaning: 'Compassion', gender: 'any', origin: 'Sanskrit' }
      ]
    },
    jewish: {
      boy: [
        { name: 'Noah', meaning: 'Rest, comfort', gender: 'boy', origin: 'Hebrew' },
        { name: 'Elijah', meaning: 'My God is Yahweh', gender: 'boy', origin: 'Hebrew' },
        { name: 'Isaac', meaning: 'He will laugh', gender: 'boy', origin: 'Hebrew' },
        { name: 'Jacob', meaning: 'Supplanter', gender: 'boy', origin: 'Hebrew' },
        { name: 'Benjamin', meaning: 'Son of the right hand', gender: 'boy', origin: 'Hebrew' },
        { name: 'Levi', meaning: 'Joined, attached', gender: 'boy', origin: 'Hebrew' },
        { name: 'Asher', meaning: 'Happy, blessed', gender: 'boy', origin: 'Hebrew' },
        { name: 'Ezra', meaning: 'Help', gender: 'boy', origin: 'Hebrew' },
        { name: 'Ari', meaning: 'Lion', gender: 'boy', origin: 'Hebrew' },
        { name: 'Moshe', meaning: 'Drawn out of water', gender: 'boy', origin: 'Hebrew' }
      ],
      girl: [
        { name: 'Sarah', meaning: 'Princess', gender: 'girl', origin: 'Hebrew' },
        { name: 'Rachel', meaning: 'Ewe', gender: 'girl', origin: 'Hebrew' },
        { name: 'Leah', meaning: 'Weary', gender: 'girl', origin: 'Hebrew' },
        { name: 'Miriam', meaning: 'Wished-for child', gender: 'girl', origin: 'Hebrew' },
        { name: 'Esther', meaning: 'Star', gender: 'girl', origin: 'Persian' },
        { name: 'Tamar', meaning: 'Palm tree', gender: 'girl', origin: 'Hebrew' },
        { name: 'Naomi', meaning: 'Pleasantness', gender: 'girl', origin: 'Hebrew' },
        { name: 'Aviva', meaning: 'Spring', gender: 'girl', origin: 'Hebrew' },
        { name: 'Shira', meaning: 'Song', gender: 'girl', origin: 'Hebrew' },
        { name: 'Talia', meaning: 'Dew of God', gender: 'girl', origin: 'Hebrew' }
      ],
      any: [
        { name: 'Shalom', meaning: 'Peace', gender: 'any', origin: 'Hebrew' },
        { name: 'Zion', meaning: 'Highest point', gender: 'any', origin: 'Hebrew' },
        { name: 'Ariel', meaning: 'Lion of God', gender: 'any', origin: 'Hebrew' },
        { name: 'Eden', meaning: 'Paradise', gender: 'any', origin: 'Hebrew' }
      ]
    }
  };

  const religionData = fallback[religion] || fallback.muslim;
  const genderData = religionData[gender] || religionData.boy;
  
// Return requested count, repeat if needed
  let result = [...genderData];
  while (result.length < count) {
    result = [...result, ...genderData];
  }
  
  return result.slice(0, count);
}