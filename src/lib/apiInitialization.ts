
import app, { db, storage } from './firebase';
import { initializeMessaging, setupMessageListener } from './firebase/messaging';
import { visionApiConfig, geminiApiConfig, mapsConfig } from './googleApiConfig';

// Check if the APIs are available and functional
export const checkApiAvailability = async () => {
  const results = {
    firebase: false,
    firestore: false,
    storage: false,
    vision: false,
    gemini: false,
    maps: false,
    messaging: false
  };
  
  // Check Firebase core
  try {
    if (app) {
      results.firebase = true;
    }
  } catch (error) {
    console.error("Firebase core check failed:", error);
  }
  
  // Check Firestore
  try {
    if (db) {
      results.firestore = true;
    }
  } catch (error) {
    console.error("Firestore check failed:", error);
  }
  
  // Check Storage
  try {
    if (storage) {
      results.storage = true;
    }
  } catch (error) {
    console.error("Storage check failed:", error);
  }
  
  // Check Vision API
  try {
    const testResponse = await fetch(`https://vision.googleapis.com/v1/files:test?key=${visionApiConfig.apiKey}`);
    // This endpoint doesn't exist, but we're just checking the API key by seeing if we get an auth error (401) vs a not found error (404)
    results.vision = testResponse.status === 404; // If 404, then the API key is valid but endpoint doesn't exist
  } catch (error) {
    console.error("Vision API check failed:", error);
  }
  
  // Check Gemini API
  try {
    const testResponse = await fetch(`${geminiApiConfig.baseUrl}/models?key=${geminiApiConfig.apiKey}`);
    results.gemini = testResponse.ok;
  } catch (error) {
    console.error("Gemini API check failed:", error);
  }
  
  // Check Maps API
  try {
    const testResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=test&key=${mapsConfig.apiKey}`);
    results.maps = testResponse.ok;
  } catch (error) {
    console.error("Maps API check failed:", error);
  }
  
  // Check Messaging capabilities
  try {
    // This doesn't confirm the API works, just checks if the browser supports it
    results.messaging = 'Notification' in window && 'serviceWorker' in navigator;
  } catch (error) {
    console.error("Messaging check failed:", error);
  }
  
  return results;
};

// Initialize all APIs
export const initializeApis = async () => {
  try {
    // Check API availability first
    const availability = await checkApiAvailability();
    console.log("API availability:", availability);
    
    // Initialize messaging if available and permission is granted
    let messagingToken = null;
    if (availability.messaging) {
      messagingToken = await initializeMessaging();
      if (messagingToken) {
        setupMessageListener();
      }
    }
    
    return {
      availability,
      messagingToken
    };
  } catch (error) {
    console.error("Error initializing APIs:", error);
    return {
      availability: {
        firebase: false,
        firestore: false,
        storage: false,
        vision: false,
        gemini: false,
        maps: false,
        messaging: false
      },
      messagingToken: null
    };
  }
};

export default {
  checkApiAvailability,
  initializeApis
};
