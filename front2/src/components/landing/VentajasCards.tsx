"use client"

import { useState, useEffect } from "react"
import IconWrapper from "./ventajas-icon-wrapper"

interface VentajasCardsProps {
  title: string
  color: string
  iconName: "clock" | "ribbon" | "truck" | "leaf" | "calendar" | "users"
  description: string
}

export default function VentajasCard({ title, color, iconName, description }: VentajasCardsProps) {
  const [showDescription, setShowDescription] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleCardInteraction = () => {
    if (isMobile) {
      setShowDescription(!showDescription)
    }
  }

  return (
    <div
      className="my-2 w-[150px] aspect-square rounded-full p-4 bg-[#f9f9f9] shadow-ring shadow-lg flex flex-col items-center justify-center relative group cursor-pointer"
      onClick={handleCardInteraction}
      onMouseEnter={() => !isMobile && setShowDescription(true)}
      onMouseLeave={() => !isMobile && setShowDescription(false)}
    >
      <div
        className={`top-8 absolute transition-transform duration-300 ${showDescription ? "transform -translate-y-4" : ""}`}
      >
        <IconWrapper name={iconName} color={color} />
      </div>

      <div
        className={`uppercase absolute bottom-6 w-full text-[.72rem] text-center text-white font-bold px-3 py-1 transition-all duration-300 ${showDescription ? "transform translate-y-4 opacity-0" : "opacity-100"}`}
        style={{
          backgroundColor: color,
          clipPath: "polygon(0% 0%, 100% 0%, 95% 95%, 0% 100%)",
        }}
      >
        {title}
      </div>

      {/* Description overlay */}
      <div
        className={`absolute inset-0 rounded-full flex items-center justify-center p-4 transition-opacity duration-300 ${showDescription ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundColor: color,
          pointerEvents: showDescription ? "auto" : "none",
        }}
      >
        <p className="text-white text-xs text-center font-medium">{description}</p>
      </div>

      {/* Mobile indicator */}
      {isMobile && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500">
          {showDescription ? "Tap to close" : "Tap for info"}
        </div>
      )}
    </div>
  )
}

