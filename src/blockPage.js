import Vue from "vue/dist/vue.js";
import "./blockPage.css";

import QuoteSection from "./components/QuoteSection.vue";
import SlowButton from "./components/SlowButton.vue";

const overrideDuration = 1000 * 60 * 10; // 10 minutes

new Vue({
  el: "#app",
  methods: {
    override: function() {
      const override = new Date(Date.now() + overrideDuration);
      chrome.storage.sync.set({ override });
      window.history.back();
    }
  },
  components: {
    QuoteSection,
    SlowButton
  }
});
