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
  import { sendNotification } from './notification-service.js';
  
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
        sendNotification();
      }
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
  