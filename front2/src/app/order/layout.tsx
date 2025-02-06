import "@/app/globals.css";
import { Toaster} from "@/components/ui/toaster"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema de Órdenes | Crear Orden',
  description: 'Sistema de gestión de órdenes personalizado',
}

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

<section className="flex justify-center items-center w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,87,158,0.3),rgba(255,255,255,0))]">
  {children}
  <Toaster />
</section>


  );
}