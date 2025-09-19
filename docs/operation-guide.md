# 운영 가이드

이 문서는 서비스 운영, 배포, 보안, 장애 대응 등 실무 운영 체크리스트를 정리합니다.

## 배포 및 운영
- Vercel에 GitHub 연동, main 브랜치 push 시 자동 배포
- 환경 변수(Vercel 대시보드) 필수 입력
- 배포 후 robots.txt, sitemap.xml, SEO/OG 태그 정상 반영 확인

## 보안 체크리스트
- Firebase 보안 규칙 최신화 (읽기/쓰기 제한)
- 개인정보 수집/이용 동의 체크박스 필수
- X-Frame-Options, Content-Security-Policy 등 헤더 적용

## 장애/이슈 대응
- Firebase 콘솔에서 실시간 로그/오류 확인
- Vercel 배포 실패 시 로그 확인 및 롤백
- 폼/DB 장애 시 관리자 대시보드에서 수동 확인 가능

## 운영 팁
- Google Analytics, GA4 등 트래픽 분석 주기적 확인
- 주요 정책/뉴스/공약 등은 Firestore에서 실시간 수정 가능
- 문의/자원봉사 등 민감 데이터는 주기적 백업 권장

---

> 운영 중 새롭게 발견된 노하우, 체크리스트는 이 문서에 계속 추가하세요.
