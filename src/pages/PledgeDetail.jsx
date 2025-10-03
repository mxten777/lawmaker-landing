import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPledgeById } from '../utils/firestore';

// Import placeholder image
import newsPlaceholder from '/images/news-placeholder.svg';

const PledgeDetail = () => {
  const { id } = useParams();
  const [pledge, setPledge] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample pledge data for fallback
  const samplePledges = {
    'pledge-1': {
      id: 'pledge-1',
      title: '청년 일자리 창출 프로젝트',
      summary: '지역 내 청년들을 위한 양질의 일자리 창출과 창업 지원 프로그램을 확대하여 청년 실업률을 줄이고 지역 경제를 활성화하겠습니다.',
      detail: `
        <h3>추진 배경</h3>
        <p>지역 청년 실업률이 전국 평균을 상회하고 있으며, 양질의 일자리 부족으로 인한 청년 인구 유출이 심각한 상황입니다. 이를 해결하기 위해 체계적이고 종합적인 청년 일자리 창출 정책이 필요합니다.</p>
        
        <h3>주요 추진 사업</h3>
        <ul>
          <li><strong>청년 인턴십 프로그램:</strong> 지역 기업과 연계하여 6개월간 인턴십 기회 제공, 정규직 전환율 70% 이상 목표</li>
          <li><strong>창업 지원센터 설립:</strong> 창업 교육, 멘토링, 사무공간 제공하는 종합 창업 지원센터 구축</li>
          <li><strong>청년 창업 자금 지원:</strong> 무이자·저금리 창업 자금 지원, 최대 5천만원까지 지원</li>
          <li><strong>디지털 역량 강화:</strong> AI, 빅데이터 등 4차 산업혁명 시대 필수 역량 교육 프로그램 운영</li>
        </ul>
        
        <h3>기대 효과</h3>
        <p>향후 5년간 2,000개의 청년 일자리 창출과 500개의 청년 창업 기업 육성을 목표로 합니다. 이를 통해 지역 경제 활성화와 청년 정착률 향상을 기대합니다.</p>
        
        <h3>추진 일정</h3>
        <ul>
          <li>2024년 하반기: 창업 지원센터 부지 확보 및 설계</li>
          <li>2025년 상반기: 창업 지원센터 건립 착공</li>
          <li>2025년 하반기: 청년 인턴십 프로그램 시범 운영</li>
          <li>2026년: 창업 지원센터 개소 및 본격 운영</li>
        </ul>
      `,
      tags: ['청년', '일자리', '창업', '경제'],
      coverImage: null,
      createdAt: new Date()
    }
  };

  useEffect(() => {
    const fetchPledge = async () => {
      try {
        const data = await getPledgeById(id);
        if (data) {
          setPledge(data);
        } else {
          // Use sample data if no Firestore data
          setPledge(samplePledges[id] || null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pledge:', error);
        // Use sample data as fallback
        setPledge(samplePledges[id] || null);
        setLoading(false);
      }
    };

    fetchPledge();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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

  if (!pledge) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            공약을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-8">
            요청하신 공약 페이지가 존재하지 않습니다.
          </p>
          <Link
            to="/pledges"
            className="btn-primary"
          >
            공약 목록으로 돌아가기
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
            <Link to="/pledges" className="hover:text-primary-600">공약</Link>
            <span>/</span>
            <span className="text-gray-900">{pledge.title}</span>
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
            <div className="flex flex-wrap gap-2 mb-6">
              {pledge.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {pledge.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {pledge.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {pledge.coverImage && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                src={pledge.coverImage}
                alt={pledge.title}
                onError={(e) => {
                  e.target.src = newsPlaceholder;
                }}
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
            {pledge.detail ? (
              <div dangerouslySetInnerHTML={{ __html: pledge.detail }} />
            ) : (
              <div>
                <h3>상세 내용</h3>
                <p>
                  이 공약에 대한 자세한 내용은 추후 업데이트될 예정입니다. 
                  궁금한 사항이 있으시면 언제든지 문의해주세요.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            이 공약에 대해 어떻게 생각하시나요?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary"
            >
              의견 제안하기
            </Link>
            <Link
              to="/volunteer"
              className="btn-secondary"
            >
              함께 참여하기
            </Link>
            <Link
              to="/pledges"
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              다른 공약 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">이 공약을 공유하세요</span>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: pledge.title,
                      text: pledge.summary,
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default PledgeDetail;