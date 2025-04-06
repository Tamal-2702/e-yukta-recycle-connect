
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { fcmConfig } from "@/lib/googleApiConfig";
import app from "../firebase";

// Initialize Firebase Cloud Messaging
export const initializeMessaging = async () => {
  try {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications");
      return null;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission not granted");
      return null;
    }

    const messaging = getMessaging(app);
    
    // Get registration token for FCM
    const currentToken = await getToken(messaging, {
      vapidKey: fcmConfig.vapidKey
    });
    
    if (currentToken) {
      console.log("FCM registration token:", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available");
      return null;
    }
  } catch (error) {
    console.error("Error initializing messaging:", error);
    return null;
  }
};

// Set up foreground message handler
export const setupMessageListener = () => {
  try {
    const messaging = getMessaging(app);
    
    return onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
      
      // Display a notification
      if (payload.notification) {
        const { title, body } = payload.notification;
        
        // Show custom notification
        new Notification(title || "New Notification", {
          body: body || "You have a new notification",
          icon: "/favicon.ico"
        });
      }
    });
  } catch (error) {
    console.error("Error setting up message listener:", error);
    return null;
  }
};

export const sendPushNotificationToToken = async (token: string, title: string, body: string, data: any = {}) => {
  try {
    // This would typically be done from your backend for security reasons
    // This is just a placeholder to show the structure of the request
    console.log(`Would send notification to token ${token} with title "${title}" and body "${body}"`);
    console.log("Additional data:", data);
    
    // In a real implementation, you would send this request from your backend:
    /*
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=YOUR_SERVER_KEY` // Server key, not the public API key
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title,
          body,
        },
        data
      })
    });
    
    return response.json();
    */
    
    return true;
  } catch (error) {
    console.error("Error sending push notification:", error);
    return false;
  }
};
