'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import hero from "../../../public/hero2.webp";
import localFont from 'next/font/local';

const Antro = localFont({
  src: '../../fonts/Antro_Vectra_Bolder.otf', // Adjust path to go up from `landing/`
  variable: '--font-Antro'
});



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
          <h1 className={` text-xl sm:text-2xl md:text-3xl  xl:4xl font-bold text-shadow-lg`}>
            SOLUCIONES INTEGRALES<br />
            EN IMPRESIÓN, DISEÑO Y<br />
            PROMOCIONALES
          </h1>
          <p className="text-slate-50  m-0 md:-mx-3 sm:p-4 rounded-xl my-3 text-left text-sm sm:text-base lg:text-lg bg-slate-900/70 font-semibold">
            ESTAMOS COMPROMETIDOS CON EL MEDIO AMBIENTE
          </p>

        </div>
      </div>

      <div
  id="banner"
  className="w-full flex flex-col justify-between items-center 
             bg-slate-50 text-slate-900 px-4 sm:px-8 pt-4 pb-0 
             h-40 sm:h-48 md:h-40 lg:h-48"
>
  <div className="text-center">
    <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl text-slate-900">
      ASEGURAMOS LA ENTREGA DEL PRODUCTO CON
    </h2>
    <p className={`${Antro.className} text-blue-600 text-lg sm:text-xl md:text-3xl lg:text-5xl py-3 sm:py-6 font-bold`}>
      Servicio, Calidad y Puntualidad
    </p>
  </div>
  <div className=" w-full items-center justify-between">
    <div className="absolute bottom-0 left-2">
      <HalfCircle percentage={99.9} label="Calidad" />
    </div>
    <div className="absolute right-2 bottom-0">
      <HalfCircle percentage={99.6} label="Puntualidad" />
    </div>
  </div>
</div>


    </section>
  );
}

