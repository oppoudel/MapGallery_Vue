import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bulma/css/bulma.css'
import App from './App.vue'
import Maps from './components/Maps.vue'
import WebMap from './components/Map.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Maps },
  { path: '/map/:mapID', component: WebMap }
]

const router = new VueRouter({
  routes
  //,
  //mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
