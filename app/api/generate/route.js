const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

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

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  try {
    const { gender = 'any', religion = 'muslim', style = 'modern', count = 20 } = await request.json();

    // Validate and normalize inputs
    const normalizedGender = normalizeValue(gender, ALLOWED_GENDERS, 'any');
    const normalizedReligion = normalizeValue(religion, ALLOWED_RELIGIONS, 'muslim');
    const normalizedStyle = String(style || 'modern').trim().toLowerCase();
    const normalizedCount = clamp(Number(count) || 20, 5, 50);

    console.log('📝 Request:', { gender: normalizedGender, religion: normalizedReligion, style: normalizedStyle, count: normalizedCount });

    // Check API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured. Please add GROQ_API_KEY to environment variables.' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Build prompt
    const prompt = buildPrompt({
      gender: normalizedGender,
      religion: normalizedReligion,
      style: normalizedStyle,
      count: normalizedCount
    });

    console.log('🚀 Calling Groq API...');

    // Call Groq API
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a baby name expert. Always respond with valid JSON arrays only. Keep meanings SHORT (maximum 12 words). No markdown, no explanations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        max_tokens: 4000,
        top_p: 1,
        stream: false
      }),
      signal: AbortSignal.timeout(30000)
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      return new Response(
        JSON.stringify({ error: `API request failed: ${response.status} ${response.statusText}` }),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    console.log('✅ API Response received');

    // Extract content
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error('❌ No content in response');
      return new Response(
        JSON.stringify({ error: 'No content received from API' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('📄 Content preview:', content.substring(0, 200));

    // Parse names
    const names = extractNames(content, normalizedCount);

    if (names.length === 0) {
      console.error('❌ Failed to parse names from response');
      return new Response(
        JSON.stringify({ error: 'Failed to parse names from AI response. Please try again.' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`🎉 Returning ${names.length} names`);
    return new Response(
      JSON.stringify({ names, count: names.length }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ Server error:', error.message);
    console.error('Stack:', error.stack);
    
    if (error.name === 'AbortError') {
      return new Response(
        JSON.stringify({ error: 'Request timeout. Please try again.' }),
        { 
          status: 504,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Internal server error. Please try again later.' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
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
  const genderText = gender === 'any' ? 'unisex or any gender' : `${gender}`;
  
  return `Generate exactly ${count} unique baby names for ${genderText} that match:
- Religion/Culture: ${religion}
- Style: ${style}

Return ONLY a valid JSON array with this exact structure (no markdown, no code blocks, no explanations):
[
  {
    "name": "string",
    "meaning": "SHORT meaning in 8-12 words maximum - clear and simple",
    "origin": "cultural/linguistic origin",
    "gender": "boy|girl|any"
  }
]

CRITICAL REQUIREMENTS:
- Each name must be authentic to the ${religion} tradition
- Meanings MUST be SHORT (maximum 12 words) - concise and beautiful
- Gender must be "${gender === 'any' ? 'any' : gender}"
- Return exactly ${count} names
- Output must be valid JSON only
- NO long descriptions - keep meanings brief and elegant

Generate now:`;
}

function extractNames(text, desiredCount) {
  if (!text || typeof text !== 'string') {
    console.error('Invalid text input');
    return [];
  }

  // Remove markdown code blocks if present
  let cleanText = text.trim();
  cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

  // Find JSON array
  const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error('No JSON array found in response');
    return [];
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(parsed)) {
      console.error('Parsed result is not an array');
      return [];
    }

    // Validate and clean names
    const validNames = parsed
      .filter(item => {
        return (
          item &&
          typeof item === 'object' &&
          typeof item.name === 'string' &&
          item.name.trim().length > 0 &&
          typeof item.meaning === 'string' &&
          item.meaning.trim().length > 0 &&
          typeof item.origin === 'string' &&
          item.origin.trim().length > 0 &&
          typeof item.gender === 'string' &&
          ['boy', 'girl', 'any'].includes(item.gender.toLowerCase())
        );
      })
      .map(item => {
        // Shorten meaning if too long (max 100 characters)
        let meaning = item.meaning.trim();
        if (meaning.length > 100) {
          meaning = meaning.substring(0, 97) + '...';
        }
        
        return {
          name: item.name.trim(),
          meaning: meaning,
          origin: item.origin.trim(),
          gender: item.gender.trim().toLowerCase()
        };
      })
      .slice(0, desiredCount);

    console.log(`✅ Parsed ${validNames.length} valid names`);
    return validNames;

  } catch (error) {
    console.error('❌ JSON parse error:', error.message);
    return [];
  }
}