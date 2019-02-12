<template>
  <section>
    <div>
      <div class="header">
        <img src="logo.svg">
        <div v-if="currentUrl" class="url">{{ currentUrl }}</div>
        <div v-else>Soft Block</div>
      </div>
    </div>
    <block-button
      v-bind:is-blocked="isBlocked"
      v-bind:current-url="currentUrl"
      @toggle="toggleUrlBlocking"
    ></block-button>
    <override-info v-bind:override="override"></override-info>
  </section>
</template>

<script>
import { getCurrentURL } from "../helpers/getCurrentURL";
import { stemURL } from "../helpers/stemURL";

import BlockButton from "./BlockButton.vue";
import OverrideInfo from "./OverrideInfo.vue";

export default {
  data: function() {
    return {
      currentUrl: null,
      override: false,
      blockList: []
    };
  },
  computed: {
    isBlocked: function() {
      return this.blockList.includes(this.currentUrl);
    }
  },
  methods: {
    toggleUrlBlocking: function() {
      this.loadDataFromStorage(() => {
        if (this.isBlocked) {
          this.blockList = this.blockList.filter(
            item => item !== this.currentUrl
          );
        } else {
          this.blockList.push(this.currentUrl);
        }
        chrome.storage.sync.set({ blockList: this.blockList });
      });
    },
    loadDataFromStorage: function(callback) {
      chrome.storage.sync.get({ blockList: [], override: false }, result => {
        const { blockList, override } = result;
        this.blockList = blockList;
        this.override = override;
        if (callback) {
          callback();
        }
      });
    }
  },
  mounted() {
    getCurrentURL().then(rawUrl => {
      const url = stemURL(rawUrl);
      const blockableUrlRegex = /^http/;
      const isBlockable = !!blockableUrlRegex.exec(rawUrl);
      if (isBlockable) {
        this.currentUrl = url;
      }
      this.loadDataFromStorage();
    });
  },
  components: {
    BlockButton,
    OverrideInfo
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
}

.header {
  font-size: 1.25rem;
  text-align: center;
  background-color: #f0f0f0;
  min-width: 10rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  height: 5rem;
  padding: 0.5rem 2rem;
}

.header img {
  width: 2rem;
}
</style>


<style>
body,
html {
  height: 200px;
}

body {
  padding: 0;
  margin: 0;
  font-family: OpenSans, Helvetica, sans-serif !important;
  color: #111;
}
</style>

