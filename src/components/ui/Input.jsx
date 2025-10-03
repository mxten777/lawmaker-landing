import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-soft transition-all duration-150 ${className}`}
      {...props}
    />
  );
}
