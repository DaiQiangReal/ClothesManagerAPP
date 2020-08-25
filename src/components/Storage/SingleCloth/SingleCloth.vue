<!--
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-25 12:52:38
 * @LastEditors: 代强
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/Storage/SingleCloth/SingleCloth.vue
-->
<template>
  <div
    id="single-cloth"
    :style="{
      backgroundColor:
        'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + 0.2 + ')',
    }"
    @click="() => showClothDetail?showClothDetail(clothObject):()=>{}"
  >
    <img
      v-show="imageShow"
      id="cloth-image"
      :style="{ boxShadow: '0 0 5px 0.1px ' + clothObject.color }"
      :src="'data:text/html;base64,' + this.imageBase64"
      alt="IMG"
    />

    <div id="cloth-props">
      <div id="ccloth-class" class="prop">
        <span id="name">分类:</span>
        <span id="prop" v-text="clothObject.clothClass"></span>
      </div>
      <div id="cloth-size" class="prop">
        <span id="name">尺寸:</span>
        <span id="prop" v-text="clothObject.clothSize"></span>
      </div>
      <div id="color" class="prop">
        <span id="name">颜色:</span>
        <div id="color-block" :style="{ backgroundColor: clothObject.color }" />
      </div>
      <!-- <div id="suit-weather"  class="prop">
                <span id="name">适用天气:</span>
                <span id="prop" v-text="clothObject.suitWeather"></span>
            </div> -->
      <div id="suit-temp" class="prop">
        <span id="name">适用温度:</span>
        <span id="prop" v-text="clothObject.suitTemp + ' ℃'"></span>
      </div>
      <!-- <div id="suit-situation"  class="prop">
                <span id="name">适用场合:</span>
                <span id="prop" v-text="clothObject.suitSituation"></span>
            </div> -->
      <div id="lastwash" class="prop">
        <span id="name">上次洗涤距今:</span>
        <span
          id="prop"
          v-text="
            Math.floor(
              (new Date().getTime() - clothObject.lastWash) /
                (24 * 60 * 60 * 1000)
            ) + ' 天'
          "
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { Cloth, ClothesStorageHandle } from "../../../Utils/clothesStorage";
import "./SingleCloth.scss";
import { color16toRGB } from "../../../Utils/tools";
export default {
  name: "SingleCloth",
  props: ["clothObject", "showClothDetail"],
  data() {
    return {
      imageBase64: null,
      imageShow: false,
    };
  },
  created() {
      this.getClothImage()
  },
  methods: {
    getClothImage() {
      this.$store.state.clothesStorageHandle
        .getClothBase64(this.clothObject.clothID)
        .then((base64) => {
          this.imageBase64 = base64;
          this.imageShow = true;
        });
    },
  },
  computed: {
    rgba() {
      let color = color16toRGB(this.clothObject.color);
      return color;
    },
  },
  watch: {
    clothObject() {
        this.getClothImage()
    },
  },
};
</script>

<style></style>
