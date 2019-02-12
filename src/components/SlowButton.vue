<template>
  <a
    v-bind:style="buttonStyleObject"
    @mousedown="startCountdown"
    @mouseup="stopCountdown"
    @mouseout="stopCountdown"
  >
    <span v-if="unlocking">{{ counter }}%</span>
    <span v-else>Hold to unlock</span>
  </a>
</template>

<script>
const unlockDuration = 1000 * 10; // 10 seconds
const numberOfSteps = 100;
const countStepDelay = unlockDuration / numberOfSteps;

export default {
  data: function() {
    return { counter: 0, timeoutInstance: null };
  },
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
    startCountdown: function() {
      this.count();
    },
    stopCountdown: function() {
      clearTimeout(this.timeoutInstance);
      this.counter = 0;
    },
    count: function() {
      this.timeoutInstance = window.setTimeout(() => {
        this.counter += 1;
        if (this.counter >= numberOfSteps) {
          this.$emit("unlocked");
        } else {
          this.count();
        }
      }, countStepDelay);
    }
  }
};
</script>

<style scoped>
a,
a:link,
a:visited,
a:focus,
a:hover,
a:active {
  color: #999;
  font-size: 0.7rem;
  text-decoration: none;
  cursor: pointer;
  width: 7rem;
  height: 7rem;
  display: block;
  border-radius: 50%;
  border: 4px solid #ccc;
  text-align: center;
  line-height: 7rem;
  margin: 2rem 0;
}

a span {
  pointer-events: none;
  user-select: none;
  -moz-user-select: none;
}
</style>
