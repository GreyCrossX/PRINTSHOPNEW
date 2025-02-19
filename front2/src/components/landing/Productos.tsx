import React from 'react'
import ProductCard from './ProductCard'

interface ServiceCard {
    title: string
    color: string
    items: string []
}

const Services : ServiceCard[] = [
  {
    title: "CAPACITACIÓN",
    color: "rgb(87, 185, 180)", // Turquoise
    items: [
      "MANUALES",
      "FOLLETOS",
      "EXÁMENES",
      "PÓSTERS",
      "DIPLOMAS",
      "FÓLDERS",
      "CARPETAS",
      "CALENDARIOS",
      "GAFETES",
      "LIBRETAS"
    ]
  },
  {
    title: "TEXTILES",
    color: "rgb(100, 207, 180)", // Turquoise
    items: [
      "T SHIRTS",
      "HOODIES",
      "TAPETES",
      "PENDONES"
    ]
  },
  {
    title: "EDITORIAL",
    color: "rgb(78, 185, 233)", // Picton Blue
    items: [
      "CUADERNOS",
      "LIBROS",
      "PRESENTACIONES",
      "TARJETAS DE ACCESO"
    ]
  },
  {
    title: "EMPRESAS",
    color: "rgb(74, 165, 251)", // Dodger Blue
    items: [
      "TRÍPTICOS",
      "FOLLETOS",
      "FLYERS",
      "MANUALES",
      "POSTALES",
      "BITÁCORAS",
      "TARJETAS DE PRESENTACIÓN",
      "ETIQUETAS",
      "MENÚS",
      "REPORTES ANUALES"
    ]
  },
  {
    title: "GRAN FORMATO",
    color: "rgb(46, 152, 251)", // Blue
    items: [
      "PAREDES GRÁFICAS",
      "LONAS",
      "ROLLUPS",
      "PÓSTERS",
      "VINIL AUTOADHERIBLE",
      "FLOOR GRAPHICS",
      "RECORTE DE VINIL",
      "SEÑALIZACIÓN",
      "IMANES"
    ]
  },
  {
    title: "PROMOCIONALES",
    color: "rgb(74, 135, 238)", // Blue
    items: [
      "TERMOS",
      "PLUMAS",
      "LLAVEROS",
      "RELOJES",
      "CALENDARIOS",
      "LIBRETAS",
      "GORRAS",
      "CAMISETAS",
      "POLOS",
      "DISPLAYS",
      "REGALOS CORPORATIVOS"
]
  } ]


function Productos() {
  return (
    <section
      id="Productos"
      className="relative z-10 flex flex-col justify-between items-center  p-4 sm:p-6 lg:p-12 text-slate-50 bg-slate-300/50 lg:scroll-mt-20"
    >
      <h2 className='text-blue-900 text-center px-[15%] text-md font-bold md:text-xl lg:text-2xl'>SIN IMPORTAR EL VOLUMEN, RESOLVEMOS TUS NECESIDADES A TRAVÉS DEL SISTEMA O PROCESO QUE REQUIERA TU PROYECTO</h2>
<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 justify-between gap-4 pl-12'>
  {Services.map((card, index) => (
    <ProductCard
    key={index}
    title={card.title}
    color={card.color}
    items={card.items}
    />
  ))}

</div>
   </section>
  )
}

export default Productos