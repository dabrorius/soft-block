import Vue from "vue";
import Popup from "./components/Popup.vue";

const root = document.createElement("div");
root.id = "app-root";
document.body.appendChild(root);

new Vue({
  el: "#app-root",
  components: {
    Popup
  },
  render: function(createElement) {
    return createElement("popup");
  }
});
