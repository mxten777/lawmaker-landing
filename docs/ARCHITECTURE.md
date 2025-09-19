# 프로젝트 아키텍처 문서

## 📊 시스템 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────┐
│                        사용자 (Citizens)                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    프론트엔드 (React SPA)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │    홈페이지   │  │   공약페이지  │  │    뉴스/활동페이지    │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   소개페이지  │  │   문의페이지  │  │   자원봉사페이지      │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS/REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                Firebase (Backend as a Service)               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Firestore DB  │  │   Cloud Storage │  │   Analytics  │ │
│  │   (NoSQL)       │  │   (이미지/파일)  │  │   (사용자추적) │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     외부 서비스 연동                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │ Vercel CDN  │  │ Slack Webhook│  │ Google Analytics    │   │
│  │ (배포/호스팅) │  │ (알림시스템)  │  │ (웹사이트 분석)      │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ 기술 스택 상세

### Frontend Layer
- **React 19**: 사용자 인터페이스 구축
- **Vite**: 빠른 개발 환경 및 번들링
- **React Router**: 클라이언트 사이드 라우팅
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **Framer Motion**: 애니메이션 및 인터랙션
- **React Hook Form**: 폼 상태 관리 및 검증
- **Zod**: 스키마 검증 라이브러리

### Backend Layer (Firebase)
- **Firestore**: NoSQL 실시간 데이터베이스
- **Firebase Hosting**: 정적 파일 호스팅 (선택사항)
- **Cloud Storage**: 이미지 및 파일 저장소 (확장 시)
- **Analytics**: 사용자 행동 분석

### DevOps & Deployment
- **Vercel**: 자동 배포 및 CDN
- **GitHub Actions**: CI/CD 파이프라인 (선택사항)
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅

## 📁 컴포넌트 아키텍처

### 1. 레이아웃 구조

```
App.jsx
└── Layout.jsx
    ├── Header.jsx
    ├── Main Content (Pages)
    └── Footer.jsx
```

### 2. 페이지 컴포넌트 계층

```
Pages/
├── Home.jsx                 # 랜딩 페이지
│   ├── HeroSection
│   ├── AboutPreview
│   ├── PledgePreview
│   └── NewsPreview
├── About.jsx                # 소개 페이지
│   ├── ProfileSection
│   ├── CareerTimeline
│   └── VisionStatement
├── Pledges.jsx              # 공약 목록
│   ├── PledgeCard (multiple)
│   └── CategoryFilter
├── PledgeDetail.jsx         # 공약 상세
│   ├── PledgeHeader
│   ├── PledgeContent
│   └── RelatedPledges
├── News.jsx                 # 뉴스 목록
│   ├── NewsCard (multiple)
│   ├── CategoryFilter
│   └── Pagination
├── NewsDetail.jsx           # 뉴스 상세
│   ├── NewsHeader
│   ├── NewsContent
│   └── RelatedNews
├── Contact.jsx              # 문의 페이지
│   ├── ContactForm
│   ├── ContactInfo
│   └── LocationMap
└── Volunteer.jsx            # 자원봉사
    ├── VolunteerForm
    ├── ActivityInfo
    └── SuccessStories
```

### 3. 공통 컴포넌트

```
components/
├── Layout/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Navigation.jsx
├── UI/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorBoundary.jsx
├── Forms/
│   ├── FormField.jsx
│   ├── FormSelect.jsx
│   └── FormTextarea.jsx
└── Animations/
    ├── FadeIn.jsx
    ├── SlideUp.jsx
    └── StaggerContainer.jsx
```

## 🔄 데이터 플로우

### 1. 데이터 읽기 플로우

```
사용자 요청 → 페이지 컴포넌트 → useEffect Hook → Firestore 유틸리티 함수 → Firebase SDK → Firestore DB → 데이터 반환 → 상태 업데이트 → UI 렌더링
```

### 2. 폼 제출 플로우

```
사용자 입력 → 폼 검증 (Zod) → React Hook Form → 제출 핸들러 → Firestore 저장 함수 → Firebase SDK → Firestore DB → 성공/실패 응답 → 사용자 피드백 → 웹훅 알림 (선택사항)
```

### 3. 상태 관리 패턴

```jsx
// 컴포넌트 레벨 상태 관리
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// 비동기 데이터 로딩
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  loadData();
}, []);
```

## 🔐 보안 아키텍처

### 1. 클라이언트 보안

```javascript
// 환경 변수를 통한 설정 관리
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ... 기타 설정
};

// 입력 검증
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000)
});
```

