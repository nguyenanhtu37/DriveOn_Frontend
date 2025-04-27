importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyB6sB2_G5LP5OsO4ANJTzOOsuIFbsE9hPM",
  authDomain: "driveon-sep490.firebaseapp.com",
  projectId: "driveon-sep490",
  storageBucket: "driveon-sep490.appspot.com",
  messagingSenderId: "880335858610",
  appId: "1:880335858610:web:3c5a86dd10254403fa12ab",
  measurementId: "G-YZLYR2FDEZ",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification?.title || "Notification Title";
  const notificationOptions = {
    body: payload.notification?.body || "Notification Body",
    // icon: '/firebase-logo.png', 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});