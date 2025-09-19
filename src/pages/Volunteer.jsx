import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { submitVolunteer } from '../utils/firestore';
import FormField from '../components/ui/FormField';
import FormCheckbox from '../components/ui/FormCheckbox';
import FormButton from '../components/ui/FormButton';

// Validation schema
const volunteerSchema = z.object({
  name: z.string().min(2, '이름은 2글자 이상 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  phone: z.string().min(10, '연락처를 정확히 입력해주세요'),
  age: z.string().min(1, '연령대를 선택해주세요'),
  occupation: z.string().optional(),
  experience: z.string().optional(),
  motivation: z.string().min(10, '참여 동기를 10글자 이상 입력해주세요'),
  availableTime: z.array(z.string()).min(1, '가능한 시간을 최소 1개 이상 선택해주세요'),
  skills: z.array(z.string()).optional(),
  privacyConsent: z.boolean().refine(val => val === true, '개인정보 처리방침에 동의해주세요'),
  activityConsent: z.boolean().refine(val => val === true, '자원봉사 활동 동의사항에 동의해주세요')
});

const Volunteer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset
  } = useForm({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      availableTime: [],
      skills: []
    }
  });

  const watchedAvailableTime = watch('availableTime');
  const watchedSkills = watch('skills');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await submitVolunteer(data);
      if (result.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert('신청 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting volunteer:', error);
      alert('신청 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ageOptions = [
    { value: '', label: '연령대를 선택해주세요' },
    { value: '10대', label: '10대' },
    { value: '20대', label: '20대' },
    { value: '30대', label: '30대' },
    { value: '40대', label: '40대' },
    { value: '50대', label: '50대' },
    { value: '60대 이상', label: '60대 이상' }
  ];

  const timeOptions = [
    { value: '평일오전', label: '평일 오전 (9-12시)' },
    { value: '평일오후', label: '평일 오후 (1-6시)' },
    { value: '평일저녁', label: '평일 저녁 (6-9시)' },
    { value: '토요일', label: '토요일' },
    { value: '일요일', label: '일요일' }
  ];

  const skillOptions = [
    { value: 'IT', label: 'IT/컴퓨터' },
    { value: '디자인', label: '디자인/영상' },
    { value: '번역', label: '번역/통역' },
    { value: '회계', label: '회계/사무' },
    { value: '교육', label: '교육/강의' },
    { value: '운전', label: '운전' },
    { value: '의료', label: '의료/간병' },
    { value: '상담', label: '상담/심리' },
    { value: '기타', label: '기타' }
  ];

  const handleCheckboxChange = (value, field) => {
    const currentValues = getValues(field) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    setValue(field, newValues);
  };

  const activities = [
    {
      title: '선거 캠페인 지원',
      description: '선거철 유권자 접촉, 홍보물 배포, 행사 준비 등',
      icon: '📢'
    },
    {
      title: '지역 행사 지원',
      description: '주민 간담회, 정책 설명회, 지역 축제 등 행사 운영',
      icon: '🎪'
    },
    {
      title: '정책 연구 지원',
      description: '정책 자료 조사, 데이터 분석, 보고서 작성 등',
      icon: '📊'
    },
    {
      title: 'SNS/홍보 지원',
      description: '소셜미디어 관리, 콘텐츠 제작, 홍보 활동 등',
      icon: '📱'
    },
    {
      title: '민원 상담 지원',
      description: '시민 민원 접수, 상담, 안내 업무 등',
      icon: '💬'
    },
    {
      title: '사무 업무 지원',
      description: '문서 정리, 일정 관리, 기타 사무 업무 등',
      icon: '📋'
    }
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
              자원봉사
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              시민과 함께하는 정치, 여러분의 참여를 기다립니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              자원봉사 활동 분야
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              다양한 분야에서 여러분의 재능을 활용할 수 있습니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{activity.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {activity.title}
                </h3>
                <p className="text-gray-600">
                  {activity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              자원봉사 신청
            </h2>

            {submitSuccess && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700">
                    자원봉사 신청이 성공적으로 제출되었습니다. 빠른 시일 내에 연락드리겠습니다.
                  </p>
                </div>
              </div>
            )}


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Info Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">기본 정보</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    label="이름"
                    id="name"
                    required
                    register={register('name')}
                    error={errors.name}
                    placeholder="이름을 입력해주세요"
                  />
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      연령대 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="age"
                      {...register('age')}
                      aria-invalid={!!errors.age}
                      aria-describedby={errors.age ? 'age-error' : undefined}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 ${
                        errors.age ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {ageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={errors.age ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.age && (
                        <p id="age-error" className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                      )}
                    </motion.div>
                  </div>
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
                    required
                    register={register('phone')}
                    error={errors.phone}
                    placeholder="010-0000-0000"
                  />
                  <FormField
                    label="직업/소속"
                    id="occupation"
                    register={register('occupation')}
                    error={errors.occupation}
                    placeholder="직업이나 소속을 입력해주세요"
                    className="md:col-span-2"
                  />
                </div>
              </div>


              {/* Available Time */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">가능한 시간 <span className="text-red-500">*</span></h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {timeOptions.map((option) => (
                    <FormCheckbox
                      key={option.value}
                      id={`availableTime-${option.value}`}
                      label={option.label}
                      register={{
                        name: 'availableTime',
                        value: option.value,
                        checked: watchedAvailableTime.includes(option.value),
                        onChange: () => handleCheckboxChange(option.value, 'availableTime')
                      }}
                      error={null}
                    />
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={errors.availableTime ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.availableTime && (
                    <p className="mt-2 text-sm text-red-600">{errors.availableTime.message}</p>
                  )}
                </motion.div>
              </div>


              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">보유 기술/재능</h3>
                <div className="grid gap-3 md:grid-cols-3">
                  {skillOptions.map((option) => (
                    <FormCheckbox
                      key={option.value}
                      id={`skills-${option.value}`}
                      label={option.label}
                      register={{
                        name: 'skills',
                        value: option.value,
                        checked: watchedSkills.includes(option.value),
                        onChange: () => handleCheckboxChange(option.value, 'skills')
                      }}
                      error={null}
                    />
                  ))}
                </div>
              </div>


              {/* Experience */}
              <FormField
                label="자원봉사 경험"
                id="experience"
                as="textarea"
                rows={3}
                register={register('experience')}
                error={errors.experience}
                placeholder="이전 자원봉사 경험이 있다면 간단히 설명해주세요"
              />


              {/* Motivation */}
              <FormField
                label="참여 동기"
                id="motivation"
                as="textarea"
                rows={4}
                required
                register={register('motivation')}
                error={errors.motivation}
                placeholder="자원봉사에 참여하고자 하는 동기를 입력해주세요"
              />


              {/* Consent Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">동의사항</h3>
                <FormCheckbox
                  id="privacyConsent"
                  label={<span>개인정보 수집 및 이용에 동의합니다. <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline">개인정보처리방침 보기</a></span>}
                  required
                  register={register('privacyConsent')}
                  error={errors.privacyConsent}
                />
                <FormCheckbox
                  id="activityConsent"
                  label="자원봉사 활동 참여 및 관련 안내 연락에 동의합니다."
                  required
                  register={register('activityConsent')}
                  error={errors.activityConsent}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <FormButton loading={isSubmitting}>자원봉사 신청하기</FormButton>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              자원봉사 혜택
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">자원봉사 확인서</h3>
              <p className="text-gray-600">활동 시간에 따른 자원봉사 확인서 발급</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">정책 교육</h3>
              <p className="text-gray-600">정치·정책 분야 전문 교육 기회 제공</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">네트워킹</h3>
              <p className="text-gray-600">다양한 사람들과의 네트워킹 기회</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;