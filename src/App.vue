<template>
    <KpiTree msg="KPI Tree" />
</template>

<script>
import KpiTree from "./components/KpiTree.vue";

export default {
  name: "App",
  components: {
    KpiTree,
  },
};
</script>

<style>

body {
  background-color: #000000eb;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}
h1{
  text-align: center;
  color:#3636fe;
}
</style>
