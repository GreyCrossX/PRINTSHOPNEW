// This is a server component that wraps the icons
import { IoMdClock } from "react-icons/io"
import { IoRibbonOutline } from "react-icons/io5"
import { CiDeliveryTruck } from "react-icons/ci"
import { IoLeafOutline } from "react-icons/io5"
import { GiAztecCalendarSun } from "react-icons/gi"
import { PiUsersThree } from "react-icons/pi"

type IconName = "clock" | "ribbon" | "truck" | "leaf" | "calendar" | "users"

interface IconWrapperProps {
  name: IconName
  color: string
  className?: string
}

export default function IconWrapper({ name, color, className = "h-14 w-14" }: IconWrapperProps) {
  switch (name) {
    case "clock":
      return <IoMdClock className={className} style={{ color }} />
    case "ribbon":
      return <IoRibbonOutline className={className} style={{ color }} />
    case "truck":
      return <CiDeliveryTruck className={className} style={{ color }} />
    case "leaf":
      return <IoLeafOutline className={className} style={{ color }} />
    case "calendar":
      return <GiAztecCalendarSun className={className} style={{ color }} />
    case "users":
      return <PiUsersThree className={className} style={{ color }} />
    default:
      return null
  }
}

