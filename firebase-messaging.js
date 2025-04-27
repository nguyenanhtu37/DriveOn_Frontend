import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB6sB2_G5LP5OsO4ANJTzOOsuIFbsE9hPM",
  authDomain: "driveon-sep490.firebaseapp.com",
  projectId: "driveon-sep490",
  storageBucket: "driveon-sep490.appspot.com",
  messagingSenderId: "880335858610",
  appId: "1:880335858610:web:3c5a86dd10254403fa12ab",
  measurementId: "G-YZLYR2FDEZ",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");

      const currentToken = await getToken(messaging, {
        vapidKey: "BM46UVyYJv-wL0SXWynBC4sznSxiZ9Yh954DC3kQvqjoWj6hg9Wx6Hbpi4mC_oKH3wGM9d8Yowi5hD9qcoTSIEo",
        serviceWorkerRegistration: await navigator.serviceWorker.ready,
      });

      if (currentToken) {
        // console.log("Device token:", currentToken);
        return currentToken;
      } else {
        console.warn("No registration token available. Request permission to generate one.");
        throw new Error("No device token generated.");
      }
    } else {
      console.warn("Notification permission not granted.");
      throw new Error("Notification permission not granted.");
    }
  } catch (error) {
    console.error("An error occurred while getting device token:", error);
    throw error;
  }
};

export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    }, reject);
  });