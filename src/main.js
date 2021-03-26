import Vue from "vue";
import App from "./App.vue";
// import vue-panzoom
import panZoom from 'vue-panzoom';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faTags } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faTags)

// Vue.component('font-awesome-icon', FontAwesomeIcon)

// install plugin
Vue.use(panZoom);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
