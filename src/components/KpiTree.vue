<template>
  <div>
    <h1>{{ msg }}</h1>
    <!-- buttons to zoom in and zoom out -->
    <div class="zoomBtns">
      <button @click="zoom('-')">-</button>
      <button @click="zoom('default')"><i class="fas fa-sync"></i></button>
      <button @click="zoom('+')">+</button>
    </div>
    <div class="treeWrapper zoomingElememt" :style="{ transform: `scale(${zoomScale})` }">
      <TreeChart :json="tree" @click-node="clickNode" />
    </div>
  </div>
</template>

<script>
import TreeChart from "./TreeChart.vue";

export default {
  components: {
    TreeChart,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      zoomScale: 1,
      tree: {
        name: "EDITDA",
        value: { amount: "123", color: "green" },
        delta: { symbol: '<i class="fas fa-caret-up"></i>', amount: "12%", color: "green" },
        children: [
          {
            name: "Customer Profitability",
            value: { amount: "123", color: "green" },
            delta: { symbol: '<i class="fas fa-caret-down"></i>', amount: "12%", color: "red" },
            children: [
              {
                name: "MRR",
                value: { amount: "123", color: "orange" },
                delta: { symbol: '<i class="fas fa-caret-up"></i>', amount: "12%", color: "green" },
                children: [
                  {
                    name: "ACV",
                    value: { amount: "123", color: "orange" },
                    delta: { symbol: '<i class="fas fa-caret-up"></i>', amount: "12%", color: "red" },
                  },
                ],
              },
              {
                name: "Total CAC",
                value: { amount: "123", color: "green" },
                delta: { symbol: '<i class="fas fa-caret-up"></i>', amount: "12%", color: "green" },
                children: [
                  {
                    name: "Customer Success",
                    value: { amount: "123", color: "red" },
                    delta: { symbol: '<i class="fas fa-caret-up"></i>', amount: "12%", color: "green" },
                  },
                  {
                    name: "Sales & Marketing",
                    value: { amount: "123", color: "green" },
                    delta: { symbol: '<i class="fas fa-caret-up"></i>', amount: "12%", color: "green" },
                  },
                ],
              },
            ],
          },
          {
            name: "NON-CAC related",
            value: { amount: "123", color: "green" },
            delta: { symbol: '<i class="fas fa-caret-right"></i>', amount: "12%", color: "orange" },
            children: [
              {
                name: "R&D (excl. Support)",
                value: { amount: "123", color: "green" },
                delta: { symbol: '<i class="fas fa-caret-up"></i>', amount: "12%", color: "green" },
              },
              {
                name: "G&A",
                value: { amount: "123", color: "green" },
                delta: { symbol: '<i class="fas fa-caret-up"></i>', amount: "12%", color: "green" },
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    clickNode(node) {
      console.log(node);
    },
    zoom(action) {
      if (action == '-') this.zoomScale -= 0.2;
      else if (action == '+') this.zoomScale = 1.2;
      else this.zoomScale = 1;
    }
  },
};
</script>

<style scoped>
.zoomBtns {
  margin: 0px;
  text-align: center;
}
.zoomBtns button {
  color: #3636fe;
  font-size: 20px;
  font-size: 16px;
}
.zoomingElememt {
  transition: 0.5s ease-in-out;
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
}
.treeWrapper{
  margin-top: 90px;
}
</style>
