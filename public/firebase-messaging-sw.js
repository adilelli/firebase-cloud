// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAuSSVXoyOBYHlc3PugjNiCtxT13DADuP0",
  authDomain: "moei-wallet.firebaseapp.com",
  projectId: "moei-wallet",
  storageBucket: "moei-wallet.appspot.com",
  messagingSenderId: "904816777335",
  appId: "1:904816777335:web:925c436da28133debe4e72",
  measurementId: "G-3K6RYQ113L"
};

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// Initialize Firebase app
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/icon.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });