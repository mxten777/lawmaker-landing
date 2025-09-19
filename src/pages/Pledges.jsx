import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPledges } from '../utils/firestore';

const Pledges = () => {
  const [pledges, setPledges] = useState([]);
  const [filteredPledges, setFilteredPledges] = useState([]);
  const [selectedTag, setSelectedTag] = useState('전체');
  const [loading, setLoading] = useState(true);

  // Sample pledges data for fallback
  const samplePledges = [
    {
      id: 'pledge-1',
      title: '청년 일자리 창출 프로젝트',
      summary: '지역 내 청년들을 위한 양질의 일자리 창출과 창업 지원 프로그램을 확대하여 청년 실업률을 줄이고 지역 경제를 활성화하겠습니다.',
      detail: '구체적으로 지역 기업과의 연계를 통한 인턴십 프로그램, 창업 지원센터 설립, 청년 창업 자금 지원 등을 추진하겠습니다.',
      tags: ['청년', '일자리', '창업', '경제'],
      coverImage: null,
      createdAt: new Date()
    },
    {
      id: 'pledge-2',
      title: '교육 환경 혁신',
      summary: '모든 아이들이 안전하고 쾌적한 환경에서 학습할 수 있도록 교육 인프라를 개선하고 디지털 교육 환경을 구축하겠습니다.',
      detail: '노후 학교 시설 개선, 스마트 교실 구축, 교육 격차 해소를 위한 프로그램 등을 통해 교육의 질을 높이겠습니다.',
      tags: ['교육', '인프라', '안전', '디지털'],
      coverImage: null,
      createdAt: new Date()
    },
    {
      id: 'pledge-3',
      title: '복지 서비스 확충',
      summary: '어르신과 소외계층을 위한 복지 서비스를 확충하고 접근성을 높여 모든 시민이 기본적인 삶의 질을 보장받을 수 있도록 하겠습니다.',
      detail: '경로당 및 복지센터 확충, 찾아가는 복지 서비스, 장애인 편의시설 개선 등을 통해 포용적인 지역사회를 만들겠습니다.',
      tags: ['복지', '어르신', '소외계층', '포용'],
      coverImage: null,
      createdAt: new Date()
    },
    {
      id: 'pledge-4',
      title: '친환경 교통 시스템',
      summary: '대중교통 확충과 친환경 교통수단 도입으로 교통 편의성을 높이고 환경 보호에 기여하겠습니다.',
      detail: '전기버스 도입, 자전거 도로 확충, 공유 모빌리티 서비스 도입 등을 통해 지속가능한 교통 체계를 구축하겠습니다.',
      tags: ['교통', '환경', '대중교통', '지속가능'],
      coverImage: null,
      createdAt: new Date()
    },
    {
      id: 'pledge-5',
      title: '문화·체육 시설 확충',
      summary: '시민들의 문화생활과 건강한 여가 활동을 위한 문화·체육 시설을 확충하고 프로그램을 다양화하겠습니다.',
      detail: '도서관 및 문화센터 신설, 체육 시설 현대화, 지역 축제 및 문화 행사 지원 등을 통해 문화 도시를 만들겠습니다.',
      tags: ['문화', '체육', '여가', '시설'],
      coverImage: null,
      createdAt: new Date()
    },
    {
      id: 'pledge-6',
      title: '스마트 도시 구축',
      summary: 'IoT, AI 등 첨단 기술을 활용한 스마트 도시 인프라를 구축하여 시민들의 편의성과 안전성을 높이겠습니다.',
      detail: '스마트 가로등, 지능형 교통 시스템, 디지털 시민 서비스 플랫폼 등을 도입하여 미래형 도시를 만들겠습니다.',
      tags: ['스마트시티', 'IT', '안전', '편의'],
      coverImage: null,
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const data = await getPledges();
        if (data && data.length > 0) {
          setPledges(data);
          setFilteredPledges(data);
        } else {
          // Use sample data if no Firestore data
          setPledges(samplePledges);
          setFilteredPledges(samplePledges);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pledges:', error);
        // Use sample data as fallback
        setPledges(samplePledges);
        setFilteredPledges(samplePledges);
        setLoading(false);
      }
    };

    fetchPledges();
  }, []);

  // Get all unique tags
  const allTags = ['전체', ...new Set(pledges.flatMap(pledge => pledge.tags || []))];

  // Filter pledges by tag
  useEffect(() => {
    if (selectedTag === '전체') {
      setFilteredPledges(pledges);
    } else {
      setFilteredPledges(pledges.filter(pledge => 
        pledge.tags && pledge.tags.includes(selectedTag)
      ));
    }
  }, [selectedTag, pledges]);

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
              주요 공약
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              지역 발전과 시민 복리를 위한 구체적이고 실현 가능한 정책 방향입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedTag === tag
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pledges Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPledges.map((pledge, index) => (
                <motion.div
                  key={pledge.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {pledge.coverImage && (
                    <img
                      className="w-full h-48 object-cover"
                      src={pledge.coverImage}
                      alt={pledge.title}
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {pledge.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
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
              ))}
            </div>
          )}

          {filteredPledges.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                선택한 분야의 공약이 없습니다
              </h3>
              <p className="text-gray-600">
                다른 분야를 선택해주세요.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            더 나은 지역을 위한 약속
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            모든 공약은 시민과의 약속입니다. 반드시 실현하겠습니다.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              의견 제안하기
            </Link>
            <Link
              to="/volunteer"
              className="bg-accent-600 hover:bg-accent-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              함께 참여하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pledges;