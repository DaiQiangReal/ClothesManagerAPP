<!--
 * @Author: your name
 * @Date: 2020-08-16 00:31:34
 * @LastEditTime: 2020-08-28 17:20:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/MainComponent/ClothChoser/ClothChoser.vue
-->
<template>
    <div>
        <SingleCloth
            v-if="clothObjectList.length > 0"
            :clothObject="clothObjectList[chosedIndex]"
            @click.native="onChoserClicked"
            @click.stop
        />

        <van-overlay
            :show="modalShow"
            @click="modalShow = false"
            :lock-scroll="false"
            :z-index="9999"
            :duration="0.5"
        >
            <div class="cloth-list">
                <SingleCloth
                    v-for="(clothObject, i) in clothObjectList"
                    :key="clothObject.clothID"
                    :clothObject="clothObject"
                    @click.native="() => onChoserClicked(i)"
                    @click.stop
                />
            </div>
        </van-overlay>
    </div>
</template>

<script>
import SingleCloth from "../../Storage/SingleCloth/SingleCloth";
import { getRamdomInt, getRandomInt } from "../../../Utils/tools";
import Vue from "vue";
import { Overlay, Toast, Popup } from "vant";
Vue.use(Toast);
Vue.use(Overlay);
Vue.use(Popup);
export default {
    name: "ClothChoser",
    props: ["clothClass", "onUserChoseCloth"],
    components: { SingleCloth },
    data() {
        return {
            chosedIndex: 0,
            modalShow: false,
        };
    },
    mounted() {
        if (this.clothObjectList.length === 0)
            this.$store.dispatch("loadClothStorage").then(()=>{
                this.onUserChoseCloth(this.clothClass, this.clothObjectList[0]);
            });
        
        
    },
    updated(){
    },
    methods: {
        onChoserClicked(clothIndex) {
            if (this.modalShow) {
                this.chosedIndex = clothIndex;
                this.onUserChoseCloth(
                    this.clothClass,
                    this.clothObjectList[clothIndex]
                );
                this.modalShow=false;
                let toast=Toast.success("已选择"+this.clothClass);
                setTimeout(()=>toast.clear(),1000)
            } else {
                new Promise((resolve, reject) => {
                    let toast = Toast.loading({
                        message: "计算推荐列表",
                        forbidClick: true,
                    });
                    setTimeout(() => {
                        toast.clear();
                        resolve();
                    }, getRandomInt(200, 500));
                }).then(() => {
                    this.modalShow = true;
                });
            }
        },
    },
    computed: {
        clothObjectList() {
            return this.$store.state.clothesObjectList.filter((clothObject) => {
                return clothObject.clothClass === this.clothClass;
            });
        },
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
@import "./ClothChoser.scss";
</style>
