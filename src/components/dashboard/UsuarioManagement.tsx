import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import UsuarioForm from './UsuarioForm';
import { fetchUsuarios } from '../../redux/actions/users/fetchUsuarios';
import { deleteUsuario } from '../../redux/actions/users/deleteUsuario';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { IUser } from '../../interfaces/Interfaces';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const UsuarioManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading = false } = useSelector((state: RootState) => state.auth);

  const initialFilters = {
    nombre: '',
    email: '',
    rol: '',
    activo: ''
  };

  const [filters, setFilters] = useState(initialFilters);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  useEffect(() => {
    dispatch(fetchUsuarios());
  }, [dispatch]);

  const filteredUsers = users?.filter(user => {
    const matchNombre = user.nombre.toLowerCase().includes(filters.nombre.toLowerCase());
    const matchEmail = user.email.toLowerCase().includes(filters.email.toLowerCase());
    const matchRol = filters.rol === '' ? true : user.rol === filters.rol;
    const matchActivo = filters.activo === '' ? true : user.activo?.toString() === filters.activo;
    
    return matchNombre && matchEmail && matchRol && matchActivo;
  }) || [];

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleCreateUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (usuario: IUser) => {
    setCurrentUser(usuario);
    setIsModalOpen(true);
  };

  const handleSaveSuccess = (message: string) => {
    showSuccess(message);
    setIsModalOpen(false);
    dispatch(fetchUsuarios());
  };

  const handleDeactivate = async (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desactivará al usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUsuario(id))
          .then(() => {
            Swal.fire("Desactivado", "El usuario ha sido desactivado.", "success");
            dispatch(fetchUsuarios());
          })
          .catch((error) => {
            Swal.fire("Error", "No se pudo desactivar el usuario.", "error");
            console.error("Error al desactivar usuario:", error);
          });
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Gestión de Usuarios</h2>
        <button
          onClick={resetFilters}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded"
        >
          Resetear Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.nombre}
            onChange={(e) => setFilters({...filters, nombre: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            placeholder="Buscar por email"
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.email}
            onChange={(e) => setFilters({...filters, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.rol}
            onChange={(e) => setFilters({...filters, rol: e.target.value})}
          >
            <option value="">Todos</option>
            <option value="ADMIN">Administrador</option>
            <option value="USER">Usuario</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.activo}
            onChange={(e) => setFilters({...filters, activo: e.target.value})}
          >
            <option value="">Todos</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          No se encontraron usuarios con los filtros seleccionados
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Registro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(usuario => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-500 text-sm font-medium">
                          {usuario.nombre.charAt(0)}{usuario.apellido?.charAt(0) || ''}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {usuario.nombre} {usuario.apellido}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{usuario.email}</div>
                    <div className="text-sm text-gray-500">{usuario.telefono}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      usuario.rol === 'ADMIN' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      usuario.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(usuario.fechaRegistro).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(usuario)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar Usuario"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      {usuario.activo && (
                        <button
                          onClick={() => handleDeactivate(usuario.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Desactivar Usuario"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleCreateUser}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center shadow-md"
        >
          <FaPlus className="mr-2" /> Agregar Usuario
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full max-h-90vh overflow-y-auto">
            <UsuarioForm 
              usuario={currentUser} 
              onSaveSuccess={handleSaveSuccess}
              onCancel={() => setIsModalOpen(false)}
              onError={showError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuarioManagement;