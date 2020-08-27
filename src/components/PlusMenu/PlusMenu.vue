<!--
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-27 22:29:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/PlusMenu/PlusMenu.vue
-->
<template>
    <div id="plus-menu">
        <div class="submenu" @click="(e) => submenuClicked(0)">拍照</div>
        <!-- <div class="submenu" @click="(e)=>submenuClicked(1)">拍照</div>
    <div class="submenu" @click="(e)=>submenuClicked(2)">拍照</div>
    <div class="submenu" @click="(e)=>submenuClicked(3)">拍照</div> -->
    </div>
</template>

<script>
import takePhoto from "../../Utils/takePhoto";
import { Cloth, ClothesStorageHandle } from "../../Utils/clothesStorage";
import { Popup ,Toast} from "vant";
import Vue from "vue";
Vue.use(Popup);
Vue.use(Toast)

export default {
    name: "PlusMenu",
    props: ["changeAddClothPopupShow", "changeAddClothBase64"],
    data() {
        return {};
    },
    mounted() {
        document.addEventListener("mousedown", this.hidePlusMenu);
    },
    beforeDestroy() {
        document.removeEventListener("mousedown", this.hidePlusMenu);
    },
    methods: {
        submenuClicked(id) {
            switch (id) {
                case 0:
                    this.takePhoto();
            }
            this.hidePlusMenu();
        },
        async takePhoto() {
            let base64 = await takePhoto();
            if (base64) {
                this.changeAddClothPopupShow();
                this.changeAddClothBase64(base64);
            }else{
                let toast=Toast.fail("取消拍照");
                setTimeout(()=>toast.clear(),800);
            }
        },
        hidePlusMenu(e) {
            this.$emit("hidePlusMenu", e);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./PlusMenu.scss";
</style>
