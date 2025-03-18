import React from 'react';
import Image from 'next/image';
import printer from "../../../public/printer2.webp";

function Servicios() {
  const listItems = [
    "IMPRESIÓN DIGITAL",
    "IMPRESIÓN OFFSET",
    "PROMOCIONALES",
    "EMPAQUES",
    "GRAN FORMATO",
    "DISEÑO GRÁFICO",
    "DATOS VARIABLES",
  ];

  return (
    <section
      id="Servicios"
      className="relative z-10 flex flex-col justify-between min-h-screen p-4 sm:p-6 lg:p-12 text-slate-50 bg-slate-200/50 lg:scroll-mt-20"
    >
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[rgb(3,73,150)]">
          PROCESOS Y SERVICIOS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Image container */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src={printer}
                alt="Printer image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                }}
                priority
                fill
              />
            </div>
            <div className="flex items-center justify-center h-full">
            <ul className="space-y-4 w-full max-w-md">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center text-blue-900">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#82be6a] text-white font-bold mr-4">
                    {index + 1}
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
    </section>
  );
}

export default Servicios;
