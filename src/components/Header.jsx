import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: '홈', href: '/', current: location.pathname === '/' },
    { name: '소개', href: '/about', current: location.pathname === '/about' },
    { name: '공약', href: '/pledges', current: location.pathname === '/pledges' },
    { name: '소식', href: '/news', current: location.pathname === '/news' },
    { name: '지역구', href: '/district', current: location.pathname === '/district' },
    { name: '소통', href: '/contact', current: location.pathname === '/contact' },
    { name: '자원봉사', href: '/volunteer', current: location.pathname === '/volunteer' },
    { name: '후원', href: '/support', current: location.pathname === '/support' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="container-custom flex items-center justify-between h-16 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-[120px]">
          <img
            className="h-8 w-auto"
            src="/logo.png"
            alt="로고"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span
            className="ml-2 text-xl font-bold text-primary-700 hidden"
            style={{ display: 'none' }}
          >
            김의원
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-4 py-2 rounded-lg text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors duration-200 ${
                item.current
                  ? 'text-primary-700 bg-primary-50 shadow-sm'
                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-100'
              }`}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors duration-200"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-7 w-7"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile navigation menu */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.2 }}
          className={`md:hidden absolute left-0 top-full w-full bg-white border-b border-gray-100 shadow-lg z-40 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ minHeight: isMenuOpen ? 'auto' : 0 }}
        >
          <div className="px-2 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors duration-200 ${
                  item.current
                    ? 'text-primary-700 bg-primary-50 shadow-sm'
                    : 'text-gray-700 hover:text-primary-700 hover:bg-gray-100'
                }`}
                aria-current={item.current ? 'page' : undefined}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;