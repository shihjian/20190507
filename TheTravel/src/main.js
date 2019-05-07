// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router'
import './bus';
import VeeValidatr from 'vee-validate';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'
import VeeValidate from 'vee-validate';

VeeValidate.Validator.localize('zh_TW',zhTWValidate)
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('date', dateFilter);
Vue.use(VueAxios, axios);
Vue.use(VeeValidatr);
Vue.config.productionTip = false;
axios.defaults.withCredentials=true; //跨域打開

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
});


router.beforeEach((to, from, next) => {  //導航守衛
  
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}api/user/check`;
    axios.post(api).then((response) => {
    console.log(response.data);
    if(response.data.success){
    next();
    }else{
    next({
      path:'/login',
    });
    };
    });
  }else{
    next();
  }
})
