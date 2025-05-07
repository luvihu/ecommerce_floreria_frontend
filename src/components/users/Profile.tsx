import React, { useEffect, useState } from 'react';
import { getUserId } from '../../redux/actions/users/getUserId';
import ProfileUpdate from './ProfileUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import '../banner.css'

const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = localStorage.getItem('user');
    const idUser = user ? JSON.parse(user).id : null;
    const userData = useSelector((state: RootState) => state.auth.userById);
    
    useEffect(() => {
        if (idUser) {
            dispatch(getUserId(idUser));
        }
    }, [dispatch, idUser]);
  
    const openModal = () => setIsModalOpen(true);
    const handleModalClose = async () => {
        // Primero cerramos el modal
        setIsModalOpen(false);
        
        // Luego actualizamos los datos del usuario
        if (idUser) {
            await dispatch(getUserId(idUser));
        }
    };
       
    return (
        <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-28 py-6 sm:py-10 md:py-16 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto profile rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-pink-50 transition-shadow duration-300 w-full">
                <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold font-serif text-lime-800 mb-2 sm:mb-4 text-center">
                    Mi Perfil
                </h2>
                
                <div className="space-y-2 sm:space-y-3">
                    {[
                        { label: 'Nombre', value: userData?.nombre },
                        { label: 'Apellido', value: userData?.apellido },
                        { label: 'Teléfono', value: userData?.telefono },
                        { label: 'Correo electrónico', value: userData?.email }
                    ].map((field, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col sm:flex-row items-start sm:items-center border-b border-rose-200 py-2 sm:py-3 hover:bg-rose-50 rounded-lg px-3 transition-colors"
                        >
                            <span className="font-semibold text-sm sm:text-base w-full sm:w-36 text-lime-950 mb-1 sm:mb-0">
                                {field.label}:
                            </span>
                            <span className="text-lime-950 text-sm sm:text-base break-all">
                                {field.value}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 sm:mt-6 flex justify-center">
                    <button 
                     onClick={openModal}
                    className="w-full sm:w-auto bg-lime-800 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-lime-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base">
                        Editar Perfil
                    </button>
                </div>
            </div>
            <ProfileUpdate 
                isOpen={isModalOpen} 
                userData={userData}
                onClose={handleModalClose}
            />
        </div>
    );
};

export default Profile;
