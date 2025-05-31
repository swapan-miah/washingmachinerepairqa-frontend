import React from "react";
import "./BorderAnimation.css";

const CallNowButton = () => {
  return (
    <div className="relative inline-block">
      <a
        href="tel:+97455665296"
        className="relative z-10 bg-teal-500 hover:bg-teal-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 border-2 border-transparent"
      >
        Call Now: +97455665296
      </a>
      <div className="absolute inset-0 border-animate rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default CallNowButton;
