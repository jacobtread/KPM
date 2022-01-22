import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "@/assets/global.scss"
import { createPinia } from "pinia";
import { loadStore } from "@/cache";

export const pinia = createPinia()
createApp(App).use(pinia).use(router).mount('#app')
loadStore()
