# 🎯 컴포넌트 구조 및 API 가이드

## 📂 컴포넌트 구조

### Home.jsx 컴포넌트 분석

```
Home.jsx
├── useCountUp Hook (카운터 애니메이션)
├── useFadeInOnScroll Hook (스크롤 트리거)
├── AchievementCard Component (성과 카드)
├── SocialProofStat Component (소셜 프루프 통계)
├── PolicyCard Component (정책 카드)
└── Main Home Component (메인 컴포넌트)
```

## 🔧 커스텀 훅 API

### useCountUp

**목적**: 숫자 카운터 애니메이션 구현

```jsx
const useCountUp = (end, duration = 2000, start = 0)
```

**매개변수:**
- `end` (number): 목표 숫자
- `duration` (number, optional): 애니메이션 지속 시간 (ms)
- `start` (number, optional): 시작 숫자

**반환값:**
- `[count, ref]`: 현재 카운트 값과 DOM ref

**사용 예시:**
```jsx
const [count, countRef] = useCountUp(200, 2500);

return (
  <div ref={countRef}>
    {count}억원
  </div>
);
```

### useFadeInOnScroll

**목적**: 스크롤 트리거 페이드인 애니메이션

```jsx
const useFadeInOnScroll = (delay = 0)
```

**매개변수:**
- `delay` (number, optional): 애니메이션 지연 시간 (ms)

**반환값:**
- `[isVisible, ref]`: 가시성 상태와 DOM ref

**사용 예시:**
```jsx
const [isVisible, fadeRef] = useFadeInOnScroll(400);

return (
  <div 
    ref={fadeRef}
    className={`transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
  >
    Content
  </div>
);
```

## 🎨 컴포넌트 API

### AchievementCard

**목적**: 성과 데이터를 표시하는 인터랙티브 카드

```jsx
<AchievementCard item={item} index={index} />
```

**Props:**
```typescript
interface AchievementItem {
  number: string;          // 표시용 숫자
  numericValue: number;    // 애니메이션용 숫자값
  title: string;           // 제목
  desc: string;            // 설명
  detail?: string;         // 상세 정보 (클릭 시 표시)
  icon: string;            // 이모지 아이콘
  color: string;           // Tailwind 그라데이션 클래스
  bgColor: string;         // 배경색 클래스
  borderColor: string;     // 테두리색 클래스
  suffix: string;          // 숫자 뒤 단위
}
```

**특징:**
- 카운터 애니메이션 내장
- 클릭으로 상세 정보 토글
- 호버 시 글로우 효과

### PolicyCard

**목적**: 3D 호버 효과가 있는 정책 카드

```jsx
<PolicyCard policy={policy} />
```

**Props:**
```typescript
interface PolicyItem {
  icon: string;    // 이모지 아이콘
  title: string;   // 정책 제목
  desc: string;    // 정책 설명
  color: string;   // 그라데이션 색상
}
```

**특징:**
- 마우스 추적 3D 회전 효과
- GPU 가속 최적화
- 자연스러운 마우스 인터랙션

### SocialProofStat

**목적**: 통계 수치를 카운터 애니메이션과 함께 표시

```jsx
<SocialProofStat stat={stat} index={index} />
```

**Props:**
```typescript
interface StatItem {
  value: number;   // 숫자 값
  suffix: string;  // 접미사 (%, +, /7 등)
  label: string;   // 라벨 텍스트
}
```

## 🎭 애니메이션 설정

### 이징 함수

**easeOutQuart**: 카운터 애니메이션에 사용
```javascript
const easeOutQuart = 1 - Math.pow(1 - progress, 4);
```

**특징**: 빠르게 시작해서 천천히 감속

### 트랜지션 타이밍

```css
/* 기본 호버 효과 */
transition-all duration-300

/* 카드 호버 효과 */
transition-all duration-500

/* 페이드인 애니메이션 */
transition-all duration-1000
```

## 🖱️ 이벤트 핸들러

### 3D 호버 효과 계산

```jsx
const handleMouseMove = (e) => {
  const card = cardRef.current;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;  // Y축 회전
  const rotateY = (centerX - x) / 10;  // X축 회전
  
  setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
};
```

**조정 가능한 값:**
- `/10`: 회전 강도 (값이 작을수록 더 강한 회전)
- `1000px`: Perspective 거리
- `1.05`: 스케일 비율

## 📱 반응형 브레이크포인트

```css
/* 모바일 */
@media (max-width: 768px) {
  /* 3D 효과 비활성화 권장 */
  /* 카드 그리드: grid-cols-1 */
}

/* 태블릿 */
@media (min-width: 768px) {
  /* 카드 그리드: md:grid-cols-2 또는 md:grid-cols-3 */
}

/* 데스크톱 */
@media (min-width: 1024px) {
  /* 카드 그리드: lg:grid-cols-4 */
  /* 모든 효과 활성화 */
}
```

## 🔄 상태 관리

### 로컬 상태 (useState)

```jsx
// 카운터 애니메이션
const [count, setCount] = useState(start);

// 가시성 상태
const [isVisible, setIsVisible] = useState(false);

// 3D 변환 상태
const [transform, setTransform] = useState('');

// 확장 상태
const [isExpanded, setIsExpanded] = useState(false);
```

### ref 관리 (useRef)

```jsx
// DOM 요소 참조
const ref = useRef();
const cardRef = useRef();
const countRef = useRef();
```

## ⚡ 성능 최적화 팁

### 1. IntersectionObserver 사용
- 스크롤 이벤트 대신 사용으로 성능 향상
- threshold 값 조정으로 트리거 시점 최적화

### 2. requestAnimationFrame 활용
- 브라우저 렌더링 주기에 맞춘 애니메이션
- 60fps 부드러운 애니메이션 보장

### 3. CSS transform 사용
- GPU 가속 활용
- layout, paint 단계 건너뛰기

### 4. 메모리 누수 방지
```jsx
useEffect(() => {
  // Observer 설정
  return () => {
    // Cleanup 함수로 observer 해제
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
}, []);
```

## 🧪 테스트 고려사항

### 1. 브라우저 호환성
- IntersectionObserver 지원 여부 확인
- CSS transform3d 지원 확인

### 2. 성능 테스트
- 다중 애니메이션 동시 실행 시 프레임 드롭 확인
- 메모리 사용량 모니터링

### 3. 접근성
- `prefers-reduced-motion` 미디어 쿼리 고려
- 키보드 네비게이션 지원

## 📊 디버깅 가이드

### 애니메이션 디버깅
```jsx
// 개발 모드에서 디버그 정보 출력
if (process.env.NODE_ENV === 'development') {
  console.log('Animation progress:', progress);
  console.log('Current count:', count);
}
```

### 3D 효과 디버깅
```jsx
// 마우스 위치와 회전값 출력
console.log('Mouse:', { x, y });
console.log('Rotation:', { rotateX, rotateY });
```

---

**마지막 업데이트**: 2025년 10월 3일  
**문서 버전**: v1.0