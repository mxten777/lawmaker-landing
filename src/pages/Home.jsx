import React, { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPledges, getNews } from '../utils/firestore';

// Import images to ensure they're bundled correctly
import candidateHero from '/images/candidate-hero.svg';
import candidateProfile from '/images/candidate-profile.svg';
import newsCommunity from '/images/news-community.svg';
import newsPolicy from '/images/news-policy.svg';
import newsPress from '/images/news-press.svg';
import newsPlaceholder from '/images/news-placeholder.svg';

const Home = () => {
  const [pledges, setPledges] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pledgesData, newsData] = await Promise.all([
          getPledges(),
          getNews(3) // Get latest 3 news items
        ]);
        setPledges(pledgesData.slice(0, 3)); // Show top 3 pledges
        setNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Seo
        title="국회의원 랜딩페이지 MVP"
        description="정치인을 위한 현대적이고 반응형 랜딩페이지. 신뢰와 소통, 정책과 소식을 한눈에!"
        image="/vite.svg"
        url={typeof window !== 'undefined' ? window.location.href : ''}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: '국회의원',
          description: '정치인을 위한 현대적이고 반응형 랜딩페이지',
          url: typeof window !== 'undefined' ? window.location.href : '',
        }}
      />
      <div className="bg-white">
  {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 section-padding">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  시민과 함께하는
                  <span className="block text-accent-400 mt-2">더 나은 미래</span>
                </h1>
                <p className="mt-8 text-xl text-gray-100 max-w-2xl leading-relaxed">
                  투명하고 책임감 있는 정치로 지역 발전과 시민 복리 증진에 앞장서겠습니다.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/pledges"
                    className="btn-primary btn-lg text-center"
                  >
                    주요 공약 보기
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-secondary btn-lg text-center"
                  >
                    의견 제안하기
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] w-full">
                  <img
                    className="w-full h-full object-cover rounded-2xl shadow-soft-xl"
                    src={candidateHero}
                    alt="후보자 사진"
                    onError={(e) => {
                      e.target.src = candidateProfile;
                    }}
                  />
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Pledges Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              핵심 공약
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              지역 발전과 시민 복리를 위한 주요 정책 방향입니다.
            </p>
          </div>

          {loading ? (
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {pledges.length > 0 ? pledges.map((pledge, index) => (
                <motion.div
                  key={pledge.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {pledge.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {pledge.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pledge.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/pledges/${pledge.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      자세히 보기 →
                    </Link>
                  </div>
                </motion.div>
              )) : (
                // Default pledge cards when no data
                [
                  {
                    title: "청년 일자리 창출",
                    summary: "지역 내 청년들을 위한 양질의 일자리 창출과 창업 지원 프로그램을 확대하겠습니다.",
                    tags: ["청년", "일자리", "창업"]
                  },
                  {
                    title: "교육 환경 개선",
                    summary: "모든 아이들이 안전하고 쾌적한 환경에서 학습할 수 있도록 교육 인프라를 개선하겠습니다.",
                    tags: ["교육", "인프라", "안전"]
                  },
                  {
                    title: "복지 서비스 확충",
                    summary: "어르신과 소외계층을 위한 복지 서비스를 확충하고 접근성을 높이겠습니다.",
                    tags: ["복지", "어르신", "소외계층"]
                  }
                ].map((pledge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="card-body">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {pledge.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {pledge.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {pledge.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to="/pledges"
                        className="text-primary-600 hover:text-primary-700 font-semibold group-hover:translate-x-1 transition-transform duration-200"
                      >
                        자세히 보기 →
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/pledges"
              className="btn-primary"
            >
              전체 공약 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              최신 소식
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              의정활동과 지역 현안에 대한 최신 소식을 전해드립니다.
            </p>
          </div>

          {loading ? (
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {news.length > 0 ? news.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={item.coverImage || newsPlaceholder}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = newsPlaceholder;
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.summary}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(item.publishedAt?.toDate?.() || item.publishedAt).toLocaleDateString('ko-KR')}
                      </span>
                      <Link
                        to={`/news/${item.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        읽기 →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )) : (
                // Default news items when no data
                [
                  {
                    title: "지역 주민과의 만남 - 1월 정기 간담회",
                    summary: "투명하고 책임감 있는 정치로 지역 발전과 시민 복리 증진에 앞장서겠습니다.",
                    date: "2025. 1. 30.",
                    image: newsCommunity
                  },
                  {
                    title: "교육예산 증액 법안 발의",
                    summary: "의정활동과 지역 현안에 대한 최신 소식을 전해드립니다.",
                    date: "2025. 2. 5.",
                    image: newsPolicy
                  },
                  {
                    title: "소상공인 지원 방안 모색",
                    summary: "의정활동과 지역 현안에 대한 최신 소식을 전해드립니다.",
                    date: "2025. 2. 10.",
                    image: newsPress
                  }
                ].map((item, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        console.log('Image failed to load:', item.image);
                        e.target.src = newsPlaceholder;
                      }}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {item.summary}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {item.date}
                        </span>
                        <Link
                          to="/news"
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          읽기 →
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/news"
              className="btn-primary"
            >
              전체 소식 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            시민과 함께 만들어가는 변화
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            여러분의 목소리가 정책이 됩니다. 지금 참여하세요.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/volunteer"
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              자원봉사 참여
            </Link>
            <Link
              to="/contact"
              className="bg-accent-600 hover:bg-accent-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              의견 제안
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;