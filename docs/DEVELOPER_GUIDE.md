# 개발자 가이드

## 🚀 개발 환경 설정

### 필수 요구사항

- **Node.js**: v16.0 이상
- **npm**: v7.0 이상 (또는 yarn v1.22 이상)
- **Git**: 버전 관리
- **VS Code**: 추천 에디터 (확장 프로그램 포함)

### 권장 VS Code 확장 프로그램

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-css-peek"
  ]
}
```

### 프로젝트 클론 및 설정

```bash
# 1. 저장소 클론
git clone <repository-url>
cd lawmaker-landing

# 2. 의존성 설치
npm install

# 3. 환경 변수 파일 생성
cp .env.example .env

# 4. 개발 서버 실행
npm run dev
```

## 📁 프로젝트 구조 상세

```
lawmaker-landing/
├── docs/                          # 프로젝트 문서
│   ├── API_DOCUMENTATION.md       # API 문서
│   └── DEVELOPER_GUIDE.md          # 개발자 가이드
├── public/                         # 정적 파일
│   ├── robots.txt                  # SEO 크롤링 설정
│   ├── sitemap.xml                 # 사이트맵
│   └── vite.svg                    # 파비콘
├── src/                           # 소스 코드
│   ├── assets/                    # 정적 리소스
│   │   └── react.svg
│   ├── components/                # 재사용 가능한 컴포넌트
│   │   ├── Footer.jsx             # 푸터 컴포넌트
│   │   ├── Header.jsx             # 헤더 컴포넌트
│   │   └── Layout.jsx             # 레이아웃 래퍼
│   ├── pages/                     # 페이지 컴포넌트
│   │   ├── About.jsx              # 소개 페이지
│   │   ├── Contact.jsx            # 문의 페이지
│   │   ├── District.jsx           # 지역구 페이지
│   │   ├── Home.jsx               # 홈 페이지
│   │   ├── News.jsx               # 뉴스 목록 페이지
│   │   ├── NewsDetail.jsx         # 뉴스 상세 페이지
│   │   ├── PledgeDetail.jsx       # 공약 상세 페이지
│   │   ├── Pledges.jsx            # 공약 목록 페이지
│   │   ├── Privacy.jsx            # 개인정보처리방침
│   │   ├── Support.jsx            # 후원 페이지
│   │   ├── Terms.jsx              # 이용약관
│   │   └── Volunteer.jsx          # 자원봉사 신청
│   ├── utils/                     # 유틸리티 함수
│   │   └── firestore.js           # Firebase 연동 함수
│   ├── App.jsx                    # 메인 앱 컴포넌트
│   ├── App.css                    # 앱 스타일
│   ├── firebaseClient.js          # Firebase 클라이언트 설정
│   ├── index.css                  # 글로벌 스타일
│   └── main.jsx                   # 애플리케이션 진입점
├── .env.example                   # 환경 변수 템플릿
├── .gitignore                     # Git 무시 파일
├── eslint.config.js               # ESLint 설정
├── index.html                     # HTML 템플릿
├── package.json                   # 패키지 설정
├── postcss.config.cjs             # PostCSS 설정
├── README.md                      # 프로젝트 설명서
├── tailwind.config.js             # Tailwind CSS 설정
├── vercel.json                    # Vercel 배포 설정
└── vite.config.js                 # Vite 설정
```

## 🛠️ 개발 워크플로우

### 1. 기능 개발 프로세스

#### Step 1: 브랜치 생성
```bash
# main 브랜치에서 최신 코드 pull
git checkout main
git pull origin main

# 새 기능 브랜치 생성
git checkout -b feature/새기능명
```

#### Step 2: 개발
```bash
# 개발 서버 실행
npm run dev

# 코드 작성...

# 코드 스타일 확인
npm run lint

# 빌드 테스트
npm run build
```

#### Step 3: 커밋 및 푸시
```bash
# 스테이징
git add .

# 커밋 (컨벤션 준수)
git commit -m "feat: 새로운 기능 추가"

# 푸시
git push origin feature/새기능명
```

#### Step 4: 풀 리퀘스트
1. GitHub에서 Pull Request 생성
2. 코드 리뷰 요청
3. 승인 후 main 브랜치에 머지

### 2. 커밋 컨벤션

```
type(scope): description

[optional body]

