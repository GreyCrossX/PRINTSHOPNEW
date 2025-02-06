import React from 'react'
import Hero from '@/components/landing/Hero'
import Servicios from '@/components/landing/Servicios'
import Productos from '@/components/landing/Productos'
import Ventajas from '@/components/landing/Ventajas'
import Contacto from '@/components/landing/Contacto'

export default function Page() {
  return (
    <div>
      <Hero />
      <Servicios />
      <Productos />
      <Ventajas />
      <Contacto />
    </div>
  )
}