<template>
  <section>
    <span class="overriding" v-if="currentlyOverriding">Override ends {{ lastOverrideFromNow }}!</span>
    <span v-else>Last override was {{ lastOverrideFromNow }}.</span>
  </section>
</template>

<script>
import * as moment from "moment";

export default {
  props: {
    override: [String, Boolean]
  },
  computed: {
    currentlyOverriding: function() {
      return this.override && new Date(this.override) > new Date();
    },
    lastOverrideFromNow: function() {
      return this.override ? moment(this.override).fromNow() : "never";
    }
  }
};
</script>

<style scoped>
section {
  font-size: 0.8rem;
  color: #555;
  text-align: center;
  padding: 1rem 0.5rem;
}

.overriding {
  font-weight: bold;
  color: #111;
}
</style>
