"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MenuIcon } from "lucide-react"

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

import logosvg from "../../../public/logo_svg.svg"

export default function Header() {
  const [scrollHeader, setScrollHeader] = useState(false)

  const changeHeader = () => {
    if (window.scrollY > 20) {
      setScrollHeader(true)
    } else {
      setScrollHeader(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeHeader)
    return () => {
      window.removeEventListener("scroll", changeHeader)
    }
  }, [])

  return (
    <header
      className={
        scrollHeader
          ? "sticky top-0 z-50 w-full backdrop-blur-sm bg-slate-900/40"
          : "sticky top-0 bg-slate-900/40 z-50 w-full backdrop-blur-sm"
      }
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Mobile Navigation (hidden on lg and up) */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTitle className="absolute top-4 pr-4 right-2">
              <Image src={logosvg} alt="PrintShop logo" width={80} height={80} />

            </SheetTitle>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menú de navegación"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" aria-label="Ir a la página principal" prefetch={false}>
                    <Image src={logosvg} alt="PrintShop logo" width={80} height={80} />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-2" aria-label="Navegación móvil">
                <Link
                  href="/#Servicios"
                  className="flex w-full items-center py-2 text-sm font-semibold"
                  prefetch={false}
                >
                  SERVICIOS
                </Link>
                <Link
                  href="/#Productos"
                  className="flex w-full items-center py-2 text-sm font-semibold"
                  prefetch={false}
                >
                  PRODUCTOS
                </Link>
                <Link
                  href="/#Ventajas"
                  className="flex w-full items-center py-2 text-sm font-semibold"
                  prefetch={false}
                >
                  VENTAJAS
                </Link>
                <Link
                  href="/#Contacto"
                  className="flex w-full items-center py-2 text-sm font-semibold"
                  prefetch={false}
                >
                  CONTACTO
                </Link>
                <Link
                  href="/order"
                  className="flex items-center w-full justify-center rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-slate-50"
                  prefetch={false}
                >
                  SOLICITAR ORDEN DE TRABAJO
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation (hidden on smaller screens) */}
        <div className="hidden h-20 w-full items-center justify-between px-4 md:px-6 lg:flex">
          <Link
            href="/"
            className="mr-6 flex items-center"
            prefetch={false}
            aria-label="Ir a la página principal"
          >
            <Image src={logosvg} alt="PrintShop logo" width={100} height={100} />
          </Link>
          <nav className="flex items-center space-x-6" aria-label="Navegación principal">
            <Link
              href="/#Servicios"
              className="text-sm font-bold text-slate-200 transition-transform hover:scale-110 hover:text-slate-600"
              prefetch={false}
            >
              SERVICIOS
            </Link>
            <Link
              href="/#Productos"
              className="text-sm font-bold text-slate-200 transition-transform hover:scale-110 hover:text-slate-600"
              prefetch={false}
            >
              PRODUCTOS
            </Link>
            <Link
              href="/#Ventajas"
              className="text-sm font-bold text-slate-200 transition-transform hover:scale-110 hover:text-slate-600"
              prefetch={false}
            >
              VENTAJAS
            </Link>
            <Link
              href="/#Contacto"
              className="text-sm font-bold text-slate-200 transition-transform hover:scale-110 hover:text-slate-600"
              prefetch={false}
            >
              CONTACTO
            </Link>
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-slate-50 transition-transform hover:scale-110 hover:bg-blue-600"
              prefetch={false}
            >
              SOLICITAR ORDEN DE TRABAJO
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
