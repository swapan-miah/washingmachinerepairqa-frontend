"use client";
import Image from "next/image";
import React from "react";
import whatsapp from "../../public/images/whatsapp.png";

const WhatsApp = ({data}) => {
  if (!data?.whats_app) return null;

  return (
    <div className="fixed z-50 bottom-1 left-2 lg:bottom-5 lg:left-3">
      <a
        href={`https://wa.me/${data.whats_app}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/whatsapp.png"
          alt="WhatsApp Icon"
          height={70}
          width={70}
          className="rounded-full hidden md:block"
        />
        <Image
          src="/images/whatsapp.png"
          alt="WhatsApp Icon"
          height={60}
          width={60}
          className="rounded-full  md:hidden"
        />
      </a>
    </div>
  );
};

export default WhatsApp;
