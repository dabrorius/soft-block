<template>
  <div class="central-column">
    <quote-section></quote-section>
    <slow-button @unlocked="override"></slow-button>
    <img src="meditate.svg" class="central-image">
  </div>
</template>

<script>
import QuoteSection from "./QuoteSection.vue";
import SlowButton from "./SlowButton.vue";

const overrideDuration = 1000 * 60 * 10; // 10 minutes

export default {
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
};
</script>

<style scoped>
.central-column {
  height: 100vh;
  width: 40vw;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.central-image {
  height: 22rem;
}
</style>

<style>
body {
  background-color: #f0f0f0;
  padding: 0;
  margin: 0;
  font-family: OpenSans, Helvetica, sans-serif !important;
  color: #333;
}

h1 {
  margin: 0;
  text-align: center;
  padding: 2em;
}
</style>
