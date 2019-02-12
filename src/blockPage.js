import Vue from "vue";
import BlockPage from "./components/BlockPage.vue";

const root = document.createElement("div");
root.id = "app-root";
document.body.appendChild(root);

new Vue({
  el: "#app-root",
  components: {
    BlockPage
  },
  render: function(createElement) {
    return createElement("block-page");
  }
});
