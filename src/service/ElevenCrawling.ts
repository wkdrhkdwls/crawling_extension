import type { ICrawler, Product } from "../interface/Crawling";

// 테스트용 11번가 상품 URL 더미 10개
export const ELEVENST_TEST_URLS: string[] = [
  "https://www.11st.co.kr/products/164140643?inpu=&trTypeCd=22&trCtgrNo=895019",
  "https://www.11st.co.kr/products/181234567",
  "https://www.11st.co.kr/products/172345678",
  "https://www.11st.co.kr/products/163456789",
  "https://www.11st.co.kr/products/154321098",
  "https://www.11st.co.kr/products/145678901",
  "https://www.11st.co.kr/products/136789012",
  "https://www.11st.co.kr/products/127890123",
  "https://www.11st.co.kr/products/118901234",
  "https://www.11st.co.kr/products/109012345",
];

export class ElevenStCrawler implements ICrawler {
  constructor(private url: string) {}

  async crawl(): Promise<Product> {
    // 페이지 로드 후 실행
    const product_id = this.url.split("/products/")[1].split(/\?|&/)[0];
    const titleEl =
      document.querySelector("#productName") ||
      document.querySelector("h2.product-title");
    const priceEl =
      document.querySelector(".price_real") ||
      document.querySelector(".price_point");
    const imageEl = document.querySelector("#thumbnail img");
    const soldOutEl =
      document.querySelector(".sold-out") ||
      document.querySelector(".oos-text");
    const optionEls = document.querySelectorAll(".option_layer select option");
    const shippingEl = document.querySelector(".delivery_fee");

    const title = titleEl?.textContent?.trim() || "";
    const price = Number(priceEl?.textContent?.replace(/[.,원\s]/g, "")) || 0;
    const image = (imageEl as HTMLImageElement)?.src || "";
    const soldout = !!soldOutEl;
    const options: string[] = [];
    optionEls.forEach((opt) => {
      const val = (opt as HTMLOptionElement).text.trim();
      if (val) options.push(val);
    });
    const shipping_text = shippingEl?.textContent || "";
    const shipping_fee = /\d+/.test(shipping_text)
      ? Number(shipping_text.replace(/[^0-9]/g, ""))
      : 0;

    return {
      product_id,
      title,
      image,
      price,
      model_name: title.split(" ")[0] || "",
      shipping_fee,
      return_fee: null,
      soldout,
      domain: "11st",
      options,
    };
  }
}
