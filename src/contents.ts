import { CoupangCrawler } from "./service/CoupangCrawling";
import { ElevenStCrawler } from "./service/ElevenCrawling";
import type { CrawlRequest, Product } from "./interface/Crawling";

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type !== "START_CRAWL") return;

  const { url, domain } = msg.payload as CrawlRequest;
  let crawler;

  if (domain === "coupang") {
    crawler = new CoupangCrawler(url);
  } else if (domain === "11st") {
    crawler = new ElevenStCrawler(url);
  } else {
    sendResponse({ success: false, error: "Unsupported domain" });
    return;
  }

  try {
    const result: Product = await crawler.crawl();
    chrome.runtime.sendMessage({
      type: "CRAWL_RESULT",
      payload: result,
    });
    sendResponse({ success: true });
  } catch (err: any) {
    sendResponse({ success: false, error: err.message });
  }
  return true;
});

(async () => {
  console.log("✅ contents.js가 페이지에 주입되었습니다. URL=", location.href);

  const url = location.href;
  const domain = url.includes("coupang.com")
    ? "coupang"
    : url.includes("11st.co.kr")
    ? "11st"
    : null;
  if (!domain) return;

  let crawler;
  if (domain === "coupang") {
    crawler = new CoupangCrawler(url);
  } else {
    crawler = new ElevenStCrawler(url);
  }

  try {
    const result: Product = await crawler.crawl();
    console.log("자동 크롤링 결과:", result);
    // 필요하면 백그라운드로도 전송:
    chrome.runtime.sendMessage({ type: "CRAWL_RESULT", payload: result });
  } catch (e) {
    console.error("자동 크롤링 실패:", e);
  }
})();
