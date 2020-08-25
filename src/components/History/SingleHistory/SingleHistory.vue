<!--
 * @Author: 代强
 * @Date: 2020-08-16 22:06:34
 * @LastEditTime: 2020-08-25 20:27:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/History/SingleHistory/SingleHistory.vue
-->
<template>
    <div
        id="single-history"
        @touchstart="() => this.longPressDeleteDialogHandle('mousedown')"
        @touchend="() => this.longPressDeleteDialogHandle('mouseup')"
        @touchmove="() => this.longPressDeleteDialogHandle('mousemove')"
        @mousedown="() => this.longPressDeleteDialogHandle('mousedown')"
        @mouseup="() => this.longPressDeleteDialogHandle('mouseup')"
        @mousemove="() => this.longPressDeleteDialogHandle('mousemove')"
    >
    <van-swipe-cell>

 
        <div id="information">
            <div id="time">
                <div id="date">
                    {{
                        historyObject
                            ? new Date(
                                  historyObject.unixTime
                              ).toLocaleDateString()
                            : ""
                    }}
                </div>
                <div id="clock">
                    {{
                        historyObject
                            ? new Date(
                                  historyObject.unixTime
                              ).toLocaleTimeString()
                            : ""
                    }}
                </div>
            </div>
            <div id="weather">
                <div id="type">
                    {{ historyObject ? historyObject.weather.type : "" }}
                </div>
                <div id="high">
                    {{ historyObject ? historyObject.weather.high : "" }}
                </div>
                <div id="low">
                    {{ historyObject ? historyObject.weather.low : "" }}
                </div>
                <div id="fengxiang">
                    {{ historyObject ? historyObject.weather.fengxiang : "" }}
                </div>
                <div id="fengli">
                    {{
                        historyObject
                            ? historyObject.weather.fengli.slice(9, -3)
                            : ""
                    }}
                </div>
            </div>
        </div>

        <div id="image">
            <div class="cloth-image">
                <img
                    v-if="upImageBase64 !== undefined"
                    :src="'data:text/html;base64,' + upImageBase64"
                />
                <div v-show="upImageBase64 === undefined">衣物已删除</div>
            </div>
            <div class="cloth-image">
                <img
                    v-if="downImageBase64 !== undefined"
                    :src="'data:text/html;base64,' + downImageBase64"
                />
                <div v-show="downImageBase64 === undefined">衣物已删除</div>
            </div>
            <div class="cloth-image">
                <img
                    v-if="shoesImageBase64 !== undefined"
                    :src="'data:text/html;base64,' + shoesImageBase64"
                />
                <div v-show="shoesImageBase64 === undefined">衣物已删除</div>
            </div>
        </div>
         <template #right>
    <van-button block type="danger" :style="{height:'100%'}"
    @click="showDeleteDialog"
     text="删除" />
  </template>
</van-swipe-cell>
    </div>
</template>

<script>
import { Dialog, Toast , SwipeCell } from "vant";
import Vue from "vue";
Vue.use(Dialog);
Vue.use(Toast);
Vue.use( SwipeCell )
export default {
    name: "SingleHistory",
    props: ["historyObject"],
    data() {
        return {
            time: null,
            upImageBase64: null,
            downImageBase64: null,
            shoesImageBase64: null,
            deleteDialogTimer: null,
            mousemoveCount:0
        };
    },
    created() {
        this.loadImage();
    },
    methods: {
        async loadImage() {
            this.upImageBase64 = await this.clothesStorageHandle.getClothBase64(
                this.historyObject.clothIDList[0]
            );
            this.downImageBase64 = await this.clothesStorageHandle.getClothBase64(
                this.historyObject.clothIDList[1]
            );
            this.shoesImageBase64 = await this.clothesStorageHandle.getClothBase64(
                this.historyObject.clothIDList[2]
            );
        },
        showDeleteDialog(){
            Dialog.confirm({
                        title: "确定？",
                        message: "确认删除本条记录？",
                        confirmButtonColor: "red",
                        confirmButtonText: "删除",
                    })
                        .then(() => {
                            this.$store.dispatch('deleteHistory',this.historyObject.unixTime);
                        }).then(()=>{
                            Toast.success("已删除");
                        })
                        .catch(() => {});
        },
        async longPressDeleteDialogHandle(eventName) {
            if (eventName === "mousedown")
                this.deleteDialogTimer = setTimeout(() => {
                    this.showDeleteDialog()
                }, 800);
            if (eventName === "mouseup") {
             
                clearTimeout(this.deleteDialogTimer);
            }
            if(eventName==='mousemove'){
                this.mousemoveCount++;
                if(this.mousemoveCount>3){
                     clearTimeout(this.deleteDialogTimer);
                     this.mousemoveCount=0;
                }
            }
        },
    },
    computed: {
        clothesStorageHandle() {
            return this.$store.state.clothesStorageHandle;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./SingleHistory.scss";
</style>
