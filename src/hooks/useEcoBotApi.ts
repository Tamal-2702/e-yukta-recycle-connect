
import { useState } from 'react';

// Hook for handling Gemini API requests
export const useEcoBotApi = () => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem('gemini-api-key')
  );

  const saveApiKey = (key: string) => {
    localStorage.setItem('gemini-api-key', key);
    setApiKey(key);
    return true;
  };

  const sendMessage = async (message: string): Promise<string> => {
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are EcoBot, a helpful assistant specializing in e-waste management and sustainable electronics practices. 
                  Keep your responses concise and informative.
                  
                  User question: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text || 'I couldn\'t generate a response. Please try again.';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  const hasApiKey = !!apiKey;

  return {
    sendMessage,
    saveApiKey,
    hasApiKey,
  };
};
