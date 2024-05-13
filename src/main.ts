import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' //引入axios
import vueAxios from 'vue-axios'

const app = createApp(App)

app.use(vueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

app.use(router)

app.mount('#app')
