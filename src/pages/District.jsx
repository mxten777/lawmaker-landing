import React from 'react';
import { Link } from 'react-router-dom';

const District = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            지역구 안내
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            저희 지역구의 주요 정보와 사무소 위치를 안내해드립니다.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  지역구 정보
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">선거구명</h3>
                    <p className="text-gray-600">○○시 ○○구 갑</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">관할 지역</h3>
                    <p className="text-gray-600">
                      ○○동, ○○동, ○○동, ○○동<br />
                      (총 4개 행정동)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">인구</h3>
                    <p className="text-gray-600">약 12만명 (2024년 기준)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">주요 특징</h3>
                    <p className="text-gray-600">
                      주거 지역과 상업 지역이 조화를 이루며,<br />
                      교육 시설과 문화 시설이 잘 갖춰진 지역
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-8 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.4!2d126.9!3d37.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMwJzAwLjAiTiAxMjbCsDU0JzAwLjAiRQ!5e0!3m2!1sko!2skr!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              사무소 안내
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              언제든지 방문하여 상담받으실 수 있습니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* National Assembly Office */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-900">평일 09:00 - 18:00</p>
                </div>
              </div>
            </div>

            {/* Local Office */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-900">평일 09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              방문 전 미리 연락주시면 더욱 원활한 상담을 받으실 수 있습니다.
            </p>
            <Link
              to="/contact"
              className="btn-primary"
            >
              온라인 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default District;