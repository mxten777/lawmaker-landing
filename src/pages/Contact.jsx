import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// ...existing code...
import { submitContact } from '../utils/firestore';
import FormField from '../components/ui/FormField';
import FormCheckbox from '../components/ui/FormCheckbox';
import FormButton from '../components/ui/FormButton';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, '이름은 2글자 이상 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  phone: z.string().optional(),
  category: z.string().min(1, '문의 유형을 선택해주세요'),
  subject: z.string().min(5, '제목은 5글자 이상 입력해주세요'),
  message: z.string().min(10, '내용은 10글자 이상 입력해주세요'),
  privacyConsent: z.boolean().refine(val => val === true, '개인정보 처리방침에 동의해주세요'),
  newsletterConsent: z.boolean().optional()
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await submitContact(data);
      if (result.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert('문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: '', label: '문의 유형을 선택해주세요' },
    { value: '정책제안', label: '정책 제안' },
    { value: '지역현안', label: '지역 현안' },
    { value: '의정활동', label: '의정활동 문의' },
    { value: '민원', label: '민원 상담' },
    { value: '기타', label: '기타' }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              소통
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              시민의 목소리에 귀 기울입니다. 언제든지 편하게 연락주세요.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              연락처 정보
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  국회의원 사무실
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-900">서울특별시 영등포구 의사당대로 1</p>
                      <p className="text-gray-600">국회의원회관 XXX호</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-gray-900">02-788-XXXX</p>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-900">office@lawmaker.kr</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  지역 사무소
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-900">○○시 ○○구 ○○로 123</p>
                      <p className="text-gray-600">○○빌딩 3층</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-gray-900">031-XXX-XXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  응답 시간
                </h3>
                <p className="text-primary-700">
                  온라인 문의사항은 영업일 기준 2-3일 내에 답변드립니다. 
                  긴급한 사안은 전화로 연락주시기 바랍니다.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                온라인 문의
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-700">
                      문의가 성공적으로 제출되었습니다. 빠른 시일 내에 답변드리겠습니다.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  label="이름"
                  id="name"
                  required
                  register={register('name')}
                  error={errors.name}
                  placeholder="이름을 입력해주세요"
                />
                <FormField
                  label="이메일"
                  id="email"
                  type="email"
                  required
                  register={register('email')}
                  error={errors.email}
                  placeholder="example@email.com"
                />
                <FormField
                  label="연락처"
                  id="phone"
                  type="tel"
                  register={register('phone')}
                  error={errors.phone}
                  placeholder="010-0000-0000"
                />
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    문의 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    {...register('category')}
                    aria-invalid={!!errors.category}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={errors.category ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.category && (
                      <p id="category-error" className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </motion.div>
                </div>
                <FormField
                  label="제목"
                  id="subject"
                  required
                  register={register('subject')}
                  error={errors.subject}
                  placeholder="문의 제목을 입력해주세요"
                />
                <FormField
                  label="내용"
                  id="message"
                  as="textarea"
                  required
                  register={register('message')}
                  error={errors.message}
                  placeholder="문의 내용을 자세히 입력해주세요"
                  rows={6}
                />
                <FormCheckbox
                  id="privacyConsent"
                  label={<span>개인정보 수집 및 이용에 동의합니다. <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline">개인정보처리방침 보기</a></span>}
                  required
                  register={register('privacyConsent')}
                  error={errors.privacyConsent}
                />
                <FormCheckbox
                  id="newsletterConsent"
                  label="의정활동 소식을 이메일로 받아보겠습니다. (선택)"
                  register={register('newsletterConsent')}
                  error={errors.newsletterConsent}
                />
                <FormButton loading={isSubmitting}>문의 제출</FormButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;