<!--
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-25 14:50:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/History/History.vue
-->
<template>
  <div id='history'>
      <SingleHistory v-for="historyObject in historyObjectList" 
      :key="historyObject.unixTime"
      :historyObject="historyObject"/>
  </div>
</template>

<script>
import "./css/History.scss"
import SingleHistory from "./SingleHistory/SingleHistory"
export default {
    name:"History",
    components:{SingleHistory},
    data(){
        return {
            historyObjectList:[]
        }
    },
    created(){
        this.loadHistoryObjectList();
    },
    methods:{
        async loadHistoryObjectList(){
            let historyObjectCollection=await this.historyHandle.getHistory();
            let historyObjectList=[];
            for(let key in historyObjectCollection){
                historyObjectList.push(historyObjectCollection[key]);
            }
            historyObjectList.sort((history0,history1)=>{
                return history1.unixTime-history0.unixTime;
            })
            this.historyObjectList=historyObjectList;
        }
    },
    computed:{
        historyHandle(){
            return this.$store.state.historyHandle;
        }
    }
}
</script>

<style>

</style>