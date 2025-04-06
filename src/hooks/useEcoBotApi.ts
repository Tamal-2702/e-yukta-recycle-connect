
import { useState } from 'react';
import { geminiApiConfig } from '@/lib/googleApiConfig';

// Hook for handling Gemini API requests
export const useEcoBotApi = () => {
  // Use the API key from centralized config
  const apiKey = geminiApiConfig.apiKey;

  const sendMessage = async (message: string): Promise<string> => {
    try {
      // Using config values from centralized config
      const response = await fetch(`${geminiApiConfig.baseUrl}${geminiApiConfig.endpoints.generateContent}`, {
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
            temperature: geminiApiConfig.defaultParams.temperature,
            topK: geminiApiConfig.defaultParams.topK,
            topP: geminiApiConfig.defaultParams.topP,
            maxOutputTokens: geminiApiConfig.defaultParams.maxOutputTokens,
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

  // Always return true since we have a valid API key
  const hasApiKey = true;

  return {
    sendMessage,
    hasApiKey,
  };
};
