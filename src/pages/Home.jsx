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

      {/* 기존 테스트 섹션을 일시적으로 유지 */}
      <section style={{ 
        padding: '50px 20px', 
        textAlign: 'center', 
        backgroundColor: '#f8fafc'
      }}>
        <p style={{ 
          color: '#666666', 
          fontSize: '18px',
          marginBottom: '30px'
        }}>
          현재 시간: {new Date().toLocaleString('ko-KR')}
        </p>
        
        <button 
          style={{ 
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => alert('버튼이 작동합니다!')}
        >
          테스트 버튼
        </button>
        
        <div style={{ 
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '2px solid #28a745',
          maxWidth: '600px',
          margin: '40px auto 0'
        }}>
          <h2 style={{ color: '#28a745', marginBottom: '15px' }}>
            ✅ 렌더링 성공
          </h2>
          <p style={{ color: '#333', fontSize: '16px' }}>
            React, Vite, Vercel 모두 정상 작동 중입니다.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;