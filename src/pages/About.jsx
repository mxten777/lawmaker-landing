import React from 'react';
import Seo from '../components/Seo';

// Import images for proper bundling
import aboutProfile from '/images/about-profile.svg';
import candidateProfile from '/images/candidate-profile.svg';

const About = () => {
  const timeline = [
    {
      year: '2024',
      title: '국회의원 당선',
      description: '시민들의 성원에 힘입어 제22대 국회의원에 당선되었습니다.'
    },
    {
      year: '2020-2024',
      title: '지역구 시의원',
      description: '4년간 시의원으로 활동하며 지역 현안 해결에 앞장섰습니다.'
    },
    {
      year: '2015-2020',
      title: '시민단체 활동',
      description: '교육과 복지 분야 시민단체에서 활발한 활동을 펼쳤습니다.'
    },
    {
      year: '2010',
      title: '대학 졸업',
      description: '행정학과를 졸업하고 공공정책 분야 전문성을 쌓았습니다.'
    }
  ];

  const values = [
    {
      title: '투명성',
      description: '모든 의정활동을 투명하게 공개하고 시민과 소통합니다.',
      icon: '🔍'
    },
    {
      title: '책임감',
      description: '약속한 공약은 반드시 실현하는 책임감 있는 정치를 실천합니다.',
      icon: '🤝'
    },
    {
      title: '혁신',
      description: '기존 틀에 얽매이지 않고 창의적이고 혁신적인 해결책을 제시합니다.',
      icon: '💡'
    },
    {
      title: '포용',
      description: '누구도 소외되지 않는 포용적인 사회를 만들어갑니다.',
      icon: '🤗'
    }
  ];

  return (
    <>
      <Seo
        title="소개 - 국회의원 랜딩페이지"
        description="정치인 프로필, 경력, 가치관을 소개합니다. 신뢰와 소통의 정치!"
        image="/images/about-profile.svg"
        url={typeof window !== 'undefined' ? window.location.href : ''}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: '국회의원',
          description: '정치인 프로필, 경력, 가치관',
          url: typeof window !== 'undefined' ? window.location.href : '',
        }}
      />
      <div className="bg-white">
  {/* Hero Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                시민과 함께하는
                <span className="block text-primary-600">정치인, 김의원</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                지난 10여 년간 시민사회와 지방정치에서 쌓은 경험을 바탕으로, 
                진정으로 시민을 위한 정치를 실현하고자 합니다. 
                투명하고 책임감 있는 의정활동을 통해 지역 발전과 시민 복리 증진에 최선을 다하겠습니다.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 lg:mt-0"
            >
              <div className="relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none">
                <img
                  className="w-full h-full object-cover rounded-xl shadow-elevation-xl"
                  src={aboutProfile}
                  alt="김의원 프로필"
                  onError={(e) => {
                    e.target.src = candidateProfile;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              정치 철학과 가치
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              정치는 시민을 위한 것이어야 한다는 신념으로 다음 가치들을 실천합니다.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center py-8"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              주요 경력
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              시민을 위한 정치를 실천해온 발자취입니다.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-300"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-center"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-elevation-lg">
                    <span className="text-white font-bold text-xs text-center leading-tight">{item.year}</span>
                  </div>
                  {/* Content */}
                  <div className="ml-8 card flex-grow min-h-[120px] flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              연락처 정보
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              언제든지 편하게 연락주세요. 시민의 목소리에 귀 기울이겠습니다.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card text-center py-8"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">국회의원 사무실</h3>
              <p className="text-gray-600">
                서울특별시 영등포구 의사당대로 1<br />
                국회의원회관 XXX호
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card text-center py-8"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">전화 문의</h3>
              <p className="text-gray-600">
                전화: 02-788-XXXX<br />
                팩스: 02-788-XXXX
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card text-center py-8"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">이메일</h3>
              <p className="text-gray-600">
                office@lawmaker.kr<br />
                김의원 공식 이메일
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default About;