import { isWebsiteBlocked } from "./helpers/isWebsiteBlocked";

isWebsiteBlocked(isBlocked => {
  console.log("Is blocked?", isBlocked);
  if (isBlocked) {
    document.location.replace(chrome.extension.getURL("blockPage.html"));
  }
});
