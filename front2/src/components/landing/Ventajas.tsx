import VentajasCard from "./VentajasCards"

const Ventajasarray = [
  {
    title: "a tiempo",
    iconName: "clock" as const,
    color: "rgba(3, 73, 150, 0.8)",
    description: "Sabemos la importancia de cada trabajo por lo que ponemos todo nuestro empeño por entregarlo a tiempo.",
  },
  {
    title: "calidad",
    iconName: "ribbon" as const,
    color: "rgba(48, 107, 171, 0.8)",
    description: "Estamos conscientes de que cada impreso y producto debe cubrir con las expectativas de nuestros clientes.",
  },
  {
    title: "atención",
    iconName: "users" as const,
    color: "rgba(91, 138, 188, 0.8)",
    description: "Cada uno de nuestros clientes tiene asignado un consultor en soluciones integrales y una plataforma para realizar pedidos.",
  },
  {
    title: "a domicilio",
    iconName: "truck" as const,
    color: "rgba(91, 147, 149, 0.8)",
    description: "Con la comodida de poder recibir tu pedido directamente en la puerta, sin complicaciones.",
  },
  {
    title: "sustentabilidad",
    iconName: "leaf" as const,
    color: "rgba(86, 173, 114, 0.8)",
    description: "Promovemos conciencias, actitudes, valores y conocimientos hacia el desarrollo sustentable.",
  },
  {
    title: "empresa mexicana",
    iconName: "calendar" as const,
    color: "rgba(88, 173, 62, 0.8)",
    description: "En 1995, fundamos PRINTSHOP y desde entonces trabajamos con equipos de alta teconolía bajo estándares de Calidad ISO 9000.",
  },
]

function Ventajas() {
  return (
    <section
      id="Ventajas"
      className="relative z-10 flex flex-col justify-between p-4 sm:p-6 lg:p-12 text-slate-50 bg-slate-400/50 lg:scroll-mt-20"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-[rgb(3,73,150)]">VENTAJAS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mx-auto">
        {Ventajasarray.map((card, index) => (
          <VentajasCard
            key={index}
            title={card.title}
            color={card.color}
            iconName={card.iconName}
            description={card.description}
          />
        ))}
      </div>
    </section>
  )
}

export default Ventajas

