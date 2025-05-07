import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logoutUser } from "../../redux/actions/users/logoutUser";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const ProfileMenu: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const userData = useSelector((state: RootState) => state.auth.userById);
  
  // Obtener la inicial del nombre del usuario
  const userInitial = user?.nombre ? user.nombre.charAt(0).toUpperCase() : '?';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div ref={menuRef} className="relative">
      <div
        className="flex items-center cursor-pointer bg-white hover:bg-lime-50 rounded-full px-3 py-2 transition-all duration-200 shadow-md"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-lime-100 shadow-sm mr-2 flex items-center justify-center bg-lime-700 text-white font-bold text-lg">
          {userInitial}
        </div>
        <span className="font-montserrat text-sm font-medium text-gray-700 mr-2 hidden md:block">
          {userData?.nombre} {userData?.apellido}
        </span>
        <svg
          className={`w-4 h-4 text-lime-600 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-40 md:w-44 lg:w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 transform origin-top-right z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-500 truncate font-montserrat">
              {user?.email}
            </p>
          </div>
          <Link
            to="/user/profile"
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-lime-50 transition-colors duration-200 font-montserrat"
          >
            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mi Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors duration-200 font-montserrat flex items-center"
          >
            <svg className="w-5 h-5 mr-3 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
