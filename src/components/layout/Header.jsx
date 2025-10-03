import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-950 shadow-soft fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-extrabold text-primary-700 tracking-tight">국회의원 캠페인</div>
        <nav className="space-x-6">
          <a href="#pledges" className="font-semibold text-gray-700 hover:text-primary-600 transition">공약</a>
          <a href="#news" className="font-semibold text-gray-700 hover:text-primary-600 transition">소식</a>
          <a href="#contact" className="font-semibold text-gray-700 hover:text-primary-600 transition">문의</a>
          <a href="#volunteer" className="font-semibold text-gray-700 hover:text-primary-600 transition">자원봉사</a>
        </nav>
      </div>
    </header>
  );
}
