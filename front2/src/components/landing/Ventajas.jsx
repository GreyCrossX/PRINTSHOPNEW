import React from "react";
import { IoMdClock } from "react-icons/io";
import { IoRibbonOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoLeafOutline } from "react-icons/io5";
import { GiAztecCalendarSun } from "react-icons/gi";
import { PiUsersThree } from "react-icons/pi";
import VentajasCard from "./VentajasCards";

const Ventajasarray = [
  {
    title: "a tiempo",
    icon: IoMdClock,
    color: "rgba(3, 73, 150, 0.8)",
  },
  {
    title: "calidad",
    icon: IoRibbonOutline,
    color: "rgba(48, 107, 171, 0.8)",
  },
  {
    title: "atención",
    icon: PiUsersThree,
    color: "rgba(91, 138, 188, 0.8)",
  },
  {
    title: "a domicilio",
    icon: CiDeliveryTruck,
    color: "rgba(91, 147, 149, 0.8)",
  },
  {
    title: "sustentabilidad",
    icon: IoLeafOutline,
    color: "rgba(86, 173, 114, 0.8)",
  },
  {
    title: "empresa mexicana",
    icon: GiAztecCalendarSun,
    color: "rgba(88, 173, 62, 0.8)",
  },
];

function Ventajas() {
  return (
    <section
      id="Ventajas"
      className="relative z-10 flex flex-col justify-between p-4 sm:p-6 lg:p-12 text-slate-50 bg-slate-400/50 lg:scroll-mt-20"
    >
      <h2 className="text-[#034996] pt-4 pb-8 text-4xl font-bold">Ventajas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mx-auto">
        {Ventajasarray.map((card, index) => (
          <VentajasCard
            key={index}
            title={card.title}
            color={card.color}
            icon={card.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default Ventajas;
