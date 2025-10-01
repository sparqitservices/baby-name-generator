function getFallbackNames(gender, religion) {
  const fallback = {
    muslim: {
      boy: [
        { name: 'Amir', meaning: 'Prince, commander', gender: 'boy', origin: 'Arabic' },
        { name: 'Zain', meaning: 'Beauty, grace', gender: 'boy', origin: 'Arabic' },
        { name: 'Ibrahim', meaning: 'Father of nations', gender: 'boy', origin: 'Arabic' }
      ],
      girl: [
        { name: 'Aisha', meaning: 'Living, prosperous', gender: 'girl', origin: 'Arabic' },
        { name: 'Zara', meaning: 'Princess, flower', gender: 'girl', origin: 'Arabic' },
        { name: 'Fatima', meaning: 'Captivating', gender: 'girl', origin: 'Arabic' }
      ],
      any: [
        { name: 'Noor', meaning: 'Light', gender: 'any', origin: 'Arabic' },
        { name: 'Rayan', meaning: 'Gates of heaven', gender: 'any', origin: 'Arabic' }
      ]
    },
    hindu: {
      boy: [
        { name: 'Arjun', meaning: 'Bright, shining', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Aarav', meaning: 'Peaceful, wisdom', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Vihaan', meaning: 'Dawn, morning', gender: 'boy', origin: 'Sanskrit' }
      ],
      girl: [
        { name: 'Ananya', meaning: 'Unique, incomparable', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Diya', meaning: 'Lamp, light', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Saanvi', meaning: 'Goddess Lakshmi', gender: 'girl', origin: 'Sanskrit' }
      ],
      any: [
        { name: 'Aarya', meaning: 'Noble', gender: 'any', origin: 'Sanskrit' },
        { name: 'Kiran', meaning: 'Ray of light', gender: 'any', origin: 'Sanskrit' }
      ]
    },
    christian: {
      boy: [
        { name: 'Matthew', meaning: 'Gift of God', gender: 'boy', origin: 'Hebrew' },
        { name: 'Daniel', meaning: 'God is my judge', gender: 'boy', origin: 'Hebrew' },
        { name: 'Gabriel', meaning: 'God is my strength', gender: 'boy', origin: 'Hebrew' }
      ],
      girl: [
        { name: 'Grace', meaning: 'Divine grace', gender: 'girl', origin: 'Latin' },
        { name: 'Faith', meaning: 'Complete trust', gender: 'girl', origin: 'English' },
        { name: 'Hope', meaning: 'Expectation and desire', gender: 'girl', origin: 'English' }
      ],
      any: [
        { name: 'Angel', meaning: 'Messenger of God', gender: 'any', origin: 'Greek' },
        { name: 'Eden', meaning: 'Paradise', gender: 'any', origin: 'Hebrew' }
      ]
    },
    sikh: {
      boy: [
        { name: 'Arjan', meaning: 'Bright, shining', gender: 'boy', origin: 'Punjabi' },
        { name: 'Harman', meaning: 'Beloved of God', gender: 'boy', origin: 'Punjabi' },
        { name: 'Gurpreet', meaning: 'Love of the Guru', gender: 'boy', origin: 'Punjabi' }
      ],
      girl: [
        { name: 'Simran', meaning: 'Remembrance of God', gender: 'girl', origin: 'Punjabi' },
        { name: 'Navleen', meaning: 'New', gender: 'girl', origin: 'Punjabi' },
        { name: 'Jasleen', meaning: 'Absorbed in singing God\'s praises', gender: 'girl', origin: 'Punjabi' }
      ],
      any: [
        { name: 'Jas', meaning: 'Glory', gender: 'any', origin: 'Punjabi' },
        { name: 'Preet', meaning: 'Love', gender: 'any', origin: 'Punjabi' }
      ]
    },
    buddhist: {
      boy: [
        { name: 'Bodhi', meaning: 'Enlightenment', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Tenzin', meaning: 'Holder of teachings', gender: 'boy', origin: 'Tibetan' },
        { name: 'Karma', meaning: 'Action, fate', gender: 'boy', origin: 'Sanskrit' }
      ],
      girl: [
        { name: 'Tara', meaning: 'Star, goddess', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Pema', meaning: 'Lotus', gender: 'girl', origin: 'Tibetan' },
        { name: 'Dawa', meaning: 'Moon', gender: 'girl', origin: 'Tibetan' }
      ],
      any: [
        { name: 'Dharma', meaning: 'Universal truth', gender: 'any', origin: 'Sanskrit' },
        { name: 'Nirvana', meaning: 'Liberation', gender: 'any', origin: 'Sanskrit' }
      ]
    },
    jain: {
      boy: [
        { name: 'Aditya', meaning: 'Sun', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Rishabh', meaning: 'Superior, first Tirthankara', gender: 'boy', origin: 'Sanskrit' },
        { name: 'Mahavir', meaning: 'Great hero', gender: 'boy', origin: 'Sanskrit' }
      ],
      girl: [
        { name: 'Ahimsa', meaning: 'Non-violence', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Jivika', meaning: 'Source of life', gender: 'girl', origin: 'Sanskrit' },
        { name: 'Ratna', meaning: 'Jewel', gender: 'girl', origin: 'Sanskrit' }
      ],
      any: [
        { name: 'Shanti', meaning: 'Peace', gender: 'any', origin: 'Sanskrit' },
        { name: 'Moksha', meaning: 'Liberation', gender: 'any', origin: 'Sanskrit' }
      ]
    },
    jewish: {
      boy: [
        { name: 'Noah', meaning: 'Rest, comfort', gender: 'boy', origin: 'Hebrew' },
        { name: 'Elijah', meaning: 'My God is Yahweh', gender: 'boy', origin: 'Hebrew' },
        { name: 'Isaac', meaning: 'He will laugh', gender: 'boy', origin: 'Hebrew' }
      ],
      girl: [
        { name: 'Sarah', meaning: 'Princess', gender: 'girl', origin: 'Hebrew' },
        { name: 'Rachel', meaning: 'Ewe', gender: 'girl', origin: 'Hebrew' },
        { name: 'Leah', meaning: 'Weary', gender: 'girl', origin: 'Hebrew' }
      ],
      any: [
        { name: 'Shalom', meaning: 'Peace', gender: 'any', origin: 'Hebrew' },
        { name: 'Zion', meaning: 'Highest point', gender: 'any', origin: 'Hebrew' }
      ]
    }
  };

  return fallback[religion]?.[gender] || fallback.muslim.boy;
}