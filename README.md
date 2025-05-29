# 🧲 Castingn Crawling Extension

쿠팡, 11번가 상품 페이지에 접속하여 주요 상품 정보를 자동으로 크롤링하고, 버튼 클릭 시 JSON 형태로 클립보드에 복사해주는 크롬 익스텐션입니다.

## 📦 기능 소개

- 쿠팡 / 11번가 상품 상세 페이지 자동 감지
- 페이지 진입 시 자동으로 상품 정보 크롤링
- 크롬 확장 프로그램 버튼 클릭 시 JSON 결과 클립보드 복사
- 수동 버튼 클릭 시 재복사 기능 지원

## 🛠️ 기술 스택

- Node.js 22
- TypeScript
- Vite

---

## ⚙️ 설치 및 실행 방법

## 폴더 구조

```bash
📦crawling_extension
┣ 📂public
┃ ┗ 📜manifest.json
┣ 📂src
┃ ┣ 📂interface
┃ ┃ ┗ 📜Crawling.ts
┃ ┣ 📂service
┃ ┃ ┣ 📜CoupangCrawling.ts
┃ ┃ ┗ 📜ElevenstCrawling.ts
┃ ┣ 📜background.ts
┃ ┗ 📜contents.ts
┣ 📜.gitignore
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜README.md
┣ 📜tsconfig.json
┗ 📜vite.config.ts
```

1. 레포지토리 클론 후 의존성 설치

```bash
git clone https://github.com/your-id/https://github.com/wkdrhkdwls/crawling_extension.git
cd crawling_extension
npm install
```

2. 빌드하기

```bash
npm run build
```
