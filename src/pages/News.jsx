import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getNews } from '../utils/firestore';

// Import images for proper bundling
import newsPlaceholder from '/images/news-placeholder.svg';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample news data for fallback
  const sampleNews = [
    {
      id: 'news-1',
      title: '지역 발전을 위한 예산 확보 성공',
      summary: '내년도 예산안에 지역 인프라 개선을 위한 200억원 규모의 예산을 성공적으로 반영했습니다.',
      body: '국정감사와 예산안 심의 과정에서 지역구의 현안사업들이 차질없이 추진될 수 있도록 관련 예산을 확보했습니다...',
      coverImage: null,
      sourceUrl: null,
      publishedAt: new Date('2024-09-18'),
      category: '예산'
    },
    {
      id: 'news-2',
      title: '청년 일자리 박람회 성공적 개최',
      summary: '지역 청년들의 취업 지원을 위한 일자리 박람회를 성공적으로 개최했습니다.',
      body: '총 50개 기업이 참여하여 500여개의 일자리를 제공했으며, 현장에서 200명이 넘는 청년들이 면접 기회를 얻었습니다...',
      coverImage: null,
      sourceUrl: null,
      publishedAt: new Date('2024-09-15'),
      category: '행사'
    },
    {
      id: 'news-3',
      title: '교육청과 협력하여 학교 시설 개선 추진',
      summary: '지역 교육 환경 개선을 위해 교육청과 협력 방안을 논의했습니다.',
      body: '노후 학교 시설 개선과 디지털 교육 인프라 구축을 위한 구체적인 계획을 수립했습니다...',
      coverImage: null,
      sourceUrl: null,
      publishedAt: new Date('2024-09-12'),
      category: '교육'
    },
    {
      id: 'news-4',
      title: '복지센터 신설 부지 확정',
      summary: '어르신과 소외계층을 위한 복지센터 신설 부지가 최종 확정되었습니다.',
      body: '지역주민들의 오랜 숙원사업이었던 복지센터 건립이 본격화됩니다...',
      coverImage: null,
      sourceUrl: null,
      publishedAt: new Date('2024-09-10'),
      category: '복지'
    },
    {
      id: 'news-5',
      title: '환경보호 정책 토론회 참석',
      summary: '지속가능한 지역 발전을 위한 환경보호 정책 토론회에 참석했습니다.',
      body: '탄소중립 실현과 친환경 교통 시스템 구축 방안에 대해 논의했습니다...',
      coverImage: null,
      sourceUrl: null,
      publishedAt: new Date('2024-09-08'),
      category: '환경'
    },
    {
      id: 'news-6',
      title: '소상공인 지원 정책 간담회',
      summary: '코로나19로 어려움을 겪는 소상공인들과의 간담회를 가졌습니다.',
      body: '현장의 생생한 목소리를 듣고 실효성 있는 지원 방안을 모색했습니다...',
      coverImage: null,
      sourceUrl: null,
      publishedAt: new Date('2024-09-05'),
      category: '경제'
    }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews(20); // Get latest 20 news items
        if (data && data.length > 0) {
          setNews(data);
        } else {
          // Use sample data if no Firestore data
          setNews(sampleNews);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Use sample data as fallback
        setNews(sampleNews);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
  <div className="bg-white">
      {/* Header */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              최신 소식
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              의정활동과 지역 현안에 대한 최신 소식을 전해드립니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured News */}
      {news.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:grid lg:grid-cols-2 lg:gap-12 items-center"
            >
              <div>
                <div className="text-sm text-primary-600 font-semibold mb-2">
                  {news[0].category || '주요 소식'}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {news[0].title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {news[0].summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    {new Date(news[0].publishedAt?.toDate?.() || news[0].publishedAt).toLocaleDateString('ko-KR')}
                  </span>
                  <Link
                    to={`/news/${news[0].id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    자세히 읽기 →
                  </Link>
                </div>
              </div>
              <div>
                <img
                  className="w-full h-96 object-cover rounded-xl shadow-elevation-xl"
                  src={news[0].coverImage || newsPlaceholder}
                  alt={news[0].title}
                  onError={(e) => {
                    e.target.src = newsPlaceholder;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              전체 소식
            </h2>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.slice(1).map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card overflow-hidden hover:shadow-elevation-xl transition-shadow duration-300"
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
                    {item.category && (
                      <div className="text-sm text-primary-600 font-semibold mb-2">
                        {item.category}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
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
              ))}
            </div>
          )}

          {news.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                아직 등록된 소식이 없습니다
              </h3>
              <p className="text-gray-600">
                새로운 소식이 등록되면 알려드리겠습니다.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            소식을 놓치지 마세요
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            중요한 의정활동과 지역 소식을 이메일로 받아보세요.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="btn btn-primary-outline"
            >
              소식받기 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;