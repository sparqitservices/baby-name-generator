// test-api.js
const fetch = require('node-fetch');

const API_KEY = 's2_d351c4bbab9e492591848e5dd3cbbbdd'; // Replace with your actual key

async function testAPI() {
  try {
    const response = await fetch('https://api.abacus.ai/api/v0/sendChatMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        message: 'Say hello',
        conversationId: null
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();