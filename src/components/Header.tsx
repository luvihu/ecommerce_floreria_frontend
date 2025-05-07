import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBars, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import logoFloreria from "../assets/logoMariposaT.png";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./users/ProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import '../components/banner.css'

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);

  const goToHome = () => {
    window.location.href = "/";
  };

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-sm shadow-sm header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div
            className="flex h-16 sm:h-20 md:h-24 lg:h-24 cursor-pointer transition-transform hover:scale-105"
            onClick={goToHome}
          >
            <img
              src={logoFloreria}
              alt="Florería Estela"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Iconos de navegación - Ocultos en móvil, visibles en md+ */}
          <nav className="hidden md:flex items-center space-x-6">
            <div
              className="flex items-center gap-2 text-lime-900 hover:text-lime-700 transition-colors cursor-pointer group"
              onClick={goToHome}
            >
              <IoMdHome className="text-3xl group-hover:scale-110 transition-transform" />
              <span className="text-lg font-medium mt-0.5">Inicio</span>
            </div>
            
            <div className="flex items-center gap-2 text-lime-900 hover:text-lime-700 transition-colors cursor-pointer group">
              <FiGift className="text-3xl group-hover:scale-110 transition-transform" />
              <Link
                to="/?action=showAllProducts"
                className="text-lg font-medium mt-0.5"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/?action=showAllProducts#productos";
                }}
              >
                Productos
              </Link>
            </div>
            <a href="/#contactar" className="ml-2">
              <button className="flex items-center bg-gradient-to-r from-lime-800 to-lime-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <FaPhoneAlt className="mr-2 group-hover:animate-pulse" />
                <span className="font-medium">Contactar</span>
              </button>
            </a>
            
            {isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <div className="flex items-center gap-2 text-lime-900 hover:text-lime-700 transition-colors cursor-pointer group">
                <FaUser className="text-2xl group-hover:scale-110 transition-transform" />
                <a
                  onClick={goLogin}
                  className="text-lg font-medium mt-0.5 cursor-pointer"
                >
                  Mi cuenta
                </a>
              </div>
            )}
           
          </nav>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-lime-900 hover:text-lime-700 focus:outline-none transition-colors p-2 rounded-full"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-4">
              <div
                className="flex items-center gap-3 text-lime-900 hover:text-lime-700 transition-colors cursor-pointer py-2"
                onClick={() => {
                  goToHome();
                  setMobileMenuOpen(false);
                }}
              >
                <IoMdHome className="text-2xl" />
                <span className="text-md font-medium">Inicio</span>
              </div>
              
              <div className="flex items-center gap-3 text-lime-900 hover:text-lime-700 transition-colors cursor-pointer py-2">
                <FiGift className="text-2xl" />
                <Link
                  to="/?action=showAllProducts"
                  className="text-md font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/?action=showAllProducts#productos";
                    setMobileMenuOpen(false);
                  }}
                >
                  Productos
                </Link>
              </div>
              <a
                href="/#contactar"
                className="mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button className="flex justify-center items-center bg-gradient-to-r from-lime-800 to-lime-500 text-white px-4 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <FaPhoneAlt className="mr-2" />
                  <span className="font-medium">Contactar</span>
                </button>
              </a>
              
              {isAuthenticated ? (
                <div className="py-2">
                  <ProfileMenu />
                </div>
              ) : (
                <div className="flex items-center gap-3 text-lime-900 hover:text-lime-700 transition-colors cursor-pointer py-2">
                  <FaUser className="text-xl" />
                  <a
                    onClick={() => {
                      goLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="text-md font-medium cursor-pointer"
                  >
                    Mi cuenta
                  </a>
                </div>
              )}
              
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
