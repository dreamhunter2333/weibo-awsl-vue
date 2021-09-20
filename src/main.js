import { createApp } from 'vue'
import axios from 'axios';

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

axios.defaults.baseURL = process.env.VUE_APP_BASE_API

app.config.productionTip = false;
app.use(ElementPlus)
app.mount('#app')
