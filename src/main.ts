import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/reset.scss'
import 'element-plus/dist/index.css'
import router from '@/router'
import pinia from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from '@/App.vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(pinia)
app.mount('#app')
