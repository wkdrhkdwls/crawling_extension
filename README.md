환경 node js 22 버전
디렉토리 구성도
📁 extension/
├── 📁 src/
│ ├── 📁 interface/
│ │ └── 📄 Crawling.ts - 수집 업체에 대한 인터페이스 정의
│ └── 📁 service/
│ ├── 📄 CoupangCrawling.ts - 쿠팡 DOM 크롤링
│ ├── 📄 NaverCrawling.ts - 네이버 DOM 크롤링
│ ├── 📄 option.ts - 네이버 DOM의 옵션 크롤링
│ └── 📄 Yes24Crwaling.ts - Yes24 DOM 크롤링
├── 📄 background.ts
├── 📄 contents.ts
├── 📄 .env
└── 📄 package.json

- background.ts 주요 역할 일반적인 프로젝트의 백엔드에 해당하는 역할을 담당함
  - 외부 API 통신
  - 크롬 브라우저에 오픈된 탭을 컨트롤 ex) 특정 탭을 타겟으로 페이지 이동, 새 탭 생성, 탭 닫기, 탭 로딩 오류감지 등
  - 메시지큐에서 받아온 수집 요청 데이터를 수신
  - contents.ts에 수집 명령
  - 수집 된 데이터 마켓 프로젝트로 전송
- contents.ts 주요 역할 열린 탭의 페이지에 삽입되는 js코드로 이해할 수 있음
  - background.ts에서 받은 명령(크롤링)을 수행
  - 쇼핑몰 타입에 따른 인터페이스에 동적바인딩된 요소의 크롤링 메서드를 실행
  - 크롤링된 데이터를 background.ts로 전송
  - .env 주요 사항 해당 도메인 주소가 메시지큐의 데이터를 수신하는 endpoint에 대한 정의된 자료입니다. 빌드하여 배포할 때 해당 url설정에 주의하여 빌드해야합니다.
