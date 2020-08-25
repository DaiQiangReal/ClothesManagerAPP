<template>
    <div id="app">
        <!-- <van-nav-bar fixed :title="title" right-text="按钮" @click-right="changePlusmenuStatus" /> -->
        <NavBarTop
            :title="title"
            :rightButtonClickHandle="changePlusmenuStatus"
        ></NavBarTop>
        <transition name="fade">
            <PlusMenu
                v-if="plusMenuShow"
                :changeAddClothPopupShow="changeAddClothPopupShow"
                @hidePlusMenu="changePlusmenuStatus"
                :changeAddClothBase64="changeAddClothBase64"
            />
        </transition>
        <div id="content-view">
            <router-view></router-view>
        </div>

        <!-- <van-tabbar v-model="active">
                <van-tabbar-item icon="home-o">今日</van-tabbar-item>
                <van-tabbar-item icon="search">库存</van-tabbar-item>
                <van-tabbar-item icon="friends-o">历史</van-tabbar-item>
                <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
            </van-tabbar> -->
        <NavBarBottom v-model="active" />

        <van-popup
            v-model="addClothPopupShow"
            round
            position="bottom"
            :style="{ height: '85%' }"
        >
            <div id="cloth-props-popup-window">
                <span id="title">设置衣物详情</span>
                <div id="cloth-class" class="cloth-props">
                    <span class="props-title">分类</span>
                    <van-radio-group
                        v-model="newClothProps.clothClass"
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
                        v-model="newClothProps.clothSize"
                        direction="horizontal"
                    >
                        <van-radio name="小">小</van-radio>
                        <van-radio name="中">中</van-radio>
                        <van-radio name="大">大</van-radio>
                    </van-radio-group>
                </div>
                <div id="color" class="cloth-props">
                    <span class="props-title">颜色</span>
                    <input type="color" v-model="newClothProps.color" />
                </div>
                <div id="suit-weather" class="cloth-props">
                    <span class="props-title">适用天气</span>
                    <van-checkbox-group
                        v-model="newClothProps.suitWeather"
                        direction="horizontal"
                    >
                        <van-checkbox shape="square" name="晴天"
                            >晴天</van-checkbox
                        >
                        <van-checkbox shape="square" name="烈日"
                            >烈日</van-checkbox
                        >
                        <van-checkbox shape="square" name="阴天"
                            >阴天</van-checkbox
                        >
                        <van-checkbox shape="square" name="雨天"
                            >雨天</van-checkbox
                        >
                        <van-checkbox shape="square" name="雾天"
                            >雾天</van-checkbox
                        >
                        <van-checkbox shape="square" name="雪天"
                            >雪天</van-checkbox
                        >
                    </van-checkbox-group>
                </div>
                <div id="suit-temp" class="cloth-props">
                    <span class="props-title">适用温度</span>
                    <van-stepper
                        v-model="newClothProps.suitTemp"
                        min="-10"
                        max="40"
                    />
                </div>
                <div id="suit-weather" class="cloth-props">
                    <span class="props-title">适用场合</span>
                    <van-checkbox-group
                        v-model="newClothProps.suitSituation"
                        direction="horizontal"
                    >
                        <van-checkbox shape="square" name="学习"
                            >学习</van-checkbox
                        >
                        <van-checkbox shape="square" name="工作"
                            >工作</van-checkbox
                        >
                        <van-checkbox shape="square" name="会议"
                            >会议</van-checkbox
                        >
                        <van-checkbox shape="square" name="运动"
                            >运动</van-checkbox
                        >
                        <van-checkbox shape="square" name="休闲"
                            >休闲</van-checkbox
                        >
                    </van-checkbox-group>
                </div>
                <div id="last-wash" class="cloth-props">
                    <span class="props-title">上次洗涤距今 (天)</span>
                    <van-stepper
                        v-model="newClothProps.lastWash"
                        min="0"
                        max="1000"
                    />
                </div>
                <van-button
                    block
                    :loading="submitButtonLoading"
                    loading-text="添加中"
                    type="primary"
                    loading-type="spinner"
                    size="large"
                    @click="submitButtonClicked"
                    >添加衣物</van-button
                >
            </div>
        </van-popup>
    </div>
</template>

