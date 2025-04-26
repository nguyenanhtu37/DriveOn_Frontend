importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js");

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
    apiKey: "AIzaSyB6sB2_G5LP5OsO4ANJTzOOsuIFbsE9hPM",
    authDomain: "driveon-sep490.firebaseapp.com",
    projectId: "driveon-sep490",
    storageBucket: "driveon-sep490.firebasestorage.app",
    messagingSenderId: "880335858610",
    appId: "1:880335858610:web:3c5a86dd10254403fa12ab",
    measurementId: "G-YZLYR2FDEZ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        // icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});