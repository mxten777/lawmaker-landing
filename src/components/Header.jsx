import React from 'react';import React from 'react';import React from 'react';import React from 'react';

import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Header = () => {

  return (import { Link } from 'react-router-dom';import { Link } from 'react-router-dom';

    <header style={{ backgroundColor: '#ffffff', padding: '20px', borderBottom: '1px solid #e5e7eb' }}>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>const Header = () => {

        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>

          김의원  return (

        </Link>

        <nav style={{ display: 'flex', gap: '20px' }}>    <header style={{ backgroundColor: '#ffffff', padding: '20px', borderBottom: '1px solid #e5e7eb' }}>

          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>홈</Link>

          <Link to="/about" style={{ color: '#6b7280', textDecoration: 'none' }}>소개</Link>      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>const Header = () => {const Header = () => {

          <Link to="/pledges" style={{ color: '#6b7280', textDecoration: 'none' }}>공약</Link>

          <Link to="/news" style={{ color: '#6b7280', textDecoration: 'none' }}>소식</Link>        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>

          <Link to="/contact" style={{ color: '#6b7280', textDecoration: 'none' }}>연락</Link>

        </nav>          김의원  return (  return (

      </div>

    </header>        </Link>

  );

};        <nav style={{ display: 'flex', gap: '20px' }}>    <header style={{ backgroundColor: '#ffffff', padding: '20px', borderBottom: '1px solid #e5e7eb' }}>    <header style={{ backgroundColor: '#ffffff', padding: '20px', borderBottom: '1px solid #e5e7eb' }}>



export default Header;          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>홈</Link>

          <Link to="/about" style={{ color: '#6b7280', textDecoration: 'none' }}>소개</Link>      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Link to="/pledges" style={{ color: '#6b7280', textDecoration: 'none' }}>공약</Link>

          <Link to="/news" style={{ color: '#6b7280', textDecoration: 'none' }}>소식</Link>        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>

          <Link to="/contact" style={{ color: '#6b7280', textDecoration: 'none' }}>연락</Link>

        </nav>          김의원          김의원

      </div>

    </header>        </Link>        </Link>

  );

};        <nav style={{ display: 'flex', gap: '20px' }}>        <nav style={{ display: 'flex', gap: '20px' }}>



export default Header;          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>홈</Link>          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>홈</Link>

          <Link to="/about" style={{ color: '#6b7280', textDecoration: 'none' }}>소개</Link>          <Link to="/about" style={{ color: '#6b7280', textDecoration: 'none' }}>소개</Link>

          <Link to="/pledges" style={{ color: '#6b7280', textDecoration: 'none' }}>공약</Link>          <Link to="/pledges" style={{ color: '#6b7280', textDecoration: 'none' }}>공약</Link>

          <Link to="/news" style={{ color: '#6b7280', textDecoration: 'none' }}>소식</Link>          <Link to="/news" style={{ color: '#6b7280', textDecoration: 'none' }}>소식</Link>

          <Link to="/contact" style={{ color: '#6b7280', textDecoration: 'none' }}>연락</Link>          <Link to="/contact" style={{ color: '#6b7280', textDecoration: 'none' }}>연락</Link>

        </nav>        </nav>

      </div>      </div>

    </header>    </header>

  );  );

};};



export default Header;export default Header;

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