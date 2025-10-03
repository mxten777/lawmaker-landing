import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white dark:bg-gray-900 shadow-glass backdrop-blur-md p-6 ${className}`}>
      {children}
    </div>
  );
}
