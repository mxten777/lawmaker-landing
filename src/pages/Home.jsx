import React from 'react';

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-5 leading-tight">
            김의원과 함께하는<br />더 나은 미래
          </h1>
          <p className="text-xl mb-10 opacity-90">
            투명하고 책임감 있는 정치로 지역 발전과 시민 복리 증진에 앞장서겠습니다.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <button className="bg-white text-indigo-600 px-8 py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              공약 보기
            </button>
            <button className="bg-transparent text-white px-8 py-4 text-lg font-bold border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600 transition-all">
              후원하기
            </button>
          </div>
        </div>
      </section>

      {/* 주요 성과 섹션 */}
      <section className="py-20 px-5 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-15 text-gray-800">
            주요 성과
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { number: '200억원', title: '지역 발전 예산 확보', desc: '도로 인프라, 교육시설 현대화 등' },
              { number: '15개', title: '주요 정책 법안 발의', desc: '청년 고용, 복지 확대, 환경 보호' },
              { number: '500회+', title: '시민 소통 활동', desc: '타운홀 미팅, 현장 방문, 온라인 소통' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-10 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl font-bold text-indigo-600 mb-4">
                  {item.number}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* 기존 테스트 섹션을 하단에 유지 */}
        <div className="mt-15 p-5 bg-white rounded-lg border-2 border-green-500 max-w-2xl mx-auto text-center">
          <h3 className="text-green-500 mb-4 font-semibold">
            ✅ 시스템 상태
          </h3>
          <p className="text-gray-700 text-sm mb-2">
            React, Vite, Vercel 모두 정상 작동 중
          </p>
          <p className="text-gray-500 text-xs">
            현재 시간: {new Date().toLocaleString('ko-KR')}
          </p>
        </div>
      </section>

      {/* 핵심 공약 섹션 */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-15 text-gray-800">
            핵심 공약
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🏢', title: '청년 일자리 창출', desc: '스타트업 지원센터 설립 및 취업 연계 프로그램 운영' },
              { icon: '🏫', title: '교육 환경 개선', desc: '디지털 교육 인프라 구축 및 교사 역량 강화' },
              { icon: '🏥', title: '의료 서비스 확충', desc: '24시간 응급의료센터 설립 및 원격진료 확대' },
              { icon: '🌱', title: '친환경 도시 조성', desc: '탄소중립 실현 및 녹색 교통체계 구축' }
            ].map((policy, index) => (
              <div key={index} className="p-8 rounded-xl border border-gray-200 text-center bg-white hover:-translate-y-1 transition-transform cursor-pointer shadow-sm hover:shadow-lg">
                <div className="text-5xl mb-5">
                  {policy.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {policy.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {policy.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-gray-800 text-white py-20 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-5">
            함께 만들어가는 변화
          </h2>
          <p className="text-lg mb-10 opacity-90">
            여러분의 소중한 의견과 참여가 더 나은 지역사회를 만듭니다.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <button className="bg-indigo-600 text-white px-8 py-4 text-lg font-bold rounded-lg hover:bg-indigo-700 transition-colors">
              의견 제안하기
            </button>
            <button className="bg-transparent text-white px-8 py-4 text-lg font-bold border-2 border-white rounded-lg hover:bg-white hover:text-gray-800 transition-all">
              자원봉사 참여
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;