[optional footer]
```

**커밋 타입:**
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경 (포맷팅 등)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 기타 작업 (빌드, 패키지 매니저 등)

**예시:**
```bash
feat(pages): 자원봉사 신청 페이지 추가
fix(firebase): Firestore 연결 오류 수정
docs(readme): 설치 가이드 업데이트
style(components): 헤더 컴포넌트 스타일 개선
```

## 🔧 코딩 표준

### 1. JavaScript/JSX 스타일

#### 파일 이름 규칙
- 컴포넌트: `PascalCase.jsx` (예: `Header.jsx`)
- 유틸리티: `camelCase.js` (예: `firestore.js`)
- 상수: `UPPER_SNAKE_CASE.js` (예: `CONSTANTS.js`)

#### 컴포넌트 구조
```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 외부 라이브러리 import
import { motion } from 'framer-motion';

// 내부 모듈 import
import { getData } from '../utils/firestore';

const ComponentName = ({ prop1, prop2 }) => {
  // 1. 상태 선언
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. 이펙트 훅
  useEffect(() => {
    // 비동기 작업
  }, []);

  // 3. 이벤트 핸들러
  const handleClick = () => {
    // 핸들러 로직
  };

  // 4. 조건부 렌더링
  if (loading) {
    return <div className="animate-spin">로딩중...</div>;
  }

  // 5. 메인 렌더링
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4"
    >
      {/* JSX 내용 */}
    </motion.div>
  );
};

// PropTypes 정의
ComponentName.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number,
};

// 기본값 정의
ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

### 2. Tailwind CSS 사용 규칙

#### 클래스 순서
1. 레이아웃 (display, position, flex/grid)
2. 크기 (width, height, padding, margin)
3. 타이포그래피 (font, text)
4. 색상 (background, text color, border)
5. 효과 (shadow, transition, animation)

```jsx
<div className="
  flex flex-col items-center justify-center
  w-full max-w-4xl mx-auto px-4 py-8
  text-center text-lg font-semibold
  bg-white text-gray-900 border border-gray-200
  shadow-lg transition-all duration-300 hover:shadow-xl
">
  컨텐츠
</div>
```

#### 커스텀 색상 사용
```jsx
// tailwind.config.js에 정의된 커스텀 색상 사용
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  버튼
</button>

<div className="text-accent-500 border-accent-200">
  강조 텍스트
</div>
```

### 3. 상태 관리

#### useState 사용 패턴
```jsx
// 단순 상태
const [isOpen, setIsOpen] = useState(false);

// 객체 상태
const [form, setForm] = useState({
  name: '',
  email: '',
  message: ''
});

// 객체 상태 업데이트
const updateForm = (field, value) => {
  setForm(prev => ({
    ...prev,
    [field]: value
  }));
};
```

