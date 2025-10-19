import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// 스크롤 트리거 페이드인 훅
const useFadeInOnScroll = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return [isVisible, ref];
};

// 카운터 애니메이션 훅
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return [count, ref];
};

// 개별 성과 카드 컴포넌트
const AchievementCard = ({ item, index }) => {
  const [count, countRef] = useCountUp(item.numericValue, 2500 + index * 300);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`group relative ${item.bgColor} ${item.borderColor} border backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-3xl text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer`}
    >
      {/* Card Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{
        background: `linear-gradient(135deg, ${item.color.includes('green') ? '#10b981' : item.color.includes('blue') ? '#3b82f6' : '#8b5cf6'}, transparent)`
      }}></div>
      
      <div className="relative">
        <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </div>
        <div ref={countRef} className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r ${item.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
          {count}{item.suffix}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {item.desc}
        </p>
        
        {/* 확장된 상세 정보 */}
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-40 sm:max-h-32 opacity-100 mt-4 sm:mt-6' : 'max-h-0 opacity-0'}`}>
          <div className="p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="text-cyan-200 text-sm leading-relaxed">
              {item.detail || '구체적인 성과 내용은 공식 보고서를 통해 확인하실 수 있습니다.'}
            </p>
          </div>
        </div>
        
        {/* Hover Arrow */}
        <div className="flex items-center justify-center mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-cyan-400 font-semibold mr-2 text-sm sm:text-base">
            {isExpanded ? '접기' : '자세히 보기'}
          </span>
          <svg className={`w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// 소셜 프루프 통계 컴포넌트
const SocialProofStat = ({ stat, index }) => {
  const [count] = useCountUp(stat.value, 2000 + index * 200);
  
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">
        {count}{stat.suffix}
      </div>
      <div className="text-sm">{stat.label}</div>
    </div>
  );
};

// 3D 호버 효과가 있는 정책 카드 컴포넌트
const PolicyCard = ({ policy }) => {
  const [transform, setTransform] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    // 모바일에서는 3D 효과 비활성화
    if (window.innerWidth < 768 || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const toggleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: window.innerWidth >= 768 ? transform : 'none' }}
      className="group bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
    >
      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${policy.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 mx-auto group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-2xl sm:text-3xl">{policy.icon}</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 group-hover:text-indigo-600 transition-colors">
        {policy.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
        {policy.desc}
      </p>

      {/* 확장 가능한 상세 정보 */}
      <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-48 opacity-100 mt-4 sm:mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 sm:p-6 bg-indigo-50 rounded-lg border border-indigo-200 text-left">
          <p className="text-indigo-800 text-sm sm:text-base leading-relaxed">
            {policy.detail || '이 정책은 지역 발전과 시민 복리를 위한 구체적인 실행 방안을 제시합니다. 투명한 의사결정 과정을 통해 추진되며, 정기적인 성과 평가를 통해 지속적으로 개선될 예정입니다.'}
          </p>
        </div>
      </div>

      {/* "자세히 보기" 버튼 */}
      <button
        onClick={toggleExpand}
        className="inline-flex items-center justify-center mt-4 sm:mt-6 text-indigo-600 font-semibold hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
      >
        <span className="mr-2 text-sm sm:text-base">
          {isExpanded ? '접기' : '자세히 보기'}
        </span>
        <svg 
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const Home = () => {
  const [isAchievementVisible, achievementRef] = useFadeInOnScroll(200);
  const [isPolicyVisible, policyRef] = useFadeInOnScroll(400);

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-5 text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium">제21대 국회의원 | 현역 의원</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block">김의원과 함께하는</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              더 나은 미래
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed px-4">
            투명하고 책임감 있는 정치로 지역 발전과 시민 복리 증진에 앞장서겠습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/pledges" className="group bg-white text-indigo-600 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 inline-block w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                📋 공약 보기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link to="/support" className="group bg-transparent text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold border-2 border-white rounded-xl hover:bg-white hover:text-indigo-600 transform hover:-translate-y-1 transition-all duration-300 inline-block w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                💝 후원하기
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.0 0 00-6.364 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Premium Achievement Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div ref={achievementRef} className={`relative max-w-6xl mx-auto transition-all duration-1000 ${isAchievementVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-blue-400 font-semibold text-base sm:text-lg tracking-wide uppercase">실천하는 정치</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                검증된 성과
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              지난 임기동안 약속한 공약을 성실히 이행하여 지역 발전에 기여한 구체적인 성과들입니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[
              { 
                number: '200억원', 
                numericValue: 200,
                title: '지역 발전 예산 확보', 
                desc: '도로 인프라, 교육시설 현대화 등',
                detail: '3년간 지속적인 국정감사와 예산심의를 통해 지역 SOC 예산 200억원을 확보했습니다.',
                icon: '💰',
                color: 'from-green-400 to-emerald-500',
                bgColor: 'bg-green-500/10',
                borderColor: 'border-green-400/20',
                suffix: '억원'
              },
              { 
                number: '15개', 
                numericValue: 15,
                title: '주요 정책 법안 발의', 
                desc: '청년 고용, 복지 확대, 환경 보호',
                detail: '청년 일자리 창출법, 지역 상생법 등 15개 법안을 발의하여 7개가 통과되었습니다.',
                icon: '📋',
                color: 'from-blue-400 to-cyan-500',
                bgColor: 'bg-blue-500/10',
                borderColor: 'border-blue-400/20',
                suffix: '개'
              },
              { 
                number: '500회+', 
                numericValue: 500,
                title: '시민 소통 활동', 
                desc: '타운홀 미팅, 현장 방문, 온라인 소통',
                detail: '매월 4회 이상 정기 시민 간담회와 수시 현장 방문을 통해 소통하고 있습니다.',
                icon: '🤝',
                color: 'from-purple-400 to-pink-500',
                bgColor: 'bg-purple-500/10',
                borderColor: 'border-purple-400/20',
                suffix: '회+'
              }
            ].map((item, index) => (
              <AchievementCard key={index} item={item} index={index} />
            ))}
          </div>
          
          {/* Achievement Badge */}
          <div className="text-center mt-12 sm:mt-16">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 sm:px-8 py-3 sm:py-4">
              <span className="text-xl sm:text-2xl mr-2 sm:mr-3">🏆</span>
              <span className="text-base sm:text-lg font-semibold text-yellow-300">시민이 인정한 신뢰받는 국회의원</span>
            </div>
          </div>
        </div>
        
        {/* 의정활동 현황 */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-indigo-600 mb-2 font-bold text-lg sm:text-xl flex items-center justify-center gap-2">
              📊 실시간 의정활동 현황
            </h3>
            <p className="text-gray-600 text-sm">투명한 의정활동으로 시민과 소통합니다</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-5 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">127</div>
              <div className="text-xs sm:text-sm text-gray-600">법안 발의</div>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">89</div>
              <div className="text-xs sm:text-sm text-gray-600">국정감사 질의</div>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">156</div>
              <div className="text-xs sm:text-sm text-gray-600">현장 방문</div>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">234</div>
              <div className="text-xs sm:text-sm text-gray-600">시민 면담</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-xl border-l-4 border-indigo-500">
            <div className="flex items-start gap-3">
              <span className="text-xl">📢</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">최근 활동</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  청년 일자리 창출 법안 통과 (10/15) · 지역 교통 인프라 예산 확보 (10/12) · 
                  소상공인 지원 정책 발의 (10/10)
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              업데이트: {new Date().toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'short'
              })} · 
              <Link to="/news" className="text-indigo-600 hover:text-indigo-700 ml-1 underline">
                더 많은 활동 보기
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 핵심 공약 섹션 */}
      <section className="py-16 sm:py-20 px-4 sm:px-5 bg-gradient-to-b from-gray-50 to-white">
        <div ref={policyRef} className={`max-w-6xl mx-auto transition-all duration-1000 ${isPolicyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-indigo-600 font-semibold text-base sm:text-lg tracking-wide uppercase">핵심 정책</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 sm:mt-4 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                4대 공약
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              지역 발전과 시민 복리를 위한 실현 가능한 정책 방향을 제시합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: '🏢', title: '청년 일자리 창출', desc: '스타트업 지원센터 설립 및 취업 연계 프로그램 운영', detail: '청년층의 고용 불안정 문제를 해결하기 위해 스타트업 지원센터를 설립하고, 기업과의 연계를 통한 맞춤형 취업 프로그램을 운영합니다.', color: 'from-blue-500 to-indigo-600' },
              { icon: '🏫', title: '교육 환경 개선', desc: '디지털 교육 인프라 구축 및 교사 역량 강화', detail: '4차 산업혁명 시대에 대비한 디지털 교육 기반을 구축하고, 교사들의 지속적인 역량 개발을 지원합니다.', color: 'from-green-500 to-emerald-600' },
              { icon: '🏥', title: '의료 서비스 확충', desc: '24시간 응급의료센터 설립 및 원격진료 확대', detail: '의료 접근성을 높이기 위해 24시간 응급의료센터를 확충하고, 원격진료 서비스를 확대하여 모든 시민이 필요한 의료 서비스를 받을 수 있도록 합니다.', color: 'from-red-500 to-pink-600' },
              { icon: '🌱', title: '친환경 도시 조성', desc: '탄소중립 실현 및 녹색 교통체계 구축', detail: '지구 환경을 위해 탄소중립을 목표로 친환경 에너지 전환을 추진하고, 대중교통 중심의 녹색 교통체계를 구축합니다.', color: 'from-purple-500 to-violet-600' }
            ].map((policy, index) => (
              <PolicyCard key={index} policy={policy} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-5 text-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse"></span>
              함께 만드는 변화
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="block">시민과 함께하는</span>
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              정치 혁신
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            여러분의 소중한 의견과 참여가 더 나은 지역사회를 만듭니다.
            지금 바로 함께해주세요.
          </p>
          
          <div className="flex gap-4 sm:gap-6 justify-center flex-col sm:flex-row items-center">
            <Link to="/contact" className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 inline-block w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                💬 의견 제안하기
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link to="/volunteer" className="group bg-transparent text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold border-2 border-white rounded-xl hover:bg-white hover:text-indigo-900 transform hover:-translate-y-1 transition-all duration-300 inline-block w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                🤝 자원봉사 참여
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Social Proof with Counter Animation */}
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-6 sm:gap-8 flex-wrap opacity-75">
            {[
              { value: 1200, suffix: '+', label: '시민 참여' },
              { value: 95, suffix: '%', label: '만족도' },
              { value: 24, suffix: '/7', label: '소통 채널' }
            ].map((stat, index) => (
              <SocialProofStat key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;