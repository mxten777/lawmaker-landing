# UI 컴포넌트 문서화

이 문서는 주요 공통 UI 컴포넌트의 사용법, props, 예시를 정리합니다.

## FormField
- **설명:** 폼 입력 필드(라벨, 에러, 애니메이션 포함)
- **Props:**
  - `label` (string): 라벨 텍스트
  - `name` (string): 폼 필드명
  - `type` (string): 입력 타입 (예: text, email)
  - `register` (function): react-hook-form register
  - `error` (string): 에러 메시지
  - `...rest`: 기타 input 속성
- **예시:**
  ```jsx
  <FormField label="이름" name="name" type="text" register={register} error={errors.name?.message} />
  ```

## FormCheckbox
- **설명:** 체크박스(라벨, 에러, 애니메이션 포함)
- **Props:**
  - `label` (string): 라벨 텍스트
  - `name` (string): 폼 필드명
  - `register` (function): react-hook-form register
  - `error` (string): 에러 메시지
  - `...rest`: 기타 input 속성
- **예시:**
  ```jsx
  <FormCheckbox label="개인정보 동의" name="privacy" register={register} error={errors.privacy?.message} />
  ```

## FormButton
- **설명:** 폼 제출/일반 버튼(로딩, 애니메이션 포함)
- **Props:**
  - `type` (string): button 타입 (submit 등)
  - `loading` (bool): 로딩 상태
  - `children` (node): 버튼 텍스트/아이콘
  - `...rest`: 기타 button 속성
- **예시:**
  ```jsx
  <FormButton type="submit" loading={isSubmitting}>제출</FormButton>
  ```

## Layout, Header, Footer
- **설명:** 전체 레이아웃/헤더/푸터 컴포넌트
- **사용:**
  ```jsx
  <Layout>
    <Header />
    {/* 페이지 내용 */}
    <Footer />
  </Layout>
  ```

---

> 추가 컴포넌트는 docs/ui-components.md에 계속 문서화하세요.
