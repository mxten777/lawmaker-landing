import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * FormCheckbox: 체크박스/라디오/스위치 지원, forwardRef, aria, label, 에러 메시지 일관성 강화
 * @param {string} id - input id
 * @param {string|ReactNode} label - 라벨
 * @param {object} error - react-hook-form 에러 객체
 * @param {boolean} required - 필수 여부
 * @param {string} type - 'checkbox' | 'radio' | 'switch'
 * @param {string} className - 추가 클래스
 * @param {object} rest - 기타 props
 */
const FormCheckbox = forwardRef(({
  id,
  label,
  error,
  required = false,
  type = 'checkbox',
  className = '',
  ...rest
}, ref) => (
  <div className="mb-2">
    <label className="flex items-start cursor-pointer">
      <input
        id={id}
        ref={ref}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1 mr-3 ${className}`}
        {...rest}
      />
      <span className="text-sm text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={error ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </motion.div>
  </div>
));

export default FormCheckbox;
