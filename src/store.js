/*
 * @Author: your name
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-25 14:32:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/store.js
 */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);
import {Cloth,ClothesStorageHandle} from "./Utils/clothesStorage"
import {History,HistoryHandle} from "./Utils/historyHandle"
const store = new Vuex.Store({
  state: {
      clothesStorageHandle:new ClothesStorageHandle(),
      clothesObjectList:[],
      historyHandle:new HistoryHandle(),
      history:null
  },
  mutations: {
      
  },
  actions:{
    async loadClothStorage(context){
        let state=context.state;
        state.clothesObjectList=await this.state.clothesStorageHandle.getClothesList();
        console.log("vuex",await this.state.clothesStorageHandle.getClothesList());
    },
    async deleteCloth(context,clothID){
        let {dispatch}=context;
        await this.state.clothesStorageHandle.deleteCloth(clothID);
        dispatch("flashClothStorage")
    },
    async flashClothStorage(context){
        let state=context.state;
        let dispatch=context.dispatch;
        await dispatch('loadClothStorage');
   
    },
    async loadHistory(context){
        let state=context.state;
        let dispatch=context.dispatch;
        state.history=await state.HistoryHandle.getHistory();
    },
    async flashHistory(context){
        let state=context.state;
        let dispatch=context.dispatch;
        await dispatch('loadHistory')
    }
  }
})

export default store;