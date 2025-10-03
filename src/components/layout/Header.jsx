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
    <header className="w-full bg-white dark:bg-gray-950 shadow-soft fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 로고 */}
        <Link 
          to="/" 
          className="text-2xl font-extrabold text-primary-700 tracking-tight hover:text-primary-600 transition-colors"
          onClick={closeMenu}
        >
          국회의원 캠페인
        </Link>
        
        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/about" className="font-semibold text-gray-700 hover:text-primary-600 transition">소개</Link>
          <Link to="/pledges" className="font-semibold text-gray-700 hover:text-primary-600 transition">공약</Link>
          <Link to="/news" className="font-semibold text-gray-700 hover:text-primary-600 transition">소식</Link>
          <Link to="/district" className="font-semibold text-gray-700 hover:text-primary-600 transition">지역구</Link>
          <Link to="/contact" className="font-semibold text-gray-700 hover:text-primary-600 transition">문의</Link>
          <Link to="/volunteer" className="font-semibold text-gray-700 hover:text-primary-600 transition">자원봉사</Link>
          <Link to="/support" className="font-semibold text-gray-700 hover:text-primary-600 transition">후원</Link>
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          aria-label="메뉴 열기"
        >
          <span className={`w-6 h-0.5 bg-gray-700 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-700 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <div className={`md:hidden bg-white dark:bg-gray-950 shadow-lg transform transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } absolute top-full left-0 w-full`}>
        <nav className="flex flex-col space-y-0 py-4">
          <Link 
            to="/about" 
            className="px-6 py-3 font-semibold text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
            onClick={closeMenu}
          >
            소개
          </Link>
          <Link 
            to="/pledges" 
            className="px-6 py-3 font-semibold text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
            onClick={closeMenu}
          >
            공약
          </Link>
          <Link 
            to="/news" 
            className="px-6 py-3 font-semibold text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
            onClick={closeMenu}
          >
            소식
          </Link>
          <Link 
            to="/district" 
            className="px-6 py-3 font-semibold text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
            onClick={closeMenu}
          >
            지역구
          </Link>
          <Link 
            to="/contact" 
            className="px-6 py-3 font-semibold text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
            onClick={closeMenu}
          >
            문의
          </Link>
          <Link 
            to="/volunteer" 
            className="px-6 py-3 font-semibold text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
            onClick={closeMenu}
          >
            자원봉사
          </Link>
          <Link 
            to="/support" 
            className="px-6 py-3 font-semibold text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
            onClick={closeMenu}
          >
            후원
          </Link>
        </nav>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
}
