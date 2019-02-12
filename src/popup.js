import Vue from "vue/dist/vue.js";
import { getCurrentURL } from "./helpers/getCurrentURL";
import { stemURL } from "./helpers/stemURL";
import * as moment from "moment";

import "./popup.css";

var app = new Vue({
  el: "#app",
  data: {
    currentUrl: null,
    isBlocked: false,
    override: false
  },
  computed: {
    blockButtonClass: function() {
      return this.isBlocked ? "blocked" : "unblocked";
    },
    currentlyOverriding: function() {
      return this.override && new Date(this.override) > new Date();
    },
    lastOverrideFromNow: function() {
      return this.override ? moment(this.override).fromNow() : "never";
    }
  },
  methods: {
    toggleUrlBlocking: function() {
      getCurrentURL().then(rawUrl => {
        const url = stemURL(rawUrl);
        chrome.storage.sync.get({ blockList: [] }, result => {
          let { blockList } = result;

          const isBlocked = blockList.includes(url);
          if (isBlocked) {
            blockList = blockList.filter(item => item !== url);
          } else {
            blockList.push(url);
          }

          this.isBlocked = !isBlocked;
          chrome.storage.sync.set({ blockList });
        });
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
      chrome.storage.sync.get({ blockList: [], override: false }, result => {
        const { blockList, override } = result;
        this.isBlocked = blockList.includes(url);
        this.override = override;
        console.log(result);
      });
    });
  }
});
