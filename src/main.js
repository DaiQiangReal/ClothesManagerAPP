/*
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-23 20:25:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/main.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import store from './store'
import App from './App.vue'
import MainComponent from "./components/MainComponent/MainComponent.vue"
import Storage from "./components/Storage/Storage.vue"
import History from "./components/History/History.vue"
import Settings from "./components/Settings/Settings.vue"
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window)
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
const routes=[
    {path:'/Storage',component:Storage},
    {path:'/History',component:History},
    {path:'/Settings',component:Settings},
    {path:'/Main',component:MainComponent},
    {path:'/',redirect:'/Main'}
]
const router = new VueRouter({
    routes,
    mode:'hash'
  })
new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')
