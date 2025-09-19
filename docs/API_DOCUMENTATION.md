# API 및 Firebase 연동 문서

## 🔥 Firebase 설정

### 초기 설정

#### 1. Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `lawmaker-landing`)
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

#### 2. Firestore Database 설정
1. 왼쪽 메뉴에서 "Firestore Database" 선택
2. "데이터베이스 만들기" 클릭
3. 보안 규칙 모드 선택:
   - **테스트 모드**: 개발 초기 (30일 후 만료)
   - **프로덕션 모드**: 실제 서비스 시
4. 데이터베이스 위치 선택 (asia-northeast3 권장)

#### 3. 웹 앱 등록
1. 프로젝트 개요에서 웹 아이콘(</>)클릭
2. 앱 이름 입력
3. Firebase Hosting 설정 (선택사항)
4. 구성 정보 복사

### 환경 변수 설정

`.env` 파일에 Firebase 구성 정보를 입력하세요:

```env
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## 📊 Firestore 데이터 구조

### 1. pages 컬렉션
페이지별 동적 컨텐츠를 관리합니다.

```javascript
{
  id: "home",
  title: "홈페이지",
  content: {
    hero: {
      title: "국민과 함께하는 정치",
      subtitle: "더 나은 미래를 위한 약속",
      image: "hero-image.jpg"
    },
    sections: [...]
  },
  seo: {
    title: "SEO 제목",
    description: "메타 설명",
    keywords: ["정치", "국회의원"]
  },
  updatedAt: Timestamp,
  createdAt: Timestamp
}
```

### 2. pledges 컬렉션
정책 공약을 관리합니다.

```javascript
{
  id: "auto-generated",
  title: "일자리 창출과 경제 활성화",
  description: "상세 설명...",
  category: "경제", // 경제, 복지, 교육, 환경 등
  priority: 1, // 1(높음) ~ 5(낮음)
  status: "active", // active, completed, pending
  details: [
    {
      subtitle: "세부 계획 1",
      content: "구체적인 내용..."
    }
  ],
  timeline: {
    start: "2025-01-01",
    end: "2025-12-31",
    milestones: [...]
  },
  budget: {
    total: 1000000000,
    breakdown: [...]
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 3. news 컬렉션
뉴스와 활동 소식을 관리합니다.

```javascript
{
  id: "auto-generated",
  title: "뉴스 제목",
  content: "뉴스 본문 내용...",
  summary: "요약 내용",
  category: "활동", // 활동, 정책, 지역, 보도자료
  featured: true, // 메인 노출 여부
  image: "news-image.jpg",
  tags: ["태그1", "태그2"],
  author: "작성자명",
  publishDate: Timestamp,
  viewCount: 0,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 4. contacts 컬렉션
문의 내역을 저장합니다.

```javascript
{
  id: "auto-generated",
  name: "문의자명",
  email: "email@example.com",
  phone: "010-1234-5678",
  subject: "문의 제목",
  message: "문의 내용",
  category: "일반문의", // 일반문의, 정책제안, 민원접수
  status: "pending", // pending, processing, completed
  priority: "normal", // low, normal, high, urgent
  response: {
    message: "답변 내용",
    respondedAt: Timestamp,
    respondedBy: "담당자명"
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 5. volunteers 컬렉션
자원봉사 신청 내역을 관리합니다.

```javascript
{
  id: "auto-generated",
  name: "신청자명",
  email: "email@example.com",
  phone: "010-1234-5678",
  age: 25,
  occupation: "직업",
  address: {
    city: "서울시",
    district: "강남구",
    detail: "상세주소"
  },
  activities: ["선거운동", "정책연구"], // 관심 활동 분야
  experience: "이전 경험",
  motivation: "지원 동기",
  availability: {
    days: ["월", "화", "수"], // 가능한 요일
    hours: "오후", // 오전, 오후, 저녁, 종일
    duration: "3개월" // 활동 기간
  },
  status: "pending", // pending, approved, rejected
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🔌 Firestore 유틸리티 함수

### 데이터 조회 함수

#### getAllPledges()
모든 공약을 우선순위 순으로 조회합니다.

```javascript
import { getAllPledges } from './utils/firestore';

const pledges = await getAllPledges();
console.log(pledges); // 공약 배열
```

#### getPledgeById(id)
특정 공약을 ID로 조회합니다.

```javascript
const pledge = await getPledgeById('pledge-id');
console.log(pledge); // 공약 객체
```

#### getLatestNews(limit)
최신 뉴스를 지정된 개수만큼 조회합니다.

```javascript
const latestNews = await getLatestNews(5);
console.log(latestNews); // 최신 뉴스 5개
```

#### getFeaturedNews()
메인 페이지에 노출될 주요 뉴스를 조회합니다.

```javascript
const featuredNews = await getFeaturedNews();
console.log(featuredNews); // 주요 뉴스 배열
```

### 데이터 추가 함수

#### addContact(contactData)
새로운 문의를 추가합니다.

```javascript
const contactData = {
  name: "홍길동",
  email: "hong@example.com",
  subject: "정책 문의",
  message: "교육 정책에 대해 문의드립니다."
};

const result = await addContact(contactData);
console.log(result); // { success: true, id: "generated-id" }
```

#### addVolunteer(volunteerData)
새로운 자원봉사 신청을 추가합니다.

```javascript
const volunteerData = {
  name: "김자원",
  email: "volunteer@example.com",
  activities: ["선거운동"],
  motivation: "지역 발전에 기여하고 싶습니다."
};

const result = await addVolunteer(volunteerData);
console.log(result); // { success: true, id: "generated-id" }
```

## 🔒 Firestore 보안 규칙

### 기본 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 페이지 컨텐츠: 읽기만 허용
    match /pages/{document} {
      allow read: if true;
      allow write: if false; // 관리자만 수정 가능
    }
    
    // 공약: 읽기만 허용
    match /pledges/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // 뉴스: 읽기만 허용
    match /news/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // 문의: 생성만 허용
    match /contacts/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    
    // 자원봉사: 생성만 허용
    match /volunteers/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

### 관리자 인증이 있는 경우

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 관리자 확인 함수
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.admin == true;
    }
    
    // 페이지 컨텐츠
    match /pages/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // 공약
    match /pledges/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // 뉴스
    match /news/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // 문의
    match /contacts/{document} {
      allow create: if true;
      allow read, update: if isAdmin();
      allow delete: if false;
    }
    
    // 자원봉사
    match /volunteers/{document} {
      allow create: if true;
      allow read, update: if isAdmin();
      allow delete: if false;
    }
  }
}
```

## 🎣 웹훅 연동

### 문의 알림 웹훅

문의가 접수되면 지정된 웹훅 URL로 알림을 전송합니다.

```javascript
// 웹훅 URL 설정
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

// 웹훅 전송 함수
const sendWebhook = async (data) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        data: data,
        timestamp: new Date().toISOString()
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('웹훅 전송 실패:', error);
    return false;
  }
};
```

### Slack 웹훅 예시

```javascript
const sendSlackNotification = async (contactData) => {
  const slackMessage = {
    text: "새로운 문의가 접수되었습니다.",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*새로운 문의*\n\n*이름:* ${contactData.name}\n*이메일:* ${contactData.email}\n*제목:* ${contactData.subject}\n*내용:* ${contactData.message}`
        }
      }
    ]
  };
  
  await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slackMessage)
  });
};
```

## 🔧 개발자 도구

### Firebase 에뮬레이터 사용

로컬 개발 시 Firebase 에뮬레이터를 사용할 수 있습니다:

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# 에뮬레이터 설정
firebase init emulators

# 에뮬레이터 실행
firebase emulators:start
```

