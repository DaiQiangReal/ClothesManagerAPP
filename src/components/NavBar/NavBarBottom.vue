<!--
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-25 20:34:39
 * @LastEditors: 代强
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/NavBar/NavBarBottom.vue
-->
<template>
    <div id="nav-bar-bottom">
        <div id="today" class="nav-item" @click="()=>navItemClicked(0)">
            <div id="icon">
                <van-icon name="home-o" size="3vh" :color="value===0?'#1989fa':'#000000'" />
            </div>
            <span :style="{color:value===0?'#1989fa':'#000000'}">今日</span>
        </div>
        <div id="storage" class="nav-item" @click="()=>navItemClicked(1)">
            <div id="icon">
                <van-icon name="search" size="3vh" :color="value===1?'#1989fa':'#000000'" />
            </div>
            <span :style="{color:value===1?'#1989fa':'#000000'}">库存</span>
        </div>
        <div id="history" class="nav-item" @click="()=>navItemClicked(2)">
            <div id="icon">
                <van-icon name="friends-o" size="3vh" :color="value===2?'#1989fa':'#000000'" />
            </div>
            <span :style="{color:value===2?'#1989fa':'#000000'}">历史</span>
        </div>
        <div id="setting" class="nav-item" @click="()=>navItemClicked(3)">
            <div id="icon">
                <van-icon name="setting-o" size="3vh" :color="value===3?'#1989fa':'#000000'" />
            </div>
            <span :style="{color:value===3?'#1989fa':'#000000'}">设置</span>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
export default {
    name: "NavBarBottom",
    model: {
        prop: "value",
        event: "input",
    },
    props: ["value"],
    data() {
        return {};
    },
    methods: {
        navItemClicked(index) {
            this.$emit("input", index);
        },
    },
};
</script>

<style lang="scss" scoped>
#nav-bar-bottom {
    z-index: 99999;
    position: fixed;
    bottom: 0;
    height: 7vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 10px 1px rgb(207, 207, 207);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    backdrop-filter: blur(35px);
    .nav-item {
        display: flex;
        flex-direction: column;
        span {
            font-size: 0.7rem;
        }
    }
}
</style>