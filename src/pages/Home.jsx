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
      className={`group relative ${item.bgColor} ${item.borderColor} border backdrop-blur-sm p-10 rounded-3xl text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer`}
    >
      {/* Card Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{
        background: `linear-gradient(135deg, ${item.color.includes('green') ? '#10b981' : item.color.includes('blue') ? '#3b82f6' : '#8b5cf6'}, transparent)`
      }}></div>
      
      <div className="relative">
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </div>
        <div ref={countRef} className={`text-6xl font-bold mb-6 bg-gradient-to-r ${item.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
          {count}{item.suffix}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-300 text-lg leading-relaxed">
          {item.desc}
        </p>
        
        {/* 확장된 상세 정보 */}
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-32 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="text-cyan-200 text-sm">
              {item.detail || '구체적인 성과 내용은 공식 보고서를 통해 확인하실 수 있습니다.'}
            </p>
          </div>
        </div>
        
        {/* Hover Arrow */}
        <div className="flex items-center justify-center mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-cyan-400 font-semibold mr-2">
            {isExpanded ? '접기' : '자세히 보기'}
          </span>
          <svg className={`w-5 h-5 text-cyan-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="group bg-white p-8 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer"
    >
      <div className={`w-20 h-20 bg-gradient-to-br ${policy.color} rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-3xl">{policy.icon}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-indigo-600 transition-colors">
        {policy.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-lg">
        {policy.desc}
      </p>
      <div className="flex items-center justify-center mt-6 text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="mr-2">자세히 보기</span>
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

const Home = () => {
  const [isAchievementVisible, achievementRef] = useFadeInOnScroll(200);
  const [isPolicyVisible, policyRef] = useFadeInOnScroll(400);

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-32 px-5 text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-medium">제21대 국회의원 | 현역 의원</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">김의원과 함께하는</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              더 나은 미래
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            투명하고 책임감 있는 정치로 지역 발전과 시민 복리 증진에 앞장서겠습니다.
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <Link to="/pledges" className="group bg-white text-indigo-600 px-10 py-5 text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 inline-block">
              <span className="flex items-center gap-2">
                📋 공약 보기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link to="/support" className="group bg-transparent text-white px-10 py-5 text-lg font-bold border-2 border-white rounded-xl hover:bg-white hover:text-indigo-600 transform hover:-translate-y-1 transition-all duration-300 inline-block">
              <span className="flex items-center gap-2">
                💝 후원하기
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
      <section className="py-24 px-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div ref={achievementRef} className={`relative max-w-6xl mx-auto transition-all duration-1000 ${isAchievementVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-20">
            <span className="text-blue-400 font-semibold text-lg tracking-wide uppercase">실천하는 정치</span>
            <h2 className="text-5xl font-bold mt-4 mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                검증된 성과
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              지난 임기동안 약속한 공약을 성실히 이행하여 지역 발전에 기여한 구체적인 성과들입니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-8 py-4">
              <span className="text-2xl mr-3">🏆</span>
              <span className="text-lg font-semibold text-yellow-300">시민이 인정한 신뢰받는 국회의원</span>
            </div>
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
      <section className="py-20 px-5 bg-gradient-to-b from-gray-50 to-white">
        <div ref={policyRef} className={`max-w-6xl mx-auto transition-all duration-1000 ${isPolicyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-20">
            <span className="text-indigo-600 font-semibold text-lg tracking-wide uppercase">핵심 정책</span>
            <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                4대 공약
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              지역 발전과 시민 복리를 위한 실현 가능한 정책 방향을 제시합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🏢', title: '청년 일자리 창출', desc: '스타트업 지원센터 설립 및 취업 연계 프로그램 운영', color: 'from-blue-500 to-indigo-600' },
              { icon: '🏫', title: '교육 환경 개선', desc: '디지털 교육 인프라 구축 및 교사 역량 강화', color: 'from-green-500 to-emerald-600' },
              { icon: '🏥', title: '의료 서비스 확충', desc: '24시간 응급의료센터 설립 및 원격진료 확대', color: 'from-red-500 to-pink-600' },
              { icon: '🌱', title: '친환경 도시 조성', desc: '탄소중립 실현 및 녹색 교통체계 구축', color: 'from-purple-500 to-violet-600' }
            ].map((policy, index) => (
              <PolicyCard key={index} policy={policy} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-24 px-5 text-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              함께 만드는 변화
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="block">시민과 함께하는</span>
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              정치 혁신
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            여러분의 소중한 의견과 참여가 더 나은 지역사회를 만듭니다.
            지금 바로 함께해주세요.
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <Link to="/contact" className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 inline-block">
              <span className="flex items-center gap-2">
                💬 의견 제안하기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link to="/volunteer" className="group bg-transparent text-white px-10 py-5 text-lg font-bold border-2 border-white rounded-xl hover:bg-white hover:text-indigo-900 transform hover:-translate-y-1 transition-all duration-300 inline-block">
              <span className="flex items-center gap-2">
                🤝 자원봉사 참여
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Social Proof with Counter Animation */}
          <div className="mt-16 flex items-center justify-center gap-8 flex-wrap opacity-75">
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