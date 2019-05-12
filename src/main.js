import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
// canvas库
import VueKonva from 'vue-konva'
// vant - mobile ui
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(VueKonva)

Vue.prototype.$axios = Axios
Vue.prototype.HOST = '/baidu_music_api'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
