export async function POST(request) {
  try {
    const { gender, religion, style, count = 20 } = await request.json();

    console.log('📝 Request params:', { gender, religion, style, count });

    // Try API call first
    try {
      const apiKey = process.env.ABACUS_API_KEY;
      
      if (!apiKey) {
        console.warn('⚠️ No API key found, using fallback (5 names max)');
        return Response.json({ 
          names: getFallbackNames(gender, religion, Math.min(count, 5)),
          isApiWorking: false 
        });
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
          max_tokens: 3000
        }),
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        console.error('❌ API Error:', response.status, response.statusText);
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Response received');

      // Parse the generated text
      let names = [];
      if (data.text) {
        try {
          // Try to extract JSON from the response
          const jsonMatch = data.text.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            names = JSON.parse(jsonMatch[0]);
            console.log(`✅ Parsed ${names.length} names from API`);
          }
        } catch (parseError) {
          console.error('❌ Parse error:', parseError);
          throw parseError;
        }
      }

      // If API worked but parsing failed, use fallback
      if (!names || names.length === 0) {
        console.warn('⚠️ API returned no names, using fallback (5 names max)');
        return Response.json({ 
          names: getFallbackNames(gender, religion, Math.min(count, 5)),
          isApiWorking: false 
        });
      }

      // API is working!
      return Response.json({ 
        names: names.slice(0, count),
        isApiWorking: true 
      });

    } catch (apiError) {
      console.error('❌ API call failed:', apiError.message);
      // Return fallback data (max 5 names)
      return Response.json({ 
        names: getFallbackNames(gender, religion, Math.min(count, 5)),
        isApiWorking: false 
      });
    }

  } catch (error) {
    console.error('❌ Server error:', error);
    return Response.json(
      { 
        error: 'Failed to generate names', 
        names: getFallbackNames('any', 'muslim', 5),
        isApiWorking: false 
      },
      { status: 500 }
    );
  }
}

