import { toast } from 'react-toastify';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermissionAndGetToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            try {
                const token = await getToken(messaging, {
                    // vapidKey: import.meta.env.VITE_FIREBASE_VAPID_PUBLIC,
                    vapidKey: "BM46UVyYJv-wL0SXWynBC4sznSxiZ9Yh954DC3kQvqjoWj6hg9Wx6Hbpi4mC_oKH3wGM9d8Yowi5hD9qcoTSIEo",
                });
                console.log("Your device token:", token);

                return token;
            } catch (error) {
                console.error("Failed to get token:", error);
                alert("Không thể lấy token thông báo. Vui lòng thử lại sau.");
                return Promise.reject(error);
            }
        } else {
            console.warn("Permission not granted for Notification");
            alert("Bạn cần cấp quyền thông báo để nhận thông báo từ Firebase.");
            return Promise.reject("Permission not granted");
        }
    } catch (error) {
        console.error("An error occurred while retrieving token.", error);
        return Promise.reject(error);
    }
};

onMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received foreground message ', payload);

    if (payload.notification) {
        const { title, body } = payload.notification;

        toast(`${title}: ${body}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else {
        console.warn("Received message without notification payload:", payload);
    }
});

const sendNotification = async (deviceToken, title, body) => {
    try {
        const response = await fetch("http://localhost:5000/api/fcm/send-multiple-notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deviceTokens: [deviceToken],
                title: title,
                body: body,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Notification sent successfully:", result);
        } else {
            console.error("Failed to send notification:", response.statusText);
        }
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};