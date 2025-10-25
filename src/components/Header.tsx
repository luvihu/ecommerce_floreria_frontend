import React, { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaBars, FaPhoneAlt, FaTimes} from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import logoFloreria from "../assets/logoMariposaT.png";
import ProfileMenu from "./users/ProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  
   const handleNavigation = (targetId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    if (location.pathname === '/') {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    } else {
      navigate(`/#${targetId}`);
      setMobileMenuOpen(false);
    }
  };

  const handleProductsNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      const productosSection = document.getElementById('productos');
      if (productosSection) {
        productosSection.scrollIntoView({ behavior: "smooth" });
      }
      window.history.replaceState(null, '');
    } else {
      navigate('/?action=showAllProducts#productos');
    }
    setMobileMenuOpen(false);
  };

  const goToHome = () => {
   if (location.pathname === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigate("/");
  }
  setMobileMenuOpen(false);
  };

  const goLogin = () => {
     window.open("/login", "_blank", "noopener,noreferrer");
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className="fixed top-0 w-full z-50 transition-all right-[8px] border-rounded  duration-500 bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            className="flex cursor-pointer group"
            onClick={goToHome}
          >
            <div className="relative">
              <img
                src={logoFloreria}
                alt="Florería Estela"
                className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 h-16 sm:h-18 md:h-20 lg:h-24"
              />
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-lime-200/0 via-lime-100/30 to-lime-200/0 rounded-full blur-sm group-hover:blur-md transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-3 lg:space-x-6">
            {/* Inicio */}
            <button
              onClick={goToHome}
              className="flex items-center gap-2 text-lime-900 hover:text-lime-700 transition-all duration-300 group relative px-4 py-3"
            >
              <div className="relative">
                <IoMdHome className="transition-all duration-300 group-hover:scale-110 md:text-xl lg:text-2xl" />
                <div className="absolute -inset-1 bg-lime-200/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>
              <span className="font-semibold transition-all duration-300 text-base md:text-lg lg:text-xl">Inicio</span>
              {/* Línea decorativa */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-500 to-amber-400 group-hover:w-full transition-all duration-300" />
            </button>
            
            <button 
              onClick={handleProductsNavigation}
              className="flex items-center gap-2 text-lime-900 hover:text-lime-700 transition-all duration-300 group relative px-4 py-3"
            >
              <div className="relative">
                <FiGift className="transition-all duration-300 group-hover:scale-110 md:text-xl lg:text-2xl" />
                <div className="absolute -inset-1 bg-amber-200/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>
              <span className="font-semibold transition-all duration-300 text-base md:text-lg lg:text-xl">Productos</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-lime-400 group-hover:w-full transition-all duration-300" />
            </button>

            {isAuthenticated ? (
              <div className="transition-all duration-300 scale-100">
                <ProfileMenu />
              </div>
            ) : (
              <button
                onClick={goLogin}
                className="flex items-center gap-2 text-lime-900 hover:text-lime-700 transition-all duration-300 group relative px-4 py-3"
              >
                <div className="relative">
                  <FaUser className="transition-all duration-300 group-hover:scale-110 md:text-xl lg:text-2xl" />
                  <div className="absolute -inset-1 bg-lime-200/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <span className="font-semibold transition-all duration-300 text-base md:text-lg lg:text-xl">Mi cuenta</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-500 to-amber-400 group-hover:w-full transition-all duration-300" />
              </button>
            )}

             <button
              onClick={(e) => handleNavigation('contacto', e)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-lime-600 to-lime-500 hover:from-lime-700 hover:to-lime-600 
                text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <FaPhoneAlt className="relative z-10 mr-2 group-hover:animate-bounce" />
              <span className="font-bold relative z-10 transition-all duration-300 text-sm md:text-base">Contacto</span>
            </button>
          </div>

          {/* Botón menú móvil - ESTILO MODERNO */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-lime-900 hover:text-lime-700 focus:outline-none transition-all duration-300 p-3 rounded-2xl hover:bg-lime-100/50 backdrop-blur-sm border border-lime-200/30 scale-100"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-3" />
              ) : (
                <FaBars className="h-6 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil - ESTILO MODERNO */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-lime-100/50">
            <div className="flex flex-col space-y-4 px-4">
         
              <button
                onClick={goToHome}
                className="flex items-center gap-4 text-lime-900 hover:text-lime-700 transition-all duration-300 group py-3 px-4 rounded-xl hover:bg-lime-50/80 border border-transparent hover:border-lime-200"
              >
                <div className="relative">
                  <IoMdHome className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -inset-2 bg-lime-200/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <span className="font-semibold text-sm">Inicio</span>
              </button>
              
            
              <button 
                onClick={handleProductsNavigation}
                className="flex items-center gap-4 text-lime-900 hover:text-lime-700 transition-all duration-300 group py-3 px-4 rounded-xl hover:bg-amber-50/80 border border-transparent hover:border-amber-200"
              >
                <div className="relative">
                  <FiGift className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -inset-2 bg-amber-200/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <span className="font-semibold text-sm">Productos</span>
              </button>
                          
             
              {isAuthenticated ? (
                <div className="py-2 px-4">
                  <ProfileMenu />
                </div>
              ) : (
                <button
                  onClick={goLogin}
                  className="flex items-center gap-4 text-lime-900 hover:text-lime-700 transition-all duration-300 group py-3 px-4 rounded-xl hover:bg-lime-50/80 border border-transparent hover:border-lime-200"
                >
                  <div className="relative">
                    <FaUser className="text-lg group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-2 bg-lime-200/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <span className="font-semibold text-sm">Mi cuenta</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;