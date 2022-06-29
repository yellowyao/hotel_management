import {createApp} from 'vue'
import App from './App.vue'
//引入element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'

import {vue3JsonExcel} from "vue3-json-excel"

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component(vue3JsonExcel)
app.use(ElementPlus)
app.use(router)
app.mount('#app')

