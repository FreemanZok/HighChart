import Vue from 'vue'
import App from './App.vue'

import HighchartsVue from 'highcharts-vue'

import Highcharts from "highcharts";
import Gantt from "highcharts/modules/gantt";
Gantt(Highcharts);
Vue.use(HighchartsVue)
Vue.use(require('vue-jalali-moment'));
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