<script>
import VueRouter from "vue-router";
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
import MainComponent from "./components/MainComponent/MainComponent";
import Storage from "./components/Storage/Storage";
import History from "./components/History/History.vue";
import Settings from "./components/Settings/Settings.vue";
import PlusMenu from "./components/PlusMenu/PlusMenu";
import "./App.scss";
import "vant/lib/index.css";
import { NavBar } from "vant";
import { Stepper } from "vant";
import { DatetimePicker } from "vant";
import { Button, Notify } from "vant";
import { Toast } from "vant";

Vue.use(Toast);
Vue.use(Button);
Vue.use(DatetimePicker);
Vue.use(Stepper);

import { Cloth, ClothesStorageHandle } from "./Utils/clothesStorage";
import { RadioGroup, Radio } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
import NavBarTop from "./components/NavBar/NavBarTop";
import NavBarBottom from "./components/NavBar/NavBarBottom";
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(NavBar);
Vue.use(VueRouter);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Radio);
Vue.use(RadioGroup);
export default {
    name: "App",
    components: {
        MainComponent,
        Storage,
        History,
        Settings,
        NavBar,
        PlusMenu,
        NavBarTop,
        NavBarBottom,
    },
    data() {
        return {
            active: 0,
            plusMenuShow: false,
            addClothPopupShow: false,
            newClothProps: {
                clothClass: null,
                clothSize: null,
                color: "#FFFFFF",
                lastWash: null,
                suitTemp: 26,
                suitWeather: [],
                suitSituation: [],
                imageBase64: null,
            },
            submitButtonLoading: false,
        };
    },
    created() {},
    methods: {
        changePlusmenuStatus(event) {
            this.plusMenuShow = !this.plusMenuShow;
        },
        changeAddClothPopupShow() {
            this.addClothPopupShow = !this.addClothPopupShow;
        },
        changeAddClothBase64(base64) {
            this.newClothProps.imageBase64 = base64;
        },
        async submitButtonClicked() {
            let allDone = true;
            for (let index in this.newClothProps) {
                let prop = this.newClothProps[index];
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
            let newClothObject = new Cloth(
                this.newClothProps.clothClass,
                this.newClothProps.clothSize,
                this.newClothProps.color,
                new Date().getTime() -
                    this.newClothProps.lastWash * (24 * 60 * 60 * 1000),
                this.newClothProps.suitTemp,
                this.newClothProps.suitWeather,
                this.newClothProps.suitSituation,
                this.newClothProps.imageBase64
            );
            let timer = setTimeout(() => {
                Toast.fail("读写数据超时");
                this.submitButtonLoading = false;
                this.addClothPopupShow = false;
                this.newClothProps = {
                    clothClass: null,
                    clothSize: null,
                    color: null,
                    lastWash: null,
                    suitTemp: 26,
                    suitWeather: [],
                    suitSituation: [],
                    imageBase64: null,
                };
            }, 8000);

            await this.clothesStorageHandle.addCloth(newClothObject);
            clearTimeout(timer);
            Toast.success("添加成功");
            this.submitButtonLoading = false;
            this.addClothPopupShow = false;
            this.newClothProps = {
                clothClass: null,
                clothSize: null,
                color: "#FFFFFF",
                lastWash: null,
                suitTemp: 26,
                suitWeather: [],
                suitSituation: [],
                imageBase64: null,
            };

            await this.$store.dispatch("flashClothStorage");

            setTimeout(
                () =>
                    console.log("fucker2", this.$store.state.clothesObjectList),
                10000
            );
        },
    },
    computed: {
        title() {
            switch (this.active) {
                case 0:
                    return "今日";
                case 1:
                    return "库存";
                case 2:
                    return "历史";
                case 3:
                    return "设置";
                default:
                    return "error";
            }
        },
        clothesStorageHandle() {
            return this.$store.state.clothesStorageHandle;
        },
    },
    watch: {
        active(newVal, oldVal) {
            switch (newVal) {
                case 0:
                    this.$router.push("/Main");
                    break;
                case 1:
                    this.$router.push("/Storage");
                    break;
                case 2:
                    this.$router.push("/History");
                    break;
                case 3:
                    this.$router.push("/Settings");
                    break;
            }
        },
    },
};
</script>

<style lang="scss"></style>
