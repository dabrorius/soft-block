<template>
  <a v-if="currentUrl" @click="toggleBlock" v-bind:class="buttonClass">
    <span v-if="isBlocked">Remove soft block</span>
    <span v-else>Soft block this domain</span>
  </a>
</template>

<script>
export default {
  props: {
    isBlocked: Boolean,
    currentUrl: String
  },
  computed: {
    buttonClass: function() {
      return this.isBlocked ? "blocked" : "unblocked";
    }
  },
  methods: {
    toggleBlock: function() {
      this.$emit("toggle");
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
  color: #ffffffdd;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  display: block;
  text-align: center;
  padding: 1rem 0;
}

.blocked {
  background-color: #83af9b;
}

.unblocked {
  background-color: #e3727c;
}
</style>
