import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contacto() {
  return (
    <div className="w-full max-w-6xl mx-auto py-6" id='Contacto'>
      <div className="grid md:grid-cols-3 gap-8 px-4">
        {/* Email Section */}
        <div className="flex flex-col items-center text-center p-6 border-r border-gray-200 last:border-0 shadow-custom">
          <Mail className="w-8 h-8 text-blue-600 mb-4" />
          <h2 className="text-blue-600 font-bold mb-2">¡ESCRIBENOS!</h2>
          <a 
            href="mailto:info@digitalprintshop.com.mx" 
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            INFO@DIGITALPRINTSHOP.COM.MX
          </a>
        </div>

        {/* Phone Section */}
        <div className="flex flex-col items-center text-center p-6 border-r shadow-custom border-gray-200 last:border-0">
          <Phone className="w-8 h-8 text-blue-600 mb-4" />
          <h2 className="text-blue-600 font-bold mb-2">¡LLAMANOS!</h2>
          <div className="flex flex-col gap-1">
            <a 
              href="tel:+525555541189" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              +52 55 5554-1189
            </a>
            <a 
              href="tel:+525556591758" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              +52 55 5659-1758
            </a>
          </div>
        </div>

        {/* Location Section */}
        <div className="flex flex-col items-center text-center p-6 shadow-custom">
          <MapPin className="w-8 h-8 text-blue-600 mb-4" />
          <h2 className="text-blue-600 font-bold mb-2">¡VISITANOS!</h2>
          <address className="text-gray-600 not-italic">
            PROGRESO 136<br />
            BARRIO DE SANTA CATARINA<br />
            04010 COYOACAN<br />
            CIUDAD DE MÉXICO
          </address>
        </div>
      </div>
    </div>
  )
}

