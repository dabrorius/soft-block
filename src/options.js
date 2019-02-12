import Vue from "vue";
import OptionsScreen from "./components/OptionsScreen.vue";

const root = document.createElement("div");
root.id = "app-root";
document.body.appendChild(root);

new Vue({
  el: "#app-root",
  components: {
    OptionsScreen
  },
  render: function(createElement) {
    return createElement("options-screen");
  }
});
