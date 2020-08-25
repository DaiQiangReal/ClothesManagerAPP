<template>
    <div id="storage">
        <div v-for="clothObject in this.clothObjectList" :key="clothObject.clothID">
            <SingleCloth :clothObject="clothObject" :showClothDetail="showClothDetail" />
        </div>

        <div id="detail-popup">
            <van-popup
                v-model="detailPopupShow"
                round
                closeable
                position="center"
                :style="{ height: '90vh',width:'90vw'}"
            >
                <div id="cloth-props-popup-window">
                    <span id="title">衣物详情</span>
                    <div id="cloth-class" class="cloth-props">
                        <span class="props-title">分类</span>
                        <van-radio-group
                            v-model="clickClothProps.clothClass"
                            :disabled="notEditable"
                            direction="horizontal"
                        >
                            <van-radio name="上装">上装</van-radio>
                            <van-radio name="下装">下装</van-radio>
                            <van-radio name="鞋子">鞋子</van-radio>
                        </van-radio-group>
                    </div>
                    <div id="cloth-size" class="cloth-props">
                        <span class="props-title">尺寸</span>
                        <van-radio-group
                            v-model="clickClothProps.clothSize"
                            :disabled="notEditable"
                            direction="horizontal"
                        >
                            <van-radio name="小">小</van-radio>
                            <van-radio name="中">中</van-radio>
                            <van-radio name="大">大</van-radio>
                        </van-radio-group>
                    </div>
                    <div id="color" class="cloth-props">
                        <span class="props-title">颜色</span>
                        <input type="color" v-model="clickClothProps.color" :disabled="notEditable" />
                    </div>
                    <div id="suit-weather" class="cloth-props">
                        <span class="props-title">适用天气</span>
                        <van-checkbox-group
                            v-model="clickClothProps.suitWeather"
                            direction="horizontal"
                            :disabled="notEditable"
                        >
                            <van-checkbox shape="square" name="晴天">晴天</van-checkbox>
                            <van-checkbox shape="square" name="烈日">烈日</van-checkbox>
                            <van-checkbox shape="square" name="阴天">阴天</van-checkbox>
                            <van-checkbox shape="square" name="雨天">雨天</van-checkbox>
                            <van-checkbox shape="square" name="雾天">雾天</van-checkbox>
                            <van-checkbox shape="square" name="雪天">雪天</van-checkbox>
                        </van-checkbox-group>
                    </div>
                    <div id="suit-temp" class="cloth-props">
                        <span class="props-title">适用温度</span>
                        <van-stepper
                            v-model="clickClothProps.suitTemp"
                            :disabled="notEditable"
                            min="-10"
                            max="40"
                        />
                    </div>
                    <div id="suit-weather" class="cloth-props">
                        <span class="props-title">适用场合</span>
                        <van-checkbox-group
                            v-model="clickClothProps.suitSituation"
                            direction="horizontal"
                            :disabled="notEditable"
                        >
                            <van-checkbox shape="square" name="学习">学习</van-checkbox>
                            <van-checkbox shape="square" name="工作">工作</van-checkbox>
                            <van-checkbox shape="square" name="会议">会议</van-checkbox>
                            <van-checkbox shape="square" name="运动">运动</van-checkbox>
                            <van-checkbox shape="square" name="休闲">休闲</van-checkbox>
                        </van-checkbox-group>
                    </div>
                    <div id="last-wash" class="cloth-props">
                        <span class="props-title">上次洗涤距今 (天)</span>
                        <van-stepper
                            v-model="clickClothProps.lastWash"
                            :disabled="notEditable"
                            min="0"
                            max="1000"
                        />
                    </div>
                    <van-button
                        block
                        class="modify-button"
                        @click="detailButtonClicked"
                        :loading="buttonLoading"
                        loading-text="修改中"
                        loading-type="spinner"
                        :type="notEditable?'info':'primary'"
                        size="large"
                        round
                    >{{notEditable?'修改属性':'保存修改'}}</van-button>
                    <van-button type="danger"
                    class="delete-button"
                    block
                    size="large"
                    round
                    @click="onDeleteButtonClicked"
                    >删除</van-button>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
