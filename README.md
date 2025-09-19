# 국회의원 랜딩페이지 MVP

정치인을 위한 현대적이고 반응형 랜딩페이지입니다. 바이브코딩 규칙을 따라 빠른 개발과 배포에 최적화되어 있습니다.

## 🚀 기술 스택

- **Frontend**: Vite + React 18 + React Router
- **Styling**: TailwindCSS + Framer Motion
- **Backend**: Firebase Firestore
- **Forms**: React Hook Form + Zod 검증
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4

## 📋 주요 기능

### 페이지 구성
- 🏠 **홈페이지**: 메인 소개 및 히어로 섹션
- 👤 **소개페이지**: 정치인 프로필 및 경력
- 📋 **공약페이지**: 주요 정책 공약
- 📰 **소식페이지**: 최신 뉴스 및 활동
- 🗺️ **지역구페이지**: 지역 정보 및 현안
- 📞 **연락처페이지**: 문의 양식
- 🤝 **자원봉사페이지**: 자원봉사 신청
- 💰 **후원페이지**: 합법적 후원 안내

### 주요 특징
- ✅ 완전 반응형 디자인
- ✅ SEO 최적화
- ✅ 정치자금법 준수 (give.go.kr 연동)
- ✅ 개인정보보호 동의 시스템
- ✅ 실시간 폼 검증
- ✅ 웹훅 알림 시스템
- ✅ 관리자 대시보드 (Firebase 콘솔)

## 🛠️ 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd lawmaker-landing
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.example`을 복사하여 `.env` 파일을 생성하고 Firebase 설정값을 입력하세요.

```bash
cp .env.example .env
```

### 4. Firebase 프로젝트 설정
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Firestore Database 활성화
3. 웹 앱 추가 후 설정값 복사
4. `.env` 파일에 Firebase 설정값 입력

### 5. 개발 서버 실행
```bash
npm run dev
```

## 🚀 배포

### Vercel 배포
1. [Vercel](https://vercel.com)에 GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 완료

### 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수들을 설정하세요:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_WEBHOOK_URL=your_webhook_url
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📁 프로젝트 구조

```
src/
├── components/          # 공통 컴포넌트
│   ├── Layout/         # 레이아웃 관련
│   └── ui/             # UI 컴포넌트
├── pages/              # 페이지 컴포넌트
├── utils/              # 유틸리티 함수
│   └── firestore.js    # Firebase 연동
├── App.jsx             # 메인 앱 컴포넌트
└── main.jsx           # 엔트리 포인트

public/
├── robots.txt          # 검색엔진 크롤링 설정
├── sitemap.xml         # 사이트맵
└── vercel.json         # Vercel 배포 설정
```

## 🔧 주요 설정

### Firebase Firestore 컬렉션
- `pages`: 페이지 컨텐츠 관리
- `news`: 뉴스/활동 관리
- `pledges`: 공약 관리
- `contacts`: 문의 내역
- `volunteers`: 자원봉사 신청 내역

### SEO 최적화
- Open Graph 메타 태그
- Twitter Cards
- 구조화된 데이터 (JSON-LD)
- Google Analytics 4 연동
- 사이트맵 자동 생성

### 보안 설정
- Content Security Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- 개인정보보호 동의 시스템

## 📱 반응형 디자인

- **Mobile First**: 모바일 우선 설계
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue 계열 (신뢰성)
- **Accent**: Red 계열 (강조)
- **Neutral**: Gray 계열 (텍스트/배경)

### 타이포그래피
- **Headings**: Inter 폰트 / Bold
- **Body**: Inter 폰트 / Regular
- **Mobile**: 최적화된 크기

## 🔒 법적 준수사항

### 정치자금법 준수
- 후원 페이지는 give.go.kr로 리다이렉트
- 불법 후원 방지 안내
- 투명한 정치자금 관리

### 개인정보보호
- 수집/이용 목적 명시
- 동의 체크박스 필수
- 데이터 보관 기간 안내

## 📊 성능 최적화

- **번들 크기**: Vite의 트리 쉐이킹
- **이미지 최적화**: WebP 포맷 권장
- **캐싱**: Vercel Edge 캐싱 (1년)
- **CDN**: 전역 콘텐츠 배포

## 🐛 문제 해결

### 일반적인 문제
1. **Firebase 연결 오류**: 환경 변수 확인
2. **빌드 오류**: Node.js 버전 확인 (v16+)
3. **스타일 적용 안됨**: Tailwind 설정 확인

### 개발 환경 문제
- CSS 인텔리센스 경고는 정상 (Tailwind 지시어)
- Hot reload 문제시 서버 재시작

## 📞 지원

프로젝트 관련 문의사항이나 기술 지원이 필요한 경우 이슈를 등록해주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**바이브코딩 규칙 준수**: 빠른 개발 ✅ | 현대적 기술스택 ✅ | 배포 최적화 ✅
