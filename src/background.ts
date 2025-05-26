import type {
  CrawlRequest,
  CrawlResponse,
  Product,
} from "./interface/Crawling";

console.log("🔌 background.js 서비스 워커 로드됨");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "CRAWL_REQUEST") {
    handleCrawlRequest(msg.payload, sender)
      .then((r) => sendResponse(r))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (msg.type === "CRAWL_RESULT") {
    console.log("크롤링 결과:", msg.payload as Product);
  }
});

async function handleCrawlRequest(
  req: CrawlRequest,
  sender: chrome.runtime.MessageSender
): Promise<CrawlResponse> {
  const tabId = sender.tab?.id;
  if (!tabId) throw new Error("No active tab to crawl");

  return new Promise((resolve, reject) => {
    const responseListener = (response: any) => {
      if (response.type === "CRAWL_RESULT") {
        chrome.runtime.onMessage.removeListener(responseListener);
        clearTimeout(timer);
        resolve({ success: true, data: response.payload });
      }
    };
    chrome.runtime.onMessage.addListener(responseListener);

    const timer = setTimeout(() => {
      chrome.runtime.onMessage.removeListener(responseListener);
      reject(new Error("Crawl timed out"));
    }, 15000);

    chrome.tabs.sendMessage(tabId, { type: "START_CRAWL", payload: req });
  });
}
