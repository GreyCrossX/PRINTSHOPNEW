import React from "react";

interface VentajasCardsProps {
  title: string;
  color: string;
  icon: React.ElementType;
}

export default function VentajasCard({ title, color, icon: Icon }: VentajasCardsProps) {
  return (
    <div
      className="my-2 w-[150px] aspect-square rounded-full p-4 bg-[#f9f9f9] shadow-ring shadow-lg flex flex-col items-center justify-center relative"
    >
      <div className="top-8 absolute">
        <Icon className="h-14 w-14" style={{ color }} />
      </div>
      <div
        className="uppercase absolute bottom-6 w-full text-[.72rem] text-center text-white font-bold px-3 py-1"
        style={{
          backgroundColor: color,
          clipPath: "polygon(0% 0%, 100% 0%, 95% 95%, 0% 100%)",
        }}
      >
        {title}
      </div>
    </div>
  );
}
