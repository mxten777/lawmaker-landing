import React, { forwardRef } from 'react';

/**
 * FormButton: 폼 제출/액션 버튼, forwardRef, type/aria/width 등 props 확장
 * @param {string} type - button 타입 (submit, button, reset)
 * @param {boolean} loading - 로딩 상태
 * @param {boolean} fullWidth - 전체 너비 여부
 * @param {string} ariaLabel - 접근성 라벨
 * @param {string} className - 추가 클래스
 * @param {object} rest - 기타 props
 */
const FormButton = forwardRef(({
  children,
  loading = false,
  type = 'submit',
  fullWidth = true,
  ariaLabel,
  className = '',
  ...rest
}, ref) => (
  <button
    ref={ref}
    type={type}
    aria-label={ariaLabel}
    disabled={loading || rest.disabled}
    className={`${fullWidth ? 'w-full' : ''} py-3 px-6 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 ${
      loading
        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
        : 'bg-primary-600 hover:bg-primary-700 text-white'
    } ${className}`}
    {...rest}
  >
    {loading ? '제출 중...' : children}
  </button>
));

export default FormButton;
