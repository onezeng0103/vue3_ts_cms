import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/reset.scss'
import 'element-plus/dist/index.css'
import router from '@/router'
import pinia from '@/store'
import App from '@/App.vue'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