### 2. Firestore 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 읽기 전용 컬렉션
    match /pages/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // 사용자 입력 컬렉션 (생성만 허용)
    match /contacts/{document} {
      allow create: if isValidContact(resource.data);
      allow read, update, delete: if false;
    }
  }
  
  function isValidContact(data) {
    return data.keys().hasAll(['name', 'email', 'message']) &&
           data.name is string &&
           data.email is string &&
           data.message is string;
  }
}
```

### 3. 네트워크 보안

```json
// vercel.json - 보안 헤더 설정
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options", 
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 📱 반응형 디자인 아키텍처

### 1. 브레이크포인트 시스템

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // 모바일 landscape
      'md': '768px',   // 태블릿
      'lg': '1024px',  // 데스크톱
      'xl': '1280px',  // 큰 데스크톱
      '2xl': '1536px', // 매우 큰 화면
    }
  }
}
```

### 2. 모바일 우선 설계

```jsx
// 모바일 우선 반응형 컴포넌트
<div className="
  flex flex-col space-y-4           /* 모바일: 세로 배치 */
  md:flex-row md:space-y-0 md:space-x-6  /* 태블릿+: 가로 배치 */
  lg:space-x-8                      /* 데스크톱: 더 넓은 간격 */
">
  <div className="w-full md:w-2/3">메인 컨텐츠</div>
  <div className="w-full md:w-1/3">사이드바</div>
</div>
```

### 3. 타이포그래피 스케일

```css
/* 반응형 텍스트 크기 */
.heading-1 { @apply text-2xl md:text-3xl lg:text-4xl xl:text-5xl; }
.heading-2 { @apply text-xl md:text-2xl lg:text-3xl xl:text-4xl; }
.heading-3 { @apply text-lg md:text-xl lg:text-2xl xl:text-3xl; }
.body-text { @apply text-sm md:text-base lg:text-lg; }
```

## 🚀 성능 최적화 아키텍처

### 1. 번들 분할 전략

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 써드파티 라이브러리 분할
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'firebase': ['firebase/app', 'firebase/firestore'],
          'animation': ['framer-motion'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod']
        }
      }
    }
  }
});
```

### 2. 지연 로딩 패턴

```jsx
import { lazy, Suspense } from 'react';

// 페이지별 코드 분할
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));

// 로딩 컴포넌트
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
  </div>
);

// 앱에서 사용
<Suspense fallback={<LoadingFallback />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/news/:id" element={<NewsDetail />} />
  </Routes>
</Suspense>
```

### 3. 캐싱 전략

```javascript
// Service Worker 캐싱 (선택사항)
const CACHE_NAME = 'lawmaker-v1';
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// 이미지 최적화
<img
  src={imageSrc}
  alt={imageAlt}
  loading="lazy"           // 지연 로딩
  decoding="async"         // 비동기 디코딩
  className="w-full h-auto object-cover"
/>
```

## 📊 SEO 아키텍처

### 1. 메타데이터 관리

```jsx
// SEO 컴포넌트
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, keywords, image, url }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    
    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
);
```

### 2. 구조화된 데이터

```jsx
// JSON-LD 스키마
const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "정치인 이름",
  "jobTitle": "국회의원",
  "worksFor": {
    "@type": "Organization",
    "name": "대한민국 국회"
  },
  "url": "https://example.com",
  "sameAs": [
    "https://facebook.com/profile",
    "https://twitter.com/profile"
  ]
};

<script type="application/ld+json">
  {JSON.stringify(PersonSchema)}
</script>
```

### 3. 사이트맵 생성

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## 🔄 배포 아키텍처

### 1. CI/CD 파이프라인

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build project
      run: npm run build
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
    
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 2. 환경별 설정

```javascript
// 환경별 설정 분리
const config = {
  development: {
    apiUrl: 'http://localhost:5173',
    firebase: {
      useEmulator: true,
      emulatorHost: 'localhost',
      emulatorPort: 8080
    }
  },
  production: {
    apiUrl: 'https://example.com',
    firebase: {
      useEmulator: false
    }
  }
};

export default config[import.meta.env.MODE];
```

### 3. 모니터링 및 에러 추적

```javascript
// 에러 바운더리
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 서비스로 전송
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## 📈 확장성 고려사항

### 1. 상태 관리 확장

```javascript
// 추후 Redux Toolkit 도입 시
import { configureStore } from '@reduxjs/toolkit';
import pledgesSlice from './slices/pledgesSlice';
import newsSlice from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    pledges: pledgesSlice,
    news: newsSlice,
  },
});
```

### 2. 인증 시스템 확장

```javascript
// Firebase Auth 도입 시
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};
```

### 3. 다국어 지원 확장

```javascript
// react-i18next 도입 시
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: require('./locales/ko.json') },
      en: { translation: require('./locales/en.json') }
    },
    lng: 'ko',
    fallbackLng: 'ko'
  });
```

이 아키텍처 문서는 프로젝트의 전체적인 구조와 설계 원칙을 설명합니다. 프로젝트가 발전함에 따라 이 문서도 함께 업데이트되어야 합니다.