#### 비동기 데이터 처리
```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    const result = await getData();
    setData(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

## 🔀 라우팅 구조

### 라우트 정의
```jsx
// App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/pledges" element={<Pledges />} />
  <Route path="/pledges/:id" element={<PledgeDetail />} />
  <Route path="/news" element={<News />} />
  <Route path="/news/:id" element={<NewsDetail />} />
  <Route path="/district" element={<District />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/volunteer" element={<Volunteer />} />
  <Route path="/support" element={<Support />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/terms" element={<Terms />} />
</Routes>
```

### 동적 라우팅 사용
```jsx
// PledgeDetail.jsx
import { useParams } from 'react-router-dom';

const PledgeDetail = () => {
  const { id } = useParams();
  
  useEffect(() => {
    // ID를 사용해 데이터 로드
    loadPledgeData(id);
  }, [id]);
};
```

### 네비게이션
```jsx
import { Link, useNavigate } from 'react-router-dom';

// Link 컴포넌트 사용
<Link 
  to="/pledges" 
  className="text-primary-600 hover:text-primary-800"
>
  공약 보기
</Link>

// 프로그래밍 방식 네비게이션
const navigate = useNavigate();

const handleSubmit = () => {
  // 폼 제출 후 리다이렉트
  navigate('/success');
};
```

## 🎨 스타일링 가이드

### 1. 반응형 디자인

#### 브레이크포인트
```css
/* Tailwind CSS 브레이크포인트 */
sm: 640px   /* 태블릿 */
md: 768px   /* 작은 데스크톱 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 큰 데스크톱 */
2xl: 1536px /* 매우 큰 화면 */
```

#### 반응형 클래스 사용
```jsx
<div className="
  w-full
  sm:w-1/2
  md:w-1/3
  lg:w-1/4
  px-2
  sm:px-4
  md:px-6
  text-sm
  sm:text-base
  md:text-lg
">
  반응형 컨텐츠
</div>
```

### 2. 애니메이션

#### Framer Motion 기본 패턴
```jsx
import { motion } from 'framer-motion';

// 페이드 인
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  컨텐츠
</motion.div>

// 슬라이드 업
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  컨텐츠
</motion.div>

// 스태거 애니메이션
<motion.div variants={containerVariants}>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      variants={itemVariants}
      custom={index}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 🔗 Firebase 연동 패턴

### 1. 데이터 로딩 훅
```jsx
// hooks/useFirestoreData.js
import { useState, useEffect } from 'react';

export const useFirestoreData = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [fetchFunction]);

  return { data, loading, error };
};
```

### 2. 폼 처리 패턴
```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 스키마 정의
const contactSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  message: z.string().min(10, '메시지는 10자 이상 입력해주세요')
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    try {
      await addContact(data);
      // 성공 처리
    } catch (error) {
      // 에러 처리
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name')}
        className="form-input"
      />
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary"
      >
        {isSubmitting ? '제출 중...' : '제출하기'}
      </button>
    </form>
  );
};
```

## 🚀 빌드 및 배포

### 1. 로컬 빌드
```bash
# 프로덕션 빌드 생성
npm run build

# 빌드 결과 미리보기
npm run preview

# 빌드 분석 (optional)
npm run build:analyze
```

### 2. Vercel 배포 설정

#### vercel.json 설정
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/.*",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

#### 환경 변수 설정
Vercel 대시보드에서 설정:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### 3. GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Build project
      run: npm run build
```

## 🧪 테스팅 가이드

### 1. 수동 테스트 체크리스트

#### 기능 테스트
- [ ] 모든 페이지 로딩 확인
- [ ] 네비게이션 링크 작동
- [ ] 폼 제출 및 검증
- [ ] 반응형 디자인 확인
- [ ] 브라우저 호환성 테스트

#### 성능 테스트
- [ ] 페이지 로딩 속도 (< 3초)
- [ ] 이미지 최적화 확인
- [ ] 번들 크기 확인
- [ ] Lighthouse 점수 (>90)

### 2. 디버깅 도구

#### 개발자 도구 활용
```javascript
// 콘솔 디버깅
console.log('데이터:', data);
console.error('에러:', error);
console.warn('경고:', warning);

// 성능 측정
console.time('데이터 로딩');
await loadData();
console.timeEnd('데이터 로딩');
```

#### React Developer Tools
- 컴포넌트 트리 확인
- Props 및 State 검사
- 성능 프로파일링

## 📊 성능 최적화

### 1. 번들 최적화
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          firebase: ['firebase/app', 'firebase/firestore']
        }
      }
    }
  }
});
```

### 2. 이미지 최적화
```jsx
// 반응형 이미지
<picture>
  <source
    media="(max-width: 768px)"
    srcSet="image-mobile.webp"
  />
  <source
    media="(min-width: 769px)"
    srcSet="image-desktop.webp"
  />
  <img
    src="image-fallback.jpg"
    alt="설명"
    loading="lazy"
    className="w-full h-auto"
  />
</picture>
```

### 3. 코드 분할
```jsx
import { lazy, Suspense } from 'react';

// 지연 로딩
const NewsDetail = lazy(() => import('./pages/NewsDetail'));

function App() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <Routes>
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </Suspense>
  );
}
```

## 🐛 문제 해결

### 자주 발생하는 문제들

#### 1. 빌드 오류
```bash
# 캐시 클리어
npm run build -- --force

# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 2. 스타일 적용 안됨
```bash
# Tailwind 캐시 클리어
npx tailwindcss build -i ./src/index.css -o ./dist/output.css --watch
```

#### 3. Firebase 연결 오류
- 환경 변수 확인
- Firebase 프로젝트 설정 재확인
- 네트워크 연결 상태 확인

#### 4. 라우팅 문제
- `BrowserRouter` 설정 확인
- Vercel 리라이트 규칙 확인
- 절대 경로와 상대 경로 구분

## 📞 지원 및 문의

### 개발 관련 문의
- GitHub Issues 등록
- 코드 리뷰 요청
- 기술 문서 개선 제안

### 유용한 리소스
- [React 공식 문서](https://reactjs.org/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [Firebase 문서](https://firebase.google.com/docs)
- [Vite 문서](https://vitejs.dev/)
- [Framer Motion 문서](https://www.framer.com/motion/)

이 가이드는 프로젝트 개발에 필요한 모든 정보를 담고 있습니다. 추가 질문이나 개선사항이 있으면 언제든 문의해주세요!