import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { currency, date } from './methods/format'

import CKEditor from "@ckeditor/ckeditor5-vue";

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import AllRules from "@vee-validate/rules";

//載入驗證規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 設定繁中和自動驗證
configure({
  generateMessage: localize({ zh_TW: zhTW }), 
  validateOnInput: true, 
});
setLocale("zh_TW");


const app = createApp(App)

app.config.globalProperties.$format = {
  currency, date
}



app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(CKEditor);

app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);

app.mount('#app')
