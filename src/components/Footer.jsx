import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-1">
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo-white.png"
                alt="로고"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span 
                className="ml-2 text-xl font-bold hidden"
                style={{ display: 'none' }}
              >
                김의원
              </span>
            </div>
            <p className="mt-4 text-gray-300 text-sm">
              시민과 함께하는 변화, 더 나은 미래를 만들어갑니다.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.987 11.988 11.987c6.618 0 11.987-5.369 11.987-11.987C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.342-1.297-.894-.808-1.297-1.959-1.297-3.342c0-1.297.49-2.448 1.297-3.342.894-.894 2.045-1.297 3.342-1.297c1.297 0 2.448.403 3.342 1.297c.894.894 1.297 2.045 1.297 3.342c0 1.383-.403 2.534-1.297 3.342c-.894.807-2.045 1.297-3.342 1.297z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  정보
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-300 hover:text-white">
                      소개
                    </Link>
                  </li>
                  <li>
                    <Link to="/pledges" className="text-base text-gray-300 hover:text-white">
                      공약
                    </Link>
                  </li>
                  <li>
                    <Link to="/news" className="text-base text-gray-300 hover:text-white">
                      소식
                    </Link>
                  </li>
                  <li>
                    <Link to="/district" className="text-base text-gray-300 hover:text-white">
                      지역구
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  참여
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/contact" className="text-base text-gray-300 hover:text-white">
                      소통
                    </Link>
                  </li>
                  <li>
                    <Link to="/volunteer" className="text-base text-gray-300 hover:text-white">
                      자원봉사
                    </Link>
                  </li>
                  <li>
                    <Link to="/support" className="text-base text-gray-300 hover:text-white">
                      후원
                    </Link>
                  </li>
                  <li>
                    <a href="/privacy" className="text-base text-gray-300 hover:text-white">
                      개인정보처리방침
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  연락처
                </h3>
                <div className="mt-4 space-y-4 text-base text-gray-300">
                  <p>국회의원 사무실</p>
                  <p>서울특별시 영등포구 의사당대로 1</p>
                  <p>국회의원회관 XXX호</p>
                  <p>전화: 02-788-XXXX</p>
                  <p>팩스: 02-788-XXXX</p>
                  <p>이메일: office@lawmaker.kr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link to="/privacy" className="text-gray-400 hover:text-gray-300 text-sm">
                개인정보처리방침
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-gray-300 text-sm">
                이용약관
              </Link>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2024 김의원 사무실. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;