### 에뮬레이터 설정 (firebase.json)

```json
{
  "emulators": {
    "firestore": {
      "port": 8080
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

### 로컬 개발 환경 변수

```env
# 에뮬레이터 사용 시
VITE_USE_EMULATOR=true
VITE_EMULATOR_HOST=localhost
VITE_EMULATOR_PORT=8080
```

## 📈 성능 최적화

### 데이터 캐싱

React Query를 사용한 데이터 캐싱 예시:

```javascript
import { useQuery } from '@tanstack/react-query';
import { getAllPledges } from '../utils/firestore';

export const usePledges = () => {
  return useQuery({
    queryKey: ['pledges'],
    queryFn: getAllPledges,
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
  });
};
```

### 이미지 최적화

Firebase Storage를 사용한 이미지 관리:

```javascript
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadImage = async (file, path) => {
  const storage = getStorage();
  const imageRef = ref(storage, `images/${path}`);
  
  const snapshot = await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  
  return downloadURL;
};
```

## 🐛 에러 처리

### 공통 에러 처리

```javascript
export const handleFirestoreError = (error) => {
  console.error('Firestore 에러:', error);
  
  switch (error.code) {
    case 'permission-denied':
      return '접근 권한이 없습니다.';
    case 'not-found':
      return '요청한 데이터를 찾을 수 없습니다.';
    case 'unavailable':
      return '서비스가 일시적으로 이용할 수 없습니다.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};
```

### 재시도 로직

```javascript
const retryOperation = async (operation, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};
```

이 문서는 프로젝트의 Firebase 연동과 API 사용법을 상세히 설명합니다. 추가 질문이나 수정사항이 있으면 언제든 문의해주세요.