import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import {createPersistedState} from'pinia-persistedstate-plugin'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')

