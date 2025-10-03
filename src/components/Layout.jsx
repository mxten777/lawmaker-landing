import React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#ffffff', padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
            김의원 - 시민과 함께하는 더 나은 미래
          </h1>
        </div>
      </header>
      <main id="main-content" style={{ flexGrow: 1, maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', width: '100%' }} role="main" tabIndex={-1} aria-label="메인 컨텐츠">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;