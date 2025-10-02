const ABACUS_ENDPOINT =
  process.env.ABACUS_API_URL ?? 'https://api.abacus.ai/api/v0/generateText';

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
        '❌ Missing ABACUS_API_KEY env variable. Names will not be generated.'
      );
      return Response.json(
        {
          names: [],
          isApiWorking: false,
          error:
            'Server is not configured with an Abacus API key. Please add ABACUS_API_KEY in your environment variables.'
        },
        { status: 503 }
      );
    }

    console.log('🔑 API key detected.');

    const prompt = buildPrompt({
      gender: normalizedGender,
      religion: normalizedReligion,
      style: normalizedStyle,
      count: normalizedCount
    });

    console.log('🚀 Calling Abacus API…');

    const response = await fetch(ABACUS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt,
        model: 'gpt-4o',
        temperature: 0.9,
        max_tokens: 4000
      }),
      signal: AbortSignal.timeout(45_000)
    });

    console.log('📡 API response status:', response.status);

    if (!response.ok) {
      const errorText = await safeReadText(response);
      console.error('❌ API error payload:', errorText);
      return Response.json(
        {
          names: [],
          isApiWorking: false,
          error: `Abacus API returned ${response.status}.`
        },
        { status: response.status }
      );
    }

    const payload = await response.json();
    const parsedNames = extractNames(payload.text, normalizedCount);

    if (parsedNames.length === 0) {
      console.warn('⚠️ No valid names parsed from Abacus response.');
      console.debug('🔍 Raw response text snapshot:', payload.text?.slice(0, 400));
      return Response.json(
        {
          names: [],
          isApiWorking: false,
          error:
            'Received an unexpected response from the name generator. Please try again shortly.'
        },
        { status: 502 }
      );
    }

    console.log(`🎉 Returning ${parsedNames.length} names from Abacus.`);
    return Response.json({
      names: parsedNames.slice(0, normalizedCount),
      isApiWorking: true
    });
  } catch (error) {
    console.error('❌ Unhandled server error:', error);
    return Response.json(
      {
        names: [],
        isApiWorking: false,
        error:
          'Unexpected server error while generating names. Please try again later.'
      },
      { status: 500 }
    );
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