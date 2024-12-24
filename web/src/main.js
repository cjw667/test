import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import './style/element_visiable.scss'

import 'element-plus/dist/index.css'
// 引入gin-vue-admin前端初始化相关内容
import './core/gin-vue-admin'
// 引入封装的router
import run from '@/core/gin-vue-admin.js'
import auth from '@/directive/auth'
import '@/permission'
import { store } from '@/pinia'
import router from '@/router/index'
import App from './App.vue'
import i18n from './plugin/i18n'
// 消除警告
import 'default-passive-events'

const app = createApp(App)
app.config.productionTip = false

app.use(run).use(i18n).use(ElementPlus).use(store).use(auth).use(router).mount('#app')
export default app
