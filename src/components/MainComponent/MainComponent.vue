<!--
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-28 17:09:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/MainComponent/MainComponent.vue
-->
<template>
  <div id="main-component">
    <Weather ref="weather" />
    <div class="cloth-choser">
      <div class="cloth-class-span">上装</div>
      <ClothChoser :clothClass="'上装'" :onUserChoseCloth="onUserChoseCloth" id="choser-up"/>
    </div>
    <div class="cloth-choser">
      <div class="cloth-class-span">下装</div>
      <ClothChoser :clothClass="'下装'"  :onUserChoseCloth="onUserChoseCloth" id="choser-down"/>
    </div>
    <div class="cloth-choser">
      <div class="cloth-class-span">鞋子</div>
      <ClothChoser :clothClass="'鞋子'" :onUserChoseCloth="onUserChoseCloth" id="choser-shoes"/>
    </div>
    <div
      id="user-chose-button"
      :style="{boxShadow:'0px 1px '+btnShadowBlur+'px 1px green'}"
      @click="onUserChoseButtonClicked"
    >
      <span>选定今日搭配</span>
    </div>
  </div>
</template>

<script>
import { getRandomInt } from "../../Utils/tools";
import Weather from "./Weather/Weather";
import ClothChoser from "./ClothChoser/ClothChoser";
import {History} from "../../Utils/historyHandle"
import { Toast } from 'vant';
export default {
  name: "MainComponent",
  data() {
    return {
    btnShadowBlur:3,
      userChosedCloth:{}
    };
  },
  components: { Weather, ClothChoser },
  created() {
    setInterval(()=>{
        if(this.btnShadowBlur===25){
            this.btnShadowBlur=1;
        }else{
            this.btnShadowBlur=25;
        }
    }, 1000);
  },
  methods: {
    onUserChoseCloth(clothClass,clothObject){
        this.userChosedCloth[clothClass]=clothObject;
    },
    log(...args){
        console.log(...args);
    },
    async onUserChoseButtonClicked(){
        let historyHandle=this.$store.state.historyHandle;
        let historyObject=new History(new Date().getTime(),
        [this.userChosedCloth['上装'].clothID,this.userChosedCloth['下装'].clothID,this.userChosedCloth['鞋子'].clothID]
        ,this.$refs.weather.weatherObject.data.forecast[0]);
        await this.$store.dispatch("addHistory",historyObject)
        let toast=Toast.success("已记录");
        setTimeout(()=>toast.clear(),800);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./css/MainComponent.scss";
</style>
