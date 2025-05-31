"use client";
import { FaPhoneAlt } from "react-icons/fa";
import React from "react";

const MobileActions = ({data}) => {
  if (!data?.number) return null;

  return (
    <div className="fixed z-50 bottom-2 right-2  lg:bottom-5 lg:right-3">
      <a
        href={`tel:${data?.number}`}
        rel="noopener noreferrer"
      >
        <div className="bg-[#259040] md:hidden text-white p-3 rounded-full">
          <FaPhoneAlt size={25} />
        </div>
        <div className="bg-[#259040] hidden md:block text-white p-3 rounded-full">
          <FaPhoneAlt size={30} />
        </div>
      </a>
    </div>
  );
};

export default MobileActions;
