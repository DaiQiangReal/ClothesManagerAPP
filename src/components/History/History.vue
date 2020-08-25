<!--
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-25 20:10:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/components/History/History.vue
-->
<template>
    <div id="history">
        <SingleHistory
            v-for="historyObject in historyObjectList"
            :key="historyObject.unixTime"
            :historyObject="historyObject"
        />
    </div>
</template>

<script>
import "./css/History.scss";
import SingleHistory from "./SingleHistory/SingleHistory";
export default {
    name: "History",
    components: { SingleHistory },
    data() {
        return {
            historyObjectList: [],
        };
    },
    created() {
        this.loadHistoryObjectList();
    },
    methods: {
        async loadHistoryObjectList() {
            if (!this.history) await this.$store.dispatch("loadHistory");
            let historyObjectCollection = this.history;
            console.log("testtttttt", this.history);
            let historyObjectList = [];
            for (let key in historyObjectCollection) {
                historyObjectList.push(historyObjectCollection[key]);
            }
            historyObjectList.sort((history0, history1) => {
                return history1.unixTime - history0.unixTime;
            });
            this.historyObjectList = historyObjectList;
        },
    },
    computed: {
        historyHandle() {
            return this.$store.state.historyHandle;
        },
        history() {
            return this.$store.state.history;
        },
    },
    watch: {
        history() {
            this.loadHistoryObjectList();
        },
    },
};
</script>

<style></style>
