<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useToast } from 'vue-toastification';
// import { claimComponent } from './claimComponent.vue'
import claimComponent from './claimComponent.vue';
import { saveFcm } from './notification-service.js';

//store - firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuSSVXoyOBYHlc3PugjNiCtxT13DADuP0",
  authDomain: "moei-wallet.firebaseapp.com",
  projectId: "moei-wallet",
  storageBucket: "moei-wallet.appspot.com",
  messagingSenderId: "904816777335",
  appId: "1:904816777335:web:925c436da28133debe4e72",
  measurementId: "G-3K6RYQ113L"
};


const app = initializeApp(firebaseConfig);

const toast = useToast();
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Show toast notification
  toast(payload.notification.title, {
    body: payload.notification.body,
    type: 'success',
    timeout: 5000,
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}


//vapidkey store - firebase
getToken(messaging, { vapidKey: 'BMag28Cq5Wnkp3yjT-eHrUDR_Pi6ORmqBOPsad7mu-hR_xRO1KZ3b8fiOp_gIM46nCKbwI51tMV-ef_ipMtNPw8' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("Token is:",currentToken);
    let address = "ZCFUFMK2OYH6JEKZXF3WZDUBWE34OMYM4ASN3HI3";
    saveFcm(currentToken, address);
    localStorage.setItem("fcmToken", currentToken);
    localStorage.setItem("address", address);
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <claimComponent></claimComponent>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
