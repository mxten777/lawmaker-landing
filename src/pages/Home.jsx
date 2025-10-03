import React from 'react';

const Home = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#667eea', 
        fontSize: '48px', 
        marginBottom: '30px',
        fontWeight: 'bold'
      }}>
        김의원과 함께하는 더 나은 미래
      </h1>
      
      <p style={{ 
        color: '#000000', 
        fontSize: '24px', 
        marginBottom: '20px',
        lineHeight: '1.5'
      }}>
        투명하고 책임감 있는 정치로 지역 발전과 시민 복리 증진에 앞장서겠습니다.
      </p>
      
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
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        border: '2px solid #28a745'
      }}>
        <h2 style={{ color: '#28a745', marginBottom: '15px' }}>
          ✅ 렌더링 성공
        </h2>
        <p style={{ color: '#333', fontSize: '16px' }}>
          React, Vite, Vercel 모두 정상 작동 중입니다.
        </p>
      </div>
    </div>
  );
};

export default Home;