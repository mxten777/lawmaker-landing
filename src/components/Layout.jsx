import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main id="main-content" style={{ flexGrow: 1, maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', width: '100%' }} role="main" tabIndex={-1} aria-label="메인 컨텐츠">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;