import "./css/Storage.scss";
import SingleCloth from "./SingleCloth/SingleCloth";
import { Cloth, ClothesStorageHandle } from "../../Utils/clothesStorage";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
    name: "Storage",
    components: { SingleCloth },
    data() {
        return {
            clickClothProps: {
                clothClass: null,
                clothSize: null,
                color: "#FFFFFF",
                lastWash: null,
                suitTemp: 26,
                suitWeather: [],
                suitSituation: [],
                imageBase64: null,
            },
            oldClothProps:null,
            detailPopupShow: false,
            notEditable: true,
            buttonLoading: false,
        };
    },
    created() {
        this.$store.dispatch("loadClothStorage").then(() => {
            this.clothesObjectList = this.$store.state.clothesObjectList;
        });
    },
    methods: {
        showClothDetail(clothObject) {
            let clothProps = JSON.parse(JSON.stringify(clothObject));
            clothProps.lastWash = Math.floor(
                (new Date().getTime() - clothProps.lastWash) /
                    (24 * 60 * 60 * 1000)
            );
            this.clickClothProps = clothProps;
            this.detailPopupShow = true;
        },
        async detailButtonClicked() {
            if (!this.notEditable) {
                if(JSON.stringify(this.oldClothProps)===JSON.stringify(this.clickClothProps)){
                    this.notEditable=true;
                    return;
                }
                this.buttonLoading = true;
                let allDone = true;
                for (let index in this.clickClothProps) {
                    let prop = this.clickClothProps[index];
                    if (prop instanceof Array) {
                        if (prop.length === 0) {
                            allDone = false;
                            break;
                        }
                    } else {
                        if (prop === null) {
                            allDone = false;
                            break;
                        }
                    }
                }
                if (!allDone) {
                    let toast = Toast.fail("请完整填写衣物详情");
                    setTimeout(() => toast.clear(), 800);
                    return;
                }
                this.submitButtonLoading = true;
                let clickClothObject = new Cloth(
                    this.clickClothProps.clothClass,
                    this.clickClothProps.clothSize,
                    this.clickClothProps.color,
                    new Date().getTime() -
                        this.clickClothProps.lastWash * (24 * 60 * 60 * 1000),
                    this.clickClothProps.suitTemp,
                    this.clickClothProps.suitWeather,
                    this.clickClothProps.suitSituation,
                    await this.clothesStorageHandle.getClothBase64(this.clickClothProps.clothID),
                    this.clickClothProps.clothID
                );
                let timer = setTimeout(() => {
                    Toast.fail("读写数据超时");
                    this.notEditable = true;
                    this.buttonLoading = false;
                }, 8000);
                await this.clothesStorageHandle.addCloth(clickClothObject);
                clearTimeout(timer);
                Toast.success("修改成功");
                this.buttonLoading = false;
                this.$store.dispatch("flashClothStorage");
                this.notEditable = true;
            } else {
                this.notEditable = false;
                this.oldClothProps=JSON.parse(JSON.stringify(this.clickClothProps))
            }
        },
        async onDeleteButtonClicked(){
            await this.$store.dispatch('deleteCloth',this.clickClothProps.clothID);
            this.detailPopupShow=false;
            let toast=Toast.success("已删除");
            setTimeout(()=>toast.clear(),800);
        }
    },
    computed: {
        clothObjectList() {
            return this.$store.state.clothesObjectList;
        },
        clothesStorageHandle(){
            return this.$store.state.clothesStorageHandle;
        }
    },
    watch: {
        clothObjectList(newVal) {
            console.log('storage flashed',newVal);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./css/Storage.scss";
</style>