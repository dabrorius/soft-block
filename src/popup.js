import Vue from "vue/dist/vue.js";
import { getCurrentURL } from "./helpers/getCurrentURL";
import { stemURL } from "./helpers/stemURL";

import BlockButton from "./components/BlockButton.vue";
import OverrideInfo from "./components/OverrideInfo.vue";

import "./popup.css";

var app = new Vue({
  el: "#app",
  data: {
    currentUrl: null,
    override: false,
    blockList: []
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
});
