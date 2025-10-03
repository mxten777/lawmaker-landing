import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-white text-primary-700 px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-primary-400 transition">본문 바로가기</a>
      <Header />
      <main id="main-content" className="flex-grow container-custom py-6 md:py-10" role="main" tabIndex={-1} aria-label="메인 컨텐츠">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;