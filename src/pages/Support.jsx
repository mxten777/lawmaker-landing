import React from 'react';
import { Link } from 'react-router-dom';

const Support = () => {
  const faqs = [
    {
      question: '정치후원금은 어떻게 기부할 수 있나요?',
      answer: '정치후원금센터(give.go.kr)를 통해서만 합법적으로 기부하실 수 있습니다. 개인이 직접 현금이나 계좌이체로 후원금을 전달하는 것은 불법입니다.'
    },
    {
      question: '후원 한도는 얼마인가요?',
      answer: '개인은 연간 200만원까지, 법인은 연간 1억원까지 정치후원금을 기부할 수 있습니다. 자세한 내용은 정치후원금센터에서 확인하실 수 있습니다.'
    },
    {
      question: '후원금은 세액공제가 되나요?',
      answer: '네, 정치후원금은 소득세법에 따라 세액공제 혜택을 받으실 수 있습니다. 후원 시 발급되는 기부금영수증을 보관하시기 바랍니다.'
    },
    {
      question: '후원금은 어떻게 사용되나요?',
      answer: '모든 정치후원금은 투명하게 공개되며, 의정활동 및 지역 발전을 위한 정책 연구, 시민과의 소통 활동 등에 사용됩니다.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            정치후원 안내
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            투명하고 합법적인 방법으로 정치후원에 참여하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-accent-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.464-.833-2.464 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-accent-800 mb-2">
                  중요 안내사항
                </h3>
                <p className="text-accent-700">
                  정치후원금은 반드시 <strong>정치후원금센터(give.go.kr)</strong>를 통해서만 기부하실 수 있습니다. 
                  개인적인 계좌이체나 현금 전달은 불법이며, 저희는 이러한 방식의 후원을 받지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Support */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              후원 방법
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              간단한 절차로 합법적으로 정치후원에 참여하실 수 있습니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                정치후원금센터 접속
              </h3>
              <p className="text-gray-600">
                give.go.kr에 접속하여 회원가입 후 로그인합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                후원 대상 검색
              </h3>
              <p className="text-gray-600">
                "김의원" 또는 소속 정당을 검색하여 후원 대상을 선택합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                후원금 기부
              </h3>
              <p className="text-gray-600">
                후원 금액을 입력하고 결제를 완료합니다.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://give.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              정치후원금센터 바로가기
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Support Guidelines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              후원 안내사항
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">후원 한도</h3>
              <p className="text-gray-600 text-sm">
                개인: 연간 200만원<br />
                법인: 연간 1억원
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">합법성</h3>
              <p className="text-gray-600 text-sm">
                정치후원금센터를 통한<br />
                투명하고 합법적인 후원
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">세액공제</h3>
              <p className="text-gray-600 text-sm">
                소득세법에 따른<br />
                세액공제 혜택 제공
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">투명성</h3>
              <p className="text-gray-600 text-sm">
                모든 후원금 내역<br />
                공개 및 투명한 사용
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              자주 묻는 질문
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q. {faq.question}
                </h3>
                <p className="text-gray-600">
                  A. {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for More Info */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            더 자세한 문의사항이 있으신가요?
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            정치후원에 대한 궁금한 점이 있으시면 언제든지 연락주세요.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;