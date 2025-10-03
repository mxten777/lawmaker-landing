import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      {/* Skip to content for accessibility */}
      <a href="#main-content" style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 50, background: 'white', color: '#2563eb', padding: '8px 16px', borderRadius: '4px' }}>본문 바로가기</a>
      <Header />
      <main id="main-content" style={{ flexGrow: 1, padding: '20px', width: '100%' }} role="main" tabIndex={-1} aria-label="메인 컨텐츠">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;