import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-xl font-bold bg-primary-600 text-white shadow-soft hover:bg-primary-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
