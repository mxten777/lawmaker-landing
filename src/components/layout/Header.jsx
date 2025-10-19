import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50 border-b border-indigo-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 로고 */}
        <Link 
          to="/" 
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          onClick={closeMenu}
        >
          김의원 캠페인
        </Link>
        
        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex space-x-1">
          <Link 
            to="/about" 
            className="px-4 py-2 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            소개
          </Link>
          <Link 
            to="/pledges" 
            className="px-4 py-2 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            공약
          </Link>
          <Link 
            to="/news" 
            className="px-4 py-2 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            소식
          </Link>
          <Link 
            to="/district" 
            className="px-4 py-2 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            지역구
          </Link>
          <Link 
            to="/contact" 
            className="px-4 py-2 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            문의
          </Link>
          <Link 
            to="/volunteer" 
            className="px-4 py-2 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            자원봉사
          </Link>
          <Link 
            to="/support" 
            className="px-4 py-2 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            후원
          </Link>
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative flex flex-col justify-center items-center w-12 h-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 shadow-lg"
          aria-label="메뉴 열기"
        >
          <span className={`w-6 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 my-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <div className={`md:hidden bg-white/95 backdrop-blur-md shadow-2xl transform transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
      } absolute top-full left-0 w-full z-50 border-b border-indigo-100`}>
        <nav className="flex flex-col space-y-0 py-6 px-4">
          <Link 
            to="/about" 
            className="px-6 py-4 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 rounded-lg mx-2"
            onClick={closeMenu}
          >
            소개
          </Link>
          <Link 
            to="/pledges" 
            className="px-6 py-4 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 rounded-lg mx-2"
            onClick={closeMenu}
          >
            공약
          </Link>
          <Link 
            to="/news" 
            className="px-6 py-4 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 rounded-lg mx-2"
            onClick={closeMenu}
          >
            소식
          </Link>
          <Link 
            to="/district" 
            className="px-6 py-4 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 rounded-lg mx-2"
            onClick={closeMenu}
          >
            지역구
          </Link>
          <Link 
            to="/contact" 
            className="px-6 py-4 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 rounded-lg mx-2"
            onClick={closeMenu}
          >
            문의
          </Link>
          <Link 
            to="/volunteer" 
            className="px-6 py-4 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 rounded-lg mx-2"
            onClick={closeMenu}
          >
            자원봉사
          </Link>
          <Link 
            to="/support" 
            className="px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all rounded-lg mx-2 mt-2 text-center shadow-lg"
            onClick={closeMenu}
          >
            후원
          </Link>
        </nav>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMenu}
          style={{ top: '80px' }}
        ></div>
      )}
    </header>
  );
}
