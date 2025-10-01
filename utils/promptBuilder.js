// utils/promptBuilder.js
export function buildNamePrompt({ gender, religion, style, language, count }) {
  const styleDescriptions = {
    modern: 'contemporary, trendy, and popular in current times',
    traditional: 'classic, time-honored, and rooted in cultural heritage',
    unique: 'rare, distinctive, and uncommon',
    spiritual: 'deeply religious, with divine or sacred meanings'
  };

  const religionContext = {
    muslim: 'Islamic tradition, from Quran, Hadith, or Arabic/Persian origins',
    hindu: 'Hindu tradition, from Sanskrit, Vedic texts, or Indian mythology'
  };

  return `Generate ${count} ${styleDescriptions[style]} ${religion} baby names.

Context:
- Religion: ${religionContext[religion]}
- Gender: ${gender === 'any' ? 'both boys and girls (balanced mix)' : gender}
- Style: ${styleDescriptions[style]}
- Target language: ${language}

Cultural Requirements:
${religion === 'muslim' ? `
- Include names from Arabic, Persian, Turkish, or Urdu origins
- Consider names of prophets, companions, or with Islamic virtues
- Ensure proper Arabic pronunciation guidance
` : `
- Include names from Sanskrit, Hindi, or regional Indian languages
- Consider names from Hindu deities, epics (Ramayana/Mahabharata), or Vedic texts
- Ensure proper Sanskrit/Hindi pronunciation
`}

Output Format (JSON only):
[
  {
    "name": "English transliteration",
    "meaning": "Detailed meaning with cultural context",
    "gender": "boy" or "girl",
    "origin": "Language/cultural origin",
    "pronunciation": "Phonetic guide",
    "translation": {
      "hindi": "देवनागरी script",
      "urdu": "اردو script",
      "arabic": "العربية script" (for Muslim names)
    }
  }
]`;
}