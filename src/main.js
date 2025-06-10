import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'uno.css' // 引入 UnoCSS

const app = createApp(App)

app.use(createPinia()) // 使用 Pinia
app.use(router) // 使用 Vue Router

app.mount('#app') 