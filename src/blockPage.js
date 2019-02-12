import Vue from "vue/dist/vue.js";
import "./blockPage.css";
import quote from "./components/quote.vue";
const unlockDuration = 1000 * 10; // 10 seconds
const overrideDuration = 1000 * 60 * 10; // 10 minutes

// Count from 0 to 100%
const countTo = 100;
const countStepDelay = unlockDuration / countTo;

new Vue({
  el: "#app",
  data: { counter: 0, timer: null },
  computed: {
    buttonStyleObject: function() {
      return {
        background: `linear-gradient(to top, #3C6F9466 ${this.counter}%, ${
          this.counter
        }%, #f0f0f0)`
      };
    },
    unlocking: function() {
      return this.counter > 0;
    }
  },
  methods: {
    override: function() {
      const override = new Date(Date.now() + overrideDuration);
      chrome.storage.sync.set({ override });
      window.history.back();
    },
    startCountdown: function() {
      this.count();
    },
    stopCountdown: function() {
      clearTimeout(this.timer);
      this.counter = 0;
    },
    count: function() {
      this.timer = window.setTimeout(() => {
        this.counter += 1;
        if (this.counter >= countTo) {
          this.override();
        } else {
          this.count();
        }
      }, countStepDelay);
    }
  },
  components: {
    quote
  }
});
