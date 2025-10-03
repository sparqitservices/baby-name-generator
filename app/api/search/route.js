const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

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
    const { name } = await request.json();

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid name to search.' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const searchName = name.trim();
    console.log('🔍 Searching for name:', searchName);

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
    const prompt = `Provide detailed information about the name "${searchName}" in JSON format.

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
{
  "name": "${searchName}",
  "meaning": "concise meaning in 120-150 characters",
  "origin": "cultural/linguistic origin",
  "gender": "boy|girl|any",
  "detailedDescription": "detailed 2-3 sentence description about the name's meaning and significance",
  "culturalSignificance": "2-3 sentences about cultural, religious, or historical significance",
  "popularity": "information about the name's popularity and usage",
  "famousPersonalities": ["list of 3-5 famous people with this name"]
}

CRITICAL REQUIREMENTS:
- Provide accurate, well-researched information
- Be culturally sensitive and respectful
- Include authentic details about the name's heritage
- If the name exists in multiple cultures, mention all
- Keep meaning between 120-150 characters
- Make descriptions informative and engaging
- Output must be valid JSON only

Generate now:`;

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
            content: 'You are a baby name expert with deep knowledge of names from all cultures and religions. Always respond with valid JSON only. Provide accurate, detailed, and culturally sensitive information.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
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

    // Parse result
    const result = parseSearchResult(content, searchName);

    if (!result) {
      console.error('❌ Failed to parse search result');
      return new Response(
        JSON.stringify({ error: 'Failed to parse name information. Please try again.' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('🎉 Returning search result');
    return new Response(
      JSON.stringify(result),
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

function parseSearchResult(text, searchName) {
  if (!text || typeof text !== 'string') {
    console.error('Invalid text input');
    return null;
  }

  // Remove markdown code blocks if present
  let cleanText = text.trim();
  cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

  // Find JSON object
  const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('No JSON object found in response');
    return null;
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate required fields
    if (!parsed.name || !parsed.meaning || !parsed.origin || !parsed.gender) {
      console.error('Missing required fields in parsed result');
      return null;
    }

    // Clean and validate
    return {
      name: parsed.name.trim() || searchName,
      meaning: parsed.meaning.trim(),
      origin: parsed.origin.trim(),
      gender: ['boy', 'girl', 'any'].includes(parsed.gender.toLowerCase()) 
        ? parsed.gender.toLowerCase() 
        : 'any',
      detailedDescription: parsed.detailedDescription?.trim() || '',
      culturalSignificance: parsed.culturalSignificance?.trim() || '',
      popularity: parsed.popularity?.trim() || '',
      famousPersonalities: Array.isArray(parsed.famousPersonalities) 
        ? parsed.famousPersonalities.filter(p => typeof p === 'string' && p.trim().length > 0)
        : []
    };

  } catch (error) {
    console.error('❌ JSON parse error:', error.message);
    return null;
  }
}