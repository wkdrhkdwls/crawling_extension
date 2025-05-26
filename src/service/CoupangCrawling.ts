import type { ICrawler, Product } from "../interface/Crawling";

/**
 * 쿠팡 상품 페이지에서 데이터를 추출하는 크롤러
 */
export class CoupangCrawler implements ICrawler {
  constructor(private url: string) {}

  async crawl(): Promise<Product> {
    // URL에서 상품 ID 파싱
    const product_id = this.url.split("/vp/products/")[1].split("?")[0];

    // 페이지 주요 요소 로딩 대기
    await this.waitForSelector(".prod-buy-header__title");

    // DOM에서 정보 추출
    const title =
      document.querySelector(".prod-buy-header__title")?.textContent?.trim() ??
      "";
    const priceText =
      document.querySelector("span.total-price > strong")?.textContent ?? "";
    const price = Number(priceText.replace(/[\.,₩\s]/g, "")) || 0;
    const image =
      (
        document.querySelector(
          ".prod-image__detail .prod-image__image"
        ) as HTMLImageElement
      )?.src ?? "";
    const soldout = !!document.querySelector(".out-of-stock-badge");

    // 옵션 목록
    const options: string[] = Array.from(
      document.querySelectorAll(".prod-option__item select option")
    )
      .map((opt) => (opt as HTMLOptionElement).text.trim())
      .filter(Boolean);

    // 배송비
    const shippingText =
      document.querySelector(".delivery-fee-info")?.textContent ?? "";
    const shipping_fee = /\d+/.test(shippingText)
      ? Number(shippingText.replace(/[^0-9]/g, ""))
      : 0;

    return {
      product_id,
      title,
      image,
      price,
      model_name: title.split(" ")[0] ?? "",
      shipping_fee,
      return_fee: null,
      soldout,
      domain: "coupang",
      options,
    };
  }

  /**
   * 특정 셀렉터가 나타날 때까지 폴링
   */
  private waitForSelector(selector: string, timeout = 10000): Promise<void> {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const interval = setInterval(() => {
        if (document.querySelector(selector)) {
          clearInterval(interval);
          resolve();
        } else if (Date.now() - start > timeout) {
          clearInterval(interval);
          reject(
            new Error(`Selector ${selector} not found within ${timeout}ms`)
          );
        }
      }, 100);
    });
  }
}
