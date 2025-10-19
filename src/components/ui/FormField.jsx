import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * FormField: 범용 폼 필드 컴포넌트 (input, textarea, select 지원)
 * @param {string} label - 라벨 텍스트
 * @param {string} id - input id
 * @param {string} type - input type (text, email 등)
 * @param {object} error - react-hook-form 에러 객체
 * @param {boolean} required - 필수 여부
 * @param {string} as - 'input' | 'textarea' | 'select'
 * @param {string} className - 추가 클래스
 * @param {object} children - select 옵션 등
 * @param {object} rest - 기타 props
 */
const FormField = forwardRef(({
  label,
  id,
  type = 'text',
  error,
  required = false,
  as = 'input',
  className = '',
  children,
  ...rest
}, ref) => {
  const sharedProps = {
    id,
    ref,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${className}`,
    ...rest
  };

  let FieldComponent = null;
  if (as === 'textarea') {
    FieldComponent = <textarea {...sharedProps} />;
  } else if (as === 'select') {
    FieldComponent = <select {...sharedProps}>{children}</select>;
  } else {
    FieldComponent = <input type={type} {...sharedProps} />;
  }

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {FieldComponent}
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
  );
});

export default FormField;
