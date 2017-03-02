import App from './components/app.vue';
import Test from './components/test.vue';
import Test2 from './components/testTwo.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import store from './store';
import 'vue-material/dist/vue-material.css';

Vue.use(VueRouter);
Vue.use(VueMaterial);

const routes = [
  { path: '/', component: Test },
  { path: '/kitchen', component: require('./components/undercabinet/undercabinet.vue') },
  { path: '/livingroom', component: require('./components/environment/environment.vue') }
]

const router = new VueRouter({
  routes 
})

const app = new Vue({
  store,
  router,
  ...App
}).$mount('#app')