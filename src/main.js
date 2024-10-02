import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toast from 'vue-toastification';

const app = createApp(App);
app.use(Toast, {
    // Options can be added here
  });
  
app.mount('#app')
