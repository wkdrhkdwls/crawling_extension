const injectedTabs = new Set<number>();

chrome.webNavigation.onCompleted.addListener(
  async (details) => {
    if (details.frameId !== 0) return;
    if (injectedTabs.has(details.tabId)) return;

    try {
      await chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["contents.js"],
      });
      injectedTabs.add(details.tabId);
    } catch (e) {
      console.error("❌ webNavigation 주입 실패:", e);
    }
  },
  {
    url: [{ hostContains: "coupang.com" }, { hostContains: "11st.co.kr" }],
  }
);

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) return;

  if (!injectedTabs.has(tab.id)) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["contents.js"],
      });
      injectedTabs.add(tab.id);
    } catch (e) {
      console.error("❌ 버튼 클릭 주입 실패:", e);
    }
  }

  chrome.tabs.sendMessage(tab.id, { type: "COPY_CRAWL_RESULT" });
});
