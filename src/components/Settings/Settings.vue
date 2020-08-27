<!--
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-27 16:48:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/Settings/Settings.vue
-->
<template>
    <div id="settings">
        <van-cell-group>
            <van-cell center size="large" title="自动更新">
                <template #right-icon>
                    <van-switch v-model="autoUpdate" active-color="#07c160" size="24" />
                </template>
            </van-cell>
            <van-cell center size="large" title="夜间模式">
                <template #right-icon>
                    <van-switch v-model="darkmode" active-color="#07c160" size="24" 
                    @change="onDarkmodeChange"/>
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import Vue from "vue";
import { Switch, Cell, CellGroup } from "vant";
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Switch);
export default {
    name: "Settings",
    data() {
        return {
            autoUpdate: true,
            darkmode: false,
        };
    },
    created(){
        let bodyDom=document.getElementsByTagName('body')[0];
        if(bodyDom.getAttribute("class")&&bodyDom.getAttribute("class").indexOf('dark-mode')){
            this.darkmode=true;
        }
    },
    methods: {
        onDarkmodeChange(val){
            let bodyDom=document.getElementsByTagName('body')[0];
            let classStr=bodyDom.getAttribute("class")
            if(!classStr){
                classStr=""
            }
            if(val){
                bodyDom.setAttribute('class',classStr+" dark-mode")
            }else{
                bodyDom.setAttribute('class',classStr.replace(/dark-mode/g,""))
            }
        }
    },
};
</script>

<style lang="sass" scoped>
@import "./css/Settings.scss"
</style>
