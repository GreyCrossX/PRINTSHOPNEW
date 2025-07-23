"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { LucideImage } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  empresa: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres.",
  }),
  correo: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  telefono: z.string().min(6, {
    message: "Por favor ingrese un número de teléfono válido.",
  }),
  mensaje: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      empresa: "",
      correo: "",
      telefono: "",
      mensaje: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Formulario enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      })
      setIsSubmitting(false)
      form.reset()
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-sm" id="Contacto">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        <div className="w-full md:w-1/4 flex justify-center md:justify-start">
          <div className="p-4 rounded-lg flex items-center justify-center w-32 h-full relative">
            <Image
              src="/logo.webp"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
              onError={(e) => {
                // Fallback to Lucide icon if image fails to load
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const fallback = document.createElement("div")
                fallback.innerHTML = '<div class="w-16 h-16 text-gray-400"></div>'
                target.parentNode?.appendChild(fallback)
              }}
            />
            <div className="hidden">
              <LucideImage className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold mb-6">Contáctanos</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="empresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Correo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Teléfono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mensaje"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Textarea placeholder="Mensaje" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

