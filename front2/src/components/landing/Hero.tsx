'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import hero from "../../../public/hero2.webp";

const HalfCircle = ({ percentage, label }: { percentage: number; label: string }) => (
  <div className="relative w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 overflow-hidden">
    <div
      className="absolute inset-0 rounded-t-full"
      style={{
        background: `linear-gradient(180deg, rgba(2,6,23,.7) 0%, rgba(206,212,220,.5) 50%, rgba(211,211,211,.6) 100%)`,
      }}
    ></div>

    <div
      className="absolute inset-0 rounded-t-full text-slate-200"
      style={{
        clipPath: `polygon(0 100%, 100% 100%, 100% ${100 - percentage}%, 0 ${100 - percentage}%)`,
      }}
    ></div>

    <div className="absolute inset-0 flex flex-col items-center justify-center text-primary">
      <span className="text-lg sm:text-xl md:text-2xl font-bold">{percentage}%</span>
      <p className="text-xs sm:text-sm uppercase">{label}</p>
    </div>
  </div>
);

export default function Hero() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => setWindowHeight(window.innerHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section 
      className="relative w-full flex flex-col justify-between" 
      id='Hero'
      style={{ height: `${windowHeight}px` }}
      role="banner"
      aria-label="Hero section"
    >
      <div className="relative flex-grow flex flex-col justify-center p-4 sm:p-6 lg:p-12 text-slate-50">
        <Image
          src={hero || "/placeholder.svg"}
          alt="PrintShop Hero Image"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            zIndex: -10,
          }}
          priority
        />
        <div className="lg:w-[40%] md:w-[65%] w-full ml-auto flex flex-col items-start text-md">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-shadow-lg">
            SOLUCIONES INTEGRALES<br />
            EN IMPRESIÓN, DISEÑO Y<br />
            PROMOCIONALES
          </h1>
          <p className="text-slate-50 p-2 sm:p-4 rounded-xl my-3 text-left text-sm sm:text-base lg:text-lg bg-slate-900/70 font-semibold">
            ESTAMOS COMPROMETIDOS CON EL MEDIO AMBIENTE
          </p>
          <a
            href="/order"
            className="mt-4 inline-block bg-[#82be5a] hover:bg-blue-600 focus:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-full transition duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Solicita una Orden de Trabajo
          </a>
        </div>
      </div>

      <div id="banner" className="w-full flex flex-col items-center pt-4 sm:pt-8 pb-8 sm:pb-12 bg-slate-50 text-slate-900">  
        <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl text-center m-auto text-slate-900">
          ASEGURAMOS LA ENTREGA DEL PRODUCTO CON
        </h2>
        <p className="text-center text-blue-600 text-lg sm:text-xl md:text-3xl lg:text-5xl py-3 sm:py-6 font-bold">
          Servicio, Calidad y Puntualidad
        </p>
        <div className="flex w-full items-center justify-between px-4 sm:px-8 mt-4 sm:mt-8">
          <div className="flex-1 flex justify-start">
            <HalfCircle percentage={99.9} label="Calidad" />
          </div>
          <div className="flex-1 flex justify-end">
            <HalfCircle percentage={99.6} label="Puntualidad" />
          </div>
        </div>
      </div>
    </section>
  );
}

