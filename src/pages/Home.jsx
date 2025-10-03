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
        color: '#ff0000', 
        fontSize: '48px', 
        marginBottom: '30px',
        fontWeight: 'bold'
      }}>
        긴급 테스트 페이지
      </h1>
      
      <p style={{ 
        color: '#000000', 
        fontSize: '24px', 
        marginBottom: '20px',
        lineHeight: '1.5'
      }}>
        이 페이지가 보이면 React 앱이 정상 작동합니다!
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