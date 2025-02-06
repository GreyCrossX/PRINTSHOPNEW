
export default function SiteFooter  () {
  return (
      <footer className="py-6 bg-gray-800 text-white text-center bottom-0  w-screen relative">
          <div className="container mx-auto px-6">
              <p className="mb-4">&copy; 2025 PrintShop. Todos los derechos reservados</p>
              <div className="flex justify-center space-x-4">
                  <a href="/privacy" className="hover:underline text-[#82be5aff]">Aviso de Privacidad</a>
              </div>
          </div>
      </footer>
  );
};
