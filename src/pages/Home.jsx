import React from 'react';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            김의원과 함께하는<br />더 나은 미래
          </h1>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '40px',
            opacity: '0.9'
          }}>
            투명하고 책임감 있는 정치로 지역 발전과 시민 복리 증진에 앞장서겠습니다.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              backgroundColor: '#ffffff',
              color: '#667eea',
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              공약 보기
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '2px solid #ffffff',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              후원하기
            </button>
          </div>
        </div>
      </section>

      {/* 주요 성과 섹션 */}
      <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '60px',
            color: '#1f2937'
          }}>
            주요 성과
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            {[
              { number: '200억원', title: '지역 발전 예산 확보', desc: '도로 인프라, 교육시설 현대화 등' },
              { number: '15개', title: '주요 정책 법안 발의', desc: '청년 고용, 복지 확대, 환경 보호' },
              { number: '500회+', title: '시민 소통 활동', desc: '타운홀 미팅, 현장 방문, 온라인 소통' }
            ].map((item, index) => (
              <div key={index} style={{
                backgroundColor: '#ffffff',
                padding: '40px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#667eea',
                  marginBottom: '15px'
                }}>
                  {item.number}
                </div>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  marginBottom: '10px',
                  color: '#1f2937'
                }}>
                  {item.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* 기존 테스트 섹션을 하단에 유지 */}
        <div style={{ 
          marginTop: '60px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '2px solid #28a745',
          maxWidth: '600px',
          margin: '60px auto 0',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>
            ✅ 시스템 상태
          </h3>
          <p style={{ color: '#333', fontSize: '14px', marginBottom: '10px' }}>
            React, Vite, Vercel 모두 정상 작동 중
          </p>
          <p style={{ color: '#666', fontSize: '12px' }}>
            현재 시간: {new Date().toLocaleString('ko-KR')}
          </p>
        </div>
      </section>

      {/* 핵심 공약 섹션 */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '60px',
            color: '#1f2937'
          }}>
            핵심 공약
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px' 
          }}>
            {[
              { icon: '🏢', title: '청년 일자리 창출', desc: '스타트업 지원센터 설립 및 취업 연계 프로그램 운영' },
              { icon: '🏫', title: '교육 환경 개선', desc: '디지털 교육 인프라 구축 및 교사 역량 강화' },
              { icon: '🏥', title: '의료 서비스 확충', desc: '24시간 응급의료센터 설립 및 원격진료 확대' },
              { icon: '🌱', title: '친환경 도시 조성', desc: '탄소중립 실현 및 녹색 교통체계 구축' }
            ].map((policy, index) => (
              <div key={index} style={{
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                  {policy.icon}
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  marginBottom: '15px',
                  color: '#1f2937'
                }}>
                  {policy.title}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  {policy.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section style={{ 
        backgroundColor: '#1f2937', 
        color: '#ffffff', 
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            marginBottom: '20px'
          }}>
            함께 만들어가는 변화
          </h2>
          <p style={{ 
            fontSize: '18px', 
            marginBottom: '40px',
            opacity: '0.9'
          }}>
            여러분의 소중한 의견과 참여가 더 나은 지역사회를 만듭니다.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              backgroundColor: '#667eea',
              color: '#ffffff',
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              의견 제안하기
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '2px solid #ffffff',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              자원봉사 참여
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;