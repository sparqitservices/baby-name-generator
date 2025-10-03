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

    // Build prompt - more explicit about JSON format
    const prompt = `Analyze the name "${searchName}" and provide detailed information.

You must respond with ONLY a valid JSON object. Do not include any markdown, code blocks, or explanations.

Required JSON structure:
{
  "name": "${searchName}",
  "meaning": "brief meaning in 120-150 characters",
  "origin": "cultural or linguistic origin",
  "gender": "boy or girl or any",
  "detailedDescription": "2-3 sentences about the name's meaning and significance",
  "culturalSignificance": "2-3 sentences about cultural, religious, or historical importance",
  "popularity": "information about the name's popularity and usage trends",
  "famousPersonalities": ["person 1", "person 2", "person 3"]
}

Important:
- Respond with ONLY the JSON object
- No markdown formatting
- No code blocks
- No additional text
- Ensure all fields are filled with accurate information
- Keep meaning between 120-150 characters
- Provide 3-5 famous personalities if available

Respond now with the JSON object only:`;

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
            content: 'You are a baby name expert. You MUST respond with ONLY valid JSON objects. Never use markdown, code blocks, or any formatting. Only output raw JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1,
        stream: false,
        response_format: { type: "json_object" }
      }),
      signal: AbortSignal.timeout(30000)
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      return new Response(
        JSON.stringify({ error: `Failed to search name. Please try again.` }),
        { 
          status: 500,
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
        JSON.stringify({ error: 'No information received. Please try again.' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('📄 Raw content:', content);

    // Parse result
    const result = parseSearchResult(content, searchName);

    if (!result) {
      console.error('❌ Failed to parse search result');
      return new Response(
        JSON.stringify({ error: 'Failed to process name information. Please try again.' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('🎉 Returning search result:', result);
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
      JSON.stringify({ error: 'An error occurred. Please try again.' }),
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

  try {
    // Remove any markdown code blocks
    let cleanText = text.trim();
    cleanText = cleanText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Remove any leading/trailing whitespace
    cleanText = cleanText.trim();
    
    // Try to find JSON object
    let jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // If no match, try parsing the whole text
      jsonMatch = [cleanText];
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate required fields
    if (!parsed.name && !parsed.meaning && !parsed.origin) {
      console.error('Missing critical fields in parsed result');
      return null;
    }

    // Clean and validate with defaults
    return {
      name: (parsed.name || searchName).trim(),
      meaning: (parsed.meaning || 'A beautiful and meaningful name').trim(),
      origin: (parsed.origin || 'Various cultures').trim(),
      gender: ['boy', 'girl', 'any'].includes(String(parsed.gender || '').toLowerCase()) 
        ? String(parsed.gender).toLowerCase() 
        : 'any',
      detailedDescription: (parsed.detailedDescription || parsed.description || '').trim(),
      culturalSignificance: (parsed.culturalSignificance || parsed.cultural || '').trim(),
      popularity: (parsed.popularity || '').trim(),
      famousPersonalities: Array.isArray(parsed.famousPersonalities) 
        ? parsed.famousPersonalities.filter(p => typeof p === 'string' && p.trim().length > 0)
        : (Array.isArray(parsed.famous) 
          ? parsed.famous.filter(p => typeof p === 'string' && p.trim().length > 0)
          : [])
    };

  } catch (error) {
    console.error('❌ JSON parse error:', error.message);
    console.error('Text that failed to parse:', text);
    return null;
  }
}