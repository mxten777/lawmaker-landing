import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getNewsById } from '../utils/firestore';

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample news data for fallback
  const sampleNews = {
    'news-1': {
      id: 'news-1',
      title: '지역 발전을 위한 예산 확보 성공',
      summary: '내년도 예산안에 지역 인프라 개선을 위한 200억원 규모의 예산을 성공적으로 반영했습니다.',
      body: `
        <h3>예산 확보 배경</h3>
        <p>지역구의 오랜 숙원사업들이 예산 부족으로 인해 지연되고 있는 상황에서, 국정감사와 예산안 심의 과정을 통해 관련 예산을 확보하는 데 총력을 기울였습니다.</p>
        
        <h3>확보된 주요 예산</h3>
        <ul>
          <li><strong>도로 인프라 개선:</strong> 80억원 - 지역 내 주요 도로 확장 및 정비</li>
          <li><strong>교육 시설 현대화:</strong> 50억원 - 노후 학교 시설 개선 및 디지털 교육 환경 구축</li>
          <li><strong>복지센터 건립:</strong> 40억원 - 어르신 및 소외계층을 위한 복지시설 신설</li>
          <li><strong>환경 개선 사업:</strong> 30억원 - 공원 조성 및 친환경 시설 확충</li>
        </ul>
        
        <h3>기대 효과</h3>
        <p>이번 예산 확보를 통해 지역 주민들의 삶의 질이 크게 향상될 것으로 기대됩니다. 특히 교통 편의성 개선과 교육 환경 개선을 통해 지역의 경쟁력을 높일 수 있을 것입니다.</p>
        
        <h3>향후 계획</h3>
        <p>확보된 예산이 계획대로 집행될 수 있도록 지속적으로 모니터링하고, 지역 주민들과 소통하며 사업을 추진해나가겠습니다.</p>
      `,
      coverImage: null,
      sourceUrl: null,
      publishedAt: new Date('2024-09-18'),
      category: '예산'
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(id);
        if (data) {
          setNewsItem(data);
        } else {
          // Use sample data if no Firestore data
          setNewsItem(sampleNews[id] || null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Use sample data as fallback
        setNewsItem(sampleNews[id] || null);
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            소식을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-8">
            요청하신 소식 페이지가 존재하지 않습니다.
          </p>
          <Link
            to="/news"
            className="btn-primary"
          >
            소식 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">홈</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-primary-600">소식</Link>
            <span>/</span>
            <span className="text-gray-900">{newsItem.title}</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {newsItem.category && (
              <div className="text-primary-600 font-semibold mb-4">
                {newsItem.category}
              </div>
            )}
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {newsItem.title}
            </h1>
            
            <div className="flex items-center justify-between text-gray-600 mb-8">
              <div className="flex items-center space-x-4">
                <span>
                  {new Date(newsItem.publishedAt?.toDate?.() || newsItem.publishedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {newsItem.sourceUrl && (
                  <a
                    href={newsItem.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    원문 보기
                  </a>
                )}
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: newsItem.title,
                      text: newsItem.summary,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('링크가 복사되었습니다.');
                  }
                }}
                className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {newsItem.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {newsItem.coverImage && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                src={newsItem.coverImage}
                alt={newsItem.title}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg max-w-none"
            style={{
              '--tw-prose-headings': '#1f2937',
              '--tw-prose-body': '#374151',
              '--tw-prose-bullets': '#3b82f6',
              '--tw-prose-counters': '#3b82f6',
            }}
          >
            {newsItem.body ? (
              <div dangerouslySetInnerHTML={{ __html: newsItem.body }} />
            ) : (
              <div>
                <h3>상세 내용</h3>
                <p>
                  이 소식에 대한 자세한 내용은 추후 업데이트될 예정입니다. 
                  궁금한 사항이 있으시면 언제든지 문의해주세요.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            더 많은 의정활동을 확인하세요
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pledges"
              className="btn-primary"
            >
              주요 공약 보기
            </Link>
            <Link
              to="/contact"
              className="btn-secondary"
            >
              의견 제안하기
            </Link>
            <Link
              to="/news"
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              다른 소식 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Previous/Next Navigation */}
      <section className="py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="flex-1">
              {/* This would be populated with actual previous/next news items */}
              <Link
                to="/news"
                className="text-gray-600 hover:text-primary-600 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                이전 소식
              </Link>
            </div>
            <div className="flex-1 text-right">
              <Link
                to="/news"
                className="text-gray-600 hover:text-primary-600 flex items-center justify-end"
              >
                다음 소식
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;