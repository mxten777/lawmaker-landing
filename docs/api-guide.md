# API/데이터 구조 가이드

이 문서는 Firestore 컬렉션 구조, 주요 데이터 흐름, API 사용법을 정리합니다.

## Firestore 컬렉션 구조

- `pages`: 페이지 컨텐츠 (소개, 정책 등)
- `news`: 뉴스/활동
- `pledges`: 공약
- `contacts`: 문의 내역
- `volunteers`: 자원봉사 신청

### 예시: contacts 컬렉션
```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "message": "문의 내용",
  "createdAt": "2025-09-19T12:00:00Z"
}
```

### 예시: pledges 컬렉션
```json
{
  "title": "일자리 창출",
  "description": "청년 일자리 1만개 창출",
  "category": "경제",
  "createdAt": "2025-09-19T12:00:00Z"
}
```

## 주요 데이터 흐름
- 폼 제출(Contact/Volunteer) → Firestore 저장 → 관리자 대시보드 실시간 반영
- 뉴스/공약/소개 등은 Firestore에서 읽어와 페이지에 표시

## API/유틸 함수 예시
- `getPledges()`, `getNews()`, `submitContact()`, `submitVolunteer()` 등 utils/firestore.js 참고

---

> 컬렉션/필드 추가 시 이 문서에 예시와 구조를 계속 업데이트하세요.
