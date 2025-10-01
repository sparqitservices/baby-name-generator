// app/api/generate/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const params = await request.json();
    const { gender, religion, style, language } = params;

    console.log('=== API Request Started ===');
    console.log('Params:', params);

    const prompt = `Generate 5 ${gender} baby names for ${religion} religion in ${style} style. 
Return ONLY a JSON array with this exact format:
[{"name": "Name", "meaning": "Meaning", "gender": "${gender}", "origin": "Origin"}]

No explanations, just the JSON array.`;

    // Try RouteLLM API endpoint
    const apiUrl = 'https://api.abacus.ai/api/v0/getLLMResponse';
    
    console.log('API Key present:', !!process.env.ABACUS_API_KEY);
    console.log('Calling:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUS_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        model: 'gpt-4',
        temperature: 0.7,
        max_tokens: 500
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      
      return NextResponse.json({ 
        names: getFallbackNames(gender, religion),
        fallback: true,
        error: `API returned ${response.status}: ${errorText.substring(0, 100)}`
      });
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data).substring(0, 300));

    // Extract the content from various possible response formats
    const content = data.completion || data.content || data.response || data.text || data.message || '';

    let names;
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      names = JSON.parse(cleaned);
      if (!Array.isArray(names)) {
        names = names.names || [];
      }
    } catch (e) {
      console.error('Parse error:', e);
      names = getFallbackNames(gender, religion);
    }

    return NextResponse.json({ names, fallback: false });

  } catch (error) {
    console.error('=== Full Error ===');
    console.error('Error:', error.message);
    
    return NextResponse.json(
      { 
        names: getFallbackNames('boy', 'muslim'),
        fallback: true,
        error: error.message
      },
      { status: 200 }
    );
  }
}

function getFallbackNames(gender, religion) {
  const fallback = {
    muslim: {
      boy: [
        { name: 'Amir', meaning: 'Prince, commander', gender: 'boy', origin: 'Arabic', pronunciation: 'ah-MEER' },
        { name: 'Zain', meaning: 'Beauty, grace', gender: 'boy', origin: 'Arabic', pronunciation: 'ZAYN' },
        { name: 'Ibrahim', meaning: 'Father of nations', gender: 'boy', origin: 'Arabic', pronunciation: 'ib-rah-HEEM' },
        { name: 'Omar', meaning: 'Long-lived, flourishing', gender: 'boy', origin: 'Arabic', pronunciation: 'OH-mar' },
        { name: 'Yusuf', meaning: 'God increases', gender: 'boy', origin: 'Arabic', pronunciation: 'YOO-suf' }
      ],
      girl: [
        { name: 'Aisha', meaning: 'Living, prosperous', gender: 'girl', origin: 'Arabic', pronunciation: 'ah-EE-shah' },
        { name: 'Zara', meaning: 'Princess, flower', gender: 'girl', origin: 'Arabic', pronunciation: 'ZAH-rah' },
        { name: 'Fatima', meaning: 'Captivating', gender: 'girl', origin: 'Arabic', pronunciation: 'FAH-tee-mah' },
        { name: 'Layla', meaning: 'Night, dark beauty', gender: 'girl', origin: 'Arabic', pronunciation: 'LAY-lah' },
        { name: 'Amina', meaning: 'Trustworthy, faithful', gender: 'girl', origin: 'Arabic', pronunciation: 'ah-MEE-nah' }
      ],
      any: [
        { name: 'Amir', meaning: 'Prince, commander', gender: 'any', origin: 'Arabic', pronunciation: 'ah-MEER' },
        { name: 'Zain', meaning: 'Beauty, grace', gender: 'any', origin: 'Arabic', pronunciation: 'ZAYN' },
        { name: 'Noor', meaning: 'Light', gender: 'any', origin: 'Arabic', pronunciation: 'NOOR' },
        { name: 'Rayan', meaning: 'Gates of heaven', gender: 'any', origin: 'Arabic', pronunciation: 'ray-YAN' },
        { name: 'Sami', meaning: 'Elevated', gender: 'any', origin: 'Arabic', pronunciation: 'SAH-mee' }
      ]
    },
    hindu: {
      boy: [
        { name: 'Arjun', meaning: 'Bright, shining', gender: 'boy', origin: 'Sanskrit', pronunciation: 'AR-jun' },
        { name: 'Aarav', meaning: 'Peaceful, wisdom', gender: 'boy', origin: 'Sanskrit', pronunciation: 'AA-rav' },
        { name: 'Vihaan', meaning: 'Dawn, morning', gender: 'boy', origin: 'Sanskrit', pronunciation: 'vih-HAAN' },
        { name: 'Aditya', meaning: 'Sun', gender: 'boy', origin: 'Sanskrit', pronunciation: 'ah-DIT-yah' },
        { name: 'Krishna', meaning: 'Dark, black', gender: 'boy', origin: 'Sanskrit', pronunciation: 'KRISH-nah' }
      ],
      girl: [
        { name: 'Ananya', meaning: 'Unique, incomparable', gender: 'girl', origin: 'Sanskrit', pronunciation: 'ah-NAN-yah' },
        { name: 'Diya', meaning: 'Lamp, light', gender: 'girl', origin: 'Sanskrit', pronunciation: 'DEE-yah' },
        { name: 'Saanvi', meaning: 'Goddess Lakshmi', gender: 'girl', origin: 'Sanskrit', pronunciation: 'SAAN-vee' },
        { name: 'Aadhya', meaning: 'First power', gender: 'girl', origin: 'Sanskrit', pronunciation: 'AAD-hyah' },
        { name: 'Priya', meaning: 'Beloved', gender: 'girl', origin: 'Sanskrit', pronunciation: 'PREE-yah' }
      ],
      any: [
        { name: 'Aarya', meaning: 'Noble', gender: 'any', origin: 'Sanskrit', pronunciation: 'AAR-yah' },
        { name: 'Avani', meaning: 'Earth', gender: 'any', origin: 'Sanskrit', pronunciation: 'ah-VAH-nee' },
        { name: 'Kiran', meaning: 'Ray of light', gender: 'any', origin: 'Sanskrit', pronunciation: 'kee-RAN' },
        { name: 'Prem', meaning: 'Love', gender: 'any', origin: 'Sanskrit', pronunciation: 'PREM' },
        { name: 'Shanti', meaning: 'Peace', gender: 'any', origin: 'Sanskrit', pronunciation: 'SHAN-tee' }
      ]
    }
  };

  return fallback[religion]?.[gender] || fallback.muslim.boy;
}