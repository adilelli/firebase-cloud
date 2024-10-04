<template>
    <div>
      <button @click="notify" :disabled="loading">
        {{ loading ? 'Processing...' : 'Notify' }}
      </button>
      <div v-if="responseMessage" class="response-message">
        {{ responseMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { sendNotification, fetchTxnStatus } from './notification-service.js';
  
  export default {
    name: 'claimComponent',
    data() {
      return {
        loading: false,
        responseMessage: '',
      };
    },
    methods: {
      async notify() {
        const hash = "D042FD09627C23768E82651E016523C0F7EDF577821F01BA1DE2855C1CDD86AB";
        sendNotification(hash);
      },
      startTimer() {
      const adress = localStorage.getItem("address")
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          fetchTxnStatus(adress);
          this.timeLeft--;
        } else {
          this.resetTimer(); // Reset or do something when timer reaches 0
        }
      }, 1000); // Run every second
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timeLeft = 30; // Reset the timer to 30 seconds
    },
  
    }
  };
  </script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .response-message {
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  