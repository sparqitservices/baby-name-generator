// app/api/generate/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const params = await request.json();
    const { gender, religion, style, language } = params;

    console.log('=== API Request Started ===');
    console.log('Params:', params);

    const prompt = `Generate 5 ${gender} baby names for ${religion} religion in ${style} style. 
Return ONLY a JSON array with this format:
[{"name": "Name", "meaning": "Meaning", "gender": "${gender}", "origin": "Origin"}]`;

    // CORRECT Abacus.AI endpoint for ChatLLM
    const apiUrl = 'https://api.abacus.ai/api/v0/sendChatMessage';
    
    console.log('Calling:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUS_API_KEY}`
      },
      body: JSON.stringify({
        message: prompt,
        conversationId: null, // New conversation
        deploymentId: null // Use default model
      })
    });

    console.log('Response status:', response.status);

    const responseText = await response.text();
    console.log('Response body:', responseText.substring(0, 500));

    if (!response.ok) {
      console.error('API Error:', response.status, responseText);
      
      return NextResponse.json({ 
        names: getFallbackNames(gender, religion),
        fallback: true,
        error: `API returned ${response.status}`
      });
    }

    const data = JSON.parse(responseText);
    const content = data.response || data.message || data.text || '';

    console.log('Extracted content:', content.substring(0, 200));

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
    console.error('Error message:', error.message);
    
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
      ]
    }
  };

  const genderKey = gender === 'any' ? 'boy' : gender;
  return fallback[religion]?.[genderKey] || fallback.muslim.boy;
}