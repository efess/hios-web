import App from './components/app.vue';
import Test from './components/test.vue';
import Test2 from './components/testTwo.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

Vue.use(VueRouter);
Vue.use(VueMaterial);

const routes = [
  { path: '/', component: Test },
  { path: '/test2', component: Test2 }
]

const router = new VueRouter({
  routes 
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')