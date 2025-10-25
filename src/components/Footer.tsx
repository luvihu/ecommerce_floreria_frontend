import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp
} from 'react-icons/fa';
import logoFloreria from '../assets/logoMariposaT.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white relative" id='contacto'>
      <div className="py-4 md:py-6 lg:py-8  border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-4 md:px-4 lg:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {/* Columna 1: Información de la empresa */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="mb-4">
                <img 
                  src={logoFloreria} 
                  alt="Florería Estela" 
                  className="h-24 sm:h-28 md:h-32 lg:h-34 object-contain" 
                />
              </div>
              <p className="text-gray-400 mb-6 sm:text-left">Llevamos belleza y emociones a través de nuestras flores.</p>
              <div className="space-y-3 w-full">
                <a href="tel:+51998826388" className="flex items-center group">
                  <FaPhoneAlt className="text-orange-200 mr-3 group-hover:text-orange-300 transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-orange-100 transition-colors duration-300">+51 998826388</span>
                </a>
                <a href="mailto:floreriaestela2@gmail.com" className="flex items-center group">
                  <FaEnvelope className="text-orange-200 mr-3 group-hover:text-orange-300 transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-orange-100 transition-colors duration-300">floreriaestela2@gmail.com</span>
                </a>
                <a href="https://wa.me/51998826388" target="_blank" rel="noopener noreferrer" className="flex items-center group">
                  <FaWhatsapp className="text-orange-200 mr-3 group-hover:text-orange-300 transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-orange-100 transition-colors duration-300">WhatsApp</span>
                </a>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-orange-200 group-hover:text-orange-300 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Ventas online en todo Perú</span>
                </div>
              </div>
            </div>
            
            {/* Columna 2: Enlaces rápidos */}
            <div className="mt-2 sm:mt-6 sm:ml-6 md:ml-6 lg:ml-8 flex flex-col items-center sm:items-start">
              <h3 className="text-xl font-semibold mb-4 text-orange-200">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Inicio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Sobre Nosotros</a></li>
                <li><Link to="/?action=showAllProducts#productos" className="text-gray-400 h hover:text-orange-100 transition-colors duration-300 block">Productos</Link></li>
                <li><a href="/#ofertas" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Ofertas Especiales</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Contacto</a></li>
              </ul>
            </div>
            
            {/* Columna 3: Categorías */}
            <div className="mt-2 sm:mt-6 lg:mt-6 lg:ml-8 flex flex-col items-center sm:items-start">
              <h3 className="text-xl font-semibold mb-4 text-orange-200">Categorías</h3>
              <ul className="space-y-2">
                <li><Link to="/?categoria=Amor#categorias" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Amor</Link></li>
                <li><Link to="/?categoria=Cumpleaños#categorias" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Cumpleaños</Link></li>
                <li><Link to="/?categoria=Felicitaciones#categorias" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Felicitaciones</Link></li>
                <li><Link to="/?categoria=Ramos#categorias" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Ramos</Link></li>
                <li><Link to="/?categoria=Rosas#categorias" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Rosas</Link></li>
              </ul>
            </div>
            
            {/* Columna 4: Servicio al cliente */}
            <div className="mt-2 sm:mt-6 lg:mt-6 flex flex-col items-center sm:items-start">
              <h3 className="text-xl font-semibold mb-4 text-orange-200">Servicio al Cliente</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Política de Devoluciones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Preguntas Frecuentes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Términos y Condiciones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-100 transition-colors duration-300 block">Política de Privacidad</a></li>
              </ul>
            </div>
          </div>
          
          {/* Iconos de redes sociales */}
          <div className="flex justify-center sm:justify-end mt-10 sm:mt-6">
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8">
              <a href="#" className="bg-gray-800 hover:bg-orange-800 transition-all duration-300 h-10 w-10 rounded-full flex items-center justify-center transform hover:scale-110">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-orange-800 transition-all duration-300 h-10 w-10 rounded-full flex items-center justify-center transform hover:scale-110">
                <FaTwitter />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-orange-800 transition-all duration-300 h-10 w-10 rounded-full flex items-center justify-center transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="https://wa.me/51998826388" className="bg-gray-800 hover:bg-green-700 transition-all duration-300 h-10 w-10 rounded-full flex items-center justify-center transform hover:scale-110">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Florería Estela. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