function getFallbackNames(gender, religion, count = 5) {
  const fallback = {
    muslim: {
      boy: [
        { name: 'Amir', meaning: 'Prince, commander', gender: 'boy', origin: 'Arabic' },
        { name: 'Zain', meaning: 'Beauty, grace', gender: 'boy', origin: 'Arabic' },
        { name: 'Ibrahim', meaning: 'Father of nations', gender: 'boy', origin: 'Arabic' },
        { name: 'Omar', meaning: 'Long-lived, flourishing', gender: 'boy', origin: 'Arabic' },
        { name: 'Yusuf', meaning: 'God increases', gender: 'boy', origin: 'Arabic' }
      ],
      girl: [
        { name: 'Aisha', meaning: 'Living, prosperous', gender: 'girl', origin: 'Arabic' },
        { name: 'Zara', meaning: 'Princess, flower', gender: 'girl', origin: 'Arabic' },
        { name: 'Fatima', meaning: 'Captivating', gender: 'girl', origin: 'Arabic' },
        { name: 'Maryam', meaning: 'Beloved, wished-for child', gender: 'girl', origin: 'Arabic' },
        { name: 'Layla', meaning: 'Night, dark beauty', gender: 'girl', origin: 'Arabic' }
      ],
      any: [
        { name: 'Noor', meaning: 'Light', gender: 'any', origin: 'Arabic' },
        { name: 'Rayan', meaning: 'Gates of heaven', gender: 'any', origin: 'Arabic' },
        { name: 'Iman', meaning: 'Faith', gender: 'any', origin: 'Arabic' },
        { name: 'Safa', meaning: 'Purity', gender: 'any', origin: 'Arabic' },
        { name: 'Amin', meaning: 'Trustworthy', gender: 'any', origin: 'Arabic' }
      ]
    },
    hindu: {
      boy: [
        { name: 'Arjun', meaning: 'Bright, shining', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Aarav', meaning: 'Peaceful, wisdom', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Vihaan', meaning: 'Dawn, morning', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Aditya', meaning: 'Sun', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Aryan', meaning: 'Noble, honorable', gender: 'boy', origin: 'Sanskrit' }
      ],
      girl: [
        { name: 'Ananya', meaning: 'Unique, incomparable', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Diya', meaning: 'Lamp, light', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Saanvi', meaning: 'Goddess Lakshmi', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Aadhya', meaning: 'First power', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Pari', meaning: 'Fairy, angel', gender: 'girl', origin: 'Sanskrit' }
      ],
      any: [
        { name: 'Aarya', meaning: 'Noble', gender: 'any', origin: 'Sanskrit' },
        { name: 'Kiran', meaning: 'Ray of light', gender: 'any', origin: 'Sanskrit' },
        { name: 'Avni', meaning: 'Earth', gender: 'any', origin: 'Sanskrit' },
        { name: 'Jai', meaning: 'Victory', gender: 'any', origin: 'Sanskrit' },
        { name: 'Dev', meaning: 'Divine', gender: 'any', origin: 'Sanskrit' }
      ]
    },
    christian: {
      boy: [
        { name: 'Matthew', meaning: 'Gift of God', gender: 'boy', origin: 'Hebrew' },
        { name: 'Daniel', meaning: 'God is my judge', gender: 'boy', origin: 'Hebrew' },
        { name: 'Gabriel', meaning: 'God is my strength', gender: 'boy', origin: 'Hebrew' },
        { name: 'Michael', meaning: 'Who is like God', gender: 'boy', origin: 'Hebrew' },
        { name: 'Samuel', meaning: 'God has heard', gender: 'boy', origin: 'Hebrew' }
      ],
      girl: [
        { name: 'Grace', meaning: 'Divine grace', gender: 'girl', origin: 'Latin' },
        { name: 'Faith', meaning: 'Complete trust', gender: 'girl', origin: 'English' },
        { name: 'Hope', meaning: 'Expectation and desire', gender: 'girl', origin: 'English' },
        { name: 'Hannah', meaning: 'Favor, grace', gender: 'girl', origin: 'Hebrew' },
        { name: 'Sarah', meaning: 'Princess', gender: 'girl', origin: 'Hebrew' }
      ],
      any: [
        { name: 'Angel', meaning: 'Messenger of God', gender: 'any', origin: 'Greek' },
        { name: 'Eden', meaning: 'Paradise', gender: 'any', origin: 'Hebrew' },
        { name: 'Jordan', meaning: 'To flow down', gender: 'any', origin: 'Hebrew' },
        { name: 'Trinity', meaning: 'Triad', gender: 'any', origin: 'Latin' },
        { name: 'Jesse', meaning: 'Gift', gender: 'any', origin: 'Hebrew' }
      ]
    },
    sikh: {
      boy: [
        { name: 'Arjan', meaning: 'Bright, shining', gender: 'boy', origin: 'Punjabi' },
        { name: 'Harman', meaning: 'Beloved of God', gender: 'boy', origin: 'Punjabi' },
        { name: 'Gurpreet', meaning: 'Love of the Guru', gender: 'boy', origin: 'Punjabi' },
        { name: 'Amrit', meaning: 'Nectar of immortality', gender: 'boy', origin: 'Punjabi' },
        { name: 'Karan', meaning: 'Helper, compassionate', gender: 'boy', origin: 'Punjabi' }
      ],
      girl: [
        { name: 'Simran', meaning: 'Remembrance of God', gender: 'girl', origin: 'Punjabi' },
        { name: 'Navleen', meaning: 'New', gender: 'girl', origin: 'Punjabi' },
        { name: 'Jasleen', meaning: 'Absorbed in singing God\'s praises', gender: 'girl', origin: 'Punjabi' },
        { name: 'Harleen', meaning: 'Absorbed in God', gender: 'girl', origin: 'Punjabi' },
        { name: 'Kirandeep', meaning: 'Ray of light', gender: 'girl', origin: 'Punjabi' }
      ],
      any: [
        { name: 'Jas', meaning: 'Glory', gender: 'any', origin: 'Punjabi' },
        { name: 'Preet', meaning: 'Love', gender: 'any', origin: 'Punjabi' },
        { name: 'Jot', meaning: 'Light', gender: 'any', origin: 'Punjabi' },
        { name: 'Noor', meaning: 'Divine light', gender: 'any', origin: 'Punjabi' },
        { name: 'Aman', meaning: 'Peace', gender: 'any', origin: 'Punjabi' }
      ]
    },
    buddhist: {
      boy: [
        { name: 'Bodhi', meaning: 'Enlightenment', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Tenzin', meaning: 'Holder of teachings', gender: 'boy', origin: 'Tibetan' },
        { name: 'Karma', meaning: 'Action, fate', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Dorje', meaning: 'Thunderbolt', gender: 'boy', origin: 'Tibetan' },
        { name: 'Sonam', meaning: 'Merit, virtue', gender: 'boy', origin: 'Tibetan' }
      ],
      girl: [
        { name: 'Tara', meaning: 'Star, goddess', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Pema', meaning: 'Lotus', gender: 'girl', origin: 'Tibetan' },
        { name: 'Dawa', meaning: 'Moon', gender: 'girl', origin: 'Tibetan' },
        { name: 'Yangchen', meaning: 'Melodious voice', gender: 'girl', origin: 'Tibetan' },
        { name: 'Dolma', meaning: 'Tara, savior', gender: 'girl', origin: 'Tibetan' }
      ],
      any: [
        { name: 'Dharma', meaning: 'Universal truth', gender: 'any', origin: 'Sanskrit' },
        { name: 'Nirvana', meaning: 'Liberation', gender: 'any', origin: 'Sanskrit' },
        { name: 'Sangha', meaning: 'Community', gender: 'any', origin: 'Sanskrit' },
        { name: 'Metta', meaning: 'Loving-kindness', gender: 'any', origin: 'Pali' },
        { name: 'Zen', meaning: 'Meditation', gender: 'any', origin: 'Japanese' }
      ]
    },
    jain: {
      boy: [
        { name: 'Aditya', meaning: 'Sun', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Rishabh', meaning: 'Superior, first Tirthankara', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Mahavir', meaning: 'Great hero', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Parshva', meaning: '23rd Tirthankara', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Nemi', meaning: '22nd Tirthankara', gender: 'boy', origin: 'Sanskrit' }
      ],
      girl: [
        { name: 'Ahimsa', meaning: 'Non-violence', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Jivika', meaning: 'Source of life', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Ratna', meaning: 'Jewel', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Chandana', meaning: 'Sandalwood', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Mallika', meaning: 'Jasmine', gender: 'girl', origin: 'Sanskrit' }
      ],
      any: [
        { name: 'Shanti', meaning: 'Peace', gender: 'any', origin: 'Sanskrit' },
        { name: 'Moksha', meaning: 'Liberation', gender: 'any', origin: 'Sanskrit' },
        { name: 'Satya', meaning: 'Truth', gender: 'any', origin: 'Sanskrit' },
        { name: 'Karuna', meaning: 'Compassion', gender: 'any', origin: 'Sanskrit' },
        { name: 'Anand', meaning: 'Bliss', gender: 'any', origin: 'Sanskrit' }
      ]
    },
    jewish: {
      boy: [
        { name: 'Noah', meaning: 'Rest, comfort', gender: 'boy', origin: 'Hebrew' },
        { name: 'Elijah', meaning: 'My God is Yahweh', gender: 'boy', origin: 'Hebrew' },
        { name: 'Isaac', meaning: 'He will laugh', gender: 'boy', origin: 'Hebrew' },
        { name: 'Jacob', meaning: 'Supplanter', gender: 'boy', origin: 'Hebrew' },
        { name: 'Benjamin', meaning: 'Son of the right hand', gender: 'boy', origin: 'Hebrew' }
      ],
      girl: [
        { name: 'Sarah', meaning: 'Princess', gender: 'girl', origin: 'Hebrew' },
        { name: 'Rachel', meaning: 'Ewe', gender: 'girl', origin: 'Hebrew' },
        { name: 'Leah', meaning: 'Weary', gender: 'girl', origin: 'Hebrew' },
        { name: 'Miriam', meaning: 'Wished-for child', gender: 'girl', origin: 'Hebrew' },
        { name: 'Esther', meaning: 'Star', gender: 'girl', origin: 'Persian' }
      ],
      any: [
        { name: 'Shalom', meaning: 'Peace', gender: 'any', origin: 'Hebrew' },
        { name: 'Zion', meaning: 'Highest point', gender: 'any', origin: 'Hebrew' },
        { name: 'Ariel', meaning: 'Lion of God', gender: 'any', origin: 'Hebrew' },
        { name: 'Eden', meaning: 'Paradise', gender: 'any', origin: 'Hebrew' },
        { name: 'Oren', meaning: 'Pine tree', gender: 'any', origin: 'Hebrew' }
      ]
    }
  };

  const religionData = fallback[religion] || fallback.muslim;
  const genderData = religionData[gender] || religionData.boy;
  
  return genderData.slice(0, Math.min(count, 5));
}