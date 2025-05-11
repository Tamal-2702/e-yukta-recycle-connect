
// Google Cloud Services Configuration
// Centralized configuration for all Google APIs used in the application

// API key for Google Cloud services
const GOOGLE_API_KEY = 'Your Google API Key  (Prefer model: gemini-2.0-flash)';

// Base configuration for Google Maps and related services
export const mapsConfig = {
  apiKey: GOOGLE_API_KEY,
  libraries: ['places', 'geocoding', 'routes'],
  region: 'IN', // Default region: India
  language: 'en',
};

// Configuration for Google Cloud Vision API
export const visionApiConfig = {
  apiKey: GOOGLE_API_KEY,
  baseUrl: 'https://vision.googleapis.com/v1',
  endpoints: {
    annotate: '/images:annotate',
  },
  maxResults: 10,
};

// Configuration for Gemini API
export const geminiApiConfig = {
  apiKey: GOOGLE_API_KEY,
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  defaultModel: 'gemini-2.0-flash',
  endpoints: {
    generateContent: '/models/gemini-2.0-flash:generateContent',
  },
  defaultParams: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 800,
  },
};

// Configuration for Firebase Cloud Messaging
export const fcmConfig = {
  apiKey: GOOGLE_API_KEY,
  vapidKey: '', // You'll need to add your VAPID key for web push notifications
};

// Configuration for Google Cloud Storage
export const storageConfig = {
  apiKey: GOOGLE_API_KEY,
  bucket: 'e-yukta.appspot.com', // Default bucket based on your Firebase project
};

// Configuration for Cloud Firestore
export const firestoreConfig = {
  apiKey: GOOGLE_API_KEY,
  projectId: 'e-yukta',
};

export default {
  apiKey: GOOGLE_API_KEY,
  mapsConfig,
  visionApiConfig,
  geminiApiConfig,
  fcmConfig,
  storageConfig,
  firestoreConfig,
};
