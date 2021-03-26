<template>
<!-- to display the EDITDA node -->
  <table v-if="treeData.name">
    <tr>
      <td
        :colspan="
          Array.isArray(treeData.children) ? treeData.children.length * 2 : 1
        "
        :class="{
          parentLevel:
            Array.isArray(treeData.children) && treeData.children.length,
          extend:
            Array.isArray(treeData.children) &&
            treeData.children.length &&
            treeData.extend,
        }"
      >
       
        <div :class="{ node: true, hasMate: treeData.mate }">
          <!-- to display the tree contents -->
          <div
            class="person"
            :class="Array.isArray(treeData.class) ? treeData.class : []"
            @click="$emit('click-node', treeData)"
          >
            <div class="name">{{ treeData.name }}</div>
            <div class="flex-container">
              <p class="flex-child" :style="{ color: treeData.value.color }">
                {{ treeData.value.amount }}
              </p>
              <div class="flex-child">
                <p class="">
                  <span
                    :style="{ color: treeData.delta.color }"
                    v-html="treeData.delta.symbol"
                  ></span>
                  {{ treeData.delta.amount }}
                </p>
              </div>
            </div>
            <!-- to display tree contents -->

          </div>
          <template v-if="Array.isArray(treeData.mate) && treeData.mate.length">
            <div
              class="person"
              v-for="(mate, mateIndex) in treeData.mate"
              :key="treeData.name + mateIndex"
              :class="Array.isArray(mate.class) ? mate.class : []"
              @click="$emit('click-node', mate)"
            >
              <div class="name">{{ mate.name }}</div>
            </div>
          </template>
        </div>

        <!-- to toggle a button to show and hide the children -->
        <div
          class="extend_handle"
          v-if="Array.isArray(treeData.children) && treeData.children.length"
          @click="toggleExtend(treeData)"
        ></div>
      </td>
    </tr>
    <tr
      v-if="
        Array.isArray(treeData.children) &&
          treeData.children.length &&
          treeData.extend
      "
    >
      <td
        v-for="(children, index) in treeData.children"
        :key="index"
        colspan="2"
        class="childLevel"
      >

          <!-- to traverse the given tree -->
        <TreeChart :json="children" @click-node="$emit('click-node', $event)" />
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "TreeChart",
  props: ["json"],
  data() {
    return {
      treeData: {},
    };
  },
  watch: {
    // a function to check whether a node has children and if it has it adds all properties to treeData object
    json: {
      handler(Props) {
        let extendKey = function(jsonData) {
          jsonData.extend =
            jsonData.extend === void 0 ? true : !!jsonData.extend;
          if (Array.isArray(jsonData.children)) {
            console.log(jsonData.children);
            jsonData.children.forEach((c) => {
              extendKey(c);
            });
          }
          return jsonData;
        };
        if (Props) {
          this.treeData = extendKey(Props);
        }
      },
      immediate: true,
    },
  },
  methods: {
    //method to toggle a button to show and hide the children
    toggleExtend(treeData) {
      treeData.extend = !treeData.extend;
      this.$forceUpdate();
      console.log(Array.isArray(treeData.children) ? treeData.children.length * 2 : 1);
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 0px auto;
}
td {
  position: relative;
  vertical-align: top;
  padding: 0 0 50px 0;
  text-align: center;
}


.extend_handle {
  position: absolute;
  left: 50%;
  bottom: 30px;
  width: 10px;
  height: 10px;
  padding: 10px;
  transform: translate3d(-15px, 0, 0);
  -ms-transform: translate3d(-15px, 0, 0);
  -webkit-transform: translate3d(-15px, 0, 0);
  -moz-transform: translate3d(-15px, 0, 0);
  -o-transform: translate3d(-15px, 0, 0);
  cursor: pointer;
}

/* styling an arrow symbol */
.extend_handle:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px solid;
  border-color: #ccc #ccc transparent transparent;
  transform: rotateZ(135deg);
  -webkit-transform: rotateZ(135deg);
  transform-origin: 50% 50% 0;
  transition: transform ease 300ms;
  -webkit-transform: transform ease 300ms;
}
.extend_handle:hover:before {
  border-color: #ccc #ccc transparent transparent;

}
.extend .extend_handle:before {
  transform: rotateZ(-45deg);
  -webkit-transform: rotateZ(-45deg);
}

.extend::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 15px;
  height: 15px;
  border-left: 2px solid #ccc;
  transform: translate3d(-1px, 0, 0);
  -ms-transform: translate3d(-1px, 0, 0);
  -webkit-transform: translate3d(-1px, 0, 0);
  -moz-transform: translate3d(-1px, 0, 0);
}
.childLevel::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 100%;
  height: 15px;
  border-left: 2px solid #ccc;
  transform: translate3d(-1px, 0, 0);
  -ms-transform: translate3d(-1px, 0, 0);
  -webkit-transform: translate3d(-1px, 0, 0);
  -moz-transform: translate3d(-1px, 0, 0);
}
.childLevel::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -15px;
  border-top: 2px solid #ccc;
}
.childLevel:first-child:before,
.childLevel:last-child:before {
  display: none;
}
.childLevel:first-child:after {
  left: 50%;
  height: 15px;
  border: 2px solid;
  border-color: #ccc transparent transparent #ccc;
  border-radius: 6px 0 0 0;
  transform: translate3d(1px, 0, 0);
  -ms-transform: translate3d(1px, 0, 0);
  -webkit-transform: translate3d(1px, 0, 0);
  -moz-transform: translate3d(1px, 0, 0);
}
.childLevel:last-child:after {
  right: 50%;
  height: 15px;
  border: 2px solid;
  border-color: #ccc #ccc transparent transparent;
  border-radius: 0 6px 0 0;
  transform: translate3d(-1px, 0, 0);
  -ms-transform: translate3d(-1px, 0, 0);
  -webkit-transform: translate3d(-1px, 0, 0);
  -moz-transform: translate3d(-1px, 0, 0);
}
.childLevel:first-child.childLevel:last-child::after {
  left: auto;
  border-radius: 0;
  border-color: transparent #ccc transparent transparent;
  transform: translate3d(1px, 0, 0);
  -ms-transform: translate3d(1px, 0, 0);
  -webkit-transform: translate3d(1px, 0, 0);
  -moz-transform: translate3d(1px, 0, 0);
}

.node {
  position: relative;
  display: inline-block;
  margin: 0 1em;
  box-sizing: border-box;
  text-align: center;
}
.node .person {
  position: relative;
  display: inline-block;
  z-index: 2;
  width: 169px;
  overflow: hidden;
  background-color: white;
  padding: 5px;
  color: black;
  font-weight: bold;
}
.node .person .name {
  height: 2em;
  line-height: 2em;
  overflow: hidden;
  width: 100%;
}
.node.hasMate::after {
  content: "";
  position: absolute;
  left: 2em;
  right: 2em;
  top: 2em;
  border-top: 2px solid #ccc;
  z-index: 1;
}
.flex-container,
.deltaProperty {
  display: flex;
}
.flex-child {
  flex: 1;
  justify-content: space-between;
}
</style>
