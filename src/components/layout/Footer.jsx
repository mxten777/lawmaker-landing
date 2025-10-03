import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} 국회의원 캠페인. 모든 권리 보유. | Powered by 바이브코딩
      </div>
    </footer>
  );
}
