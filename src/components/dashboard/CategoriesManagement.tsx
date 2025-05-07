import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { fetchCategories } from '../../redux/actions/categories/fetchCategories';
import { deleteCategory } from '../../redux/actions/categories/deleteCategories';
import CategoryFormModal from './CategoryFormModal';
import { AppDispatch, RootState } from '../../redux/store';
import { Category } from '../../interfaces/Interfaces';

const CategoriesManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.products.categories);
  const error = useSelector((state: RootState) => state.dashboard.error);
  
  // Estado local para controlar la carga inicial
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      await dispatch(fetchCategories());
      setIsLoading(false);
    };
    
    loadCategories();
  }, [dispatch]);

  const handleOpenModal = (category?: Category) => {
    setCurrentCategory(category || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCategory(null);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desactivará la categoría. Los productos asociados mantendrán la relación pero la categoría no será visible para los clientes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id));
        Swal.fire("Desactivada", "La categoría ha sido desactivada.", "success");
      }
    });
  };

  // Filtrar categorías según el estado de showInactive
  const filteredCategories = showInactive 
    ? categories 
    : categories.filter(category => category.activa);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Gestión de Categorías</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowInactive(!showInactive)}
            className={`${
              showInactive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-500 hover:bg-gray-600'
            } text-white font-medium py-2 px-4 rounded-lg flex items-center`}
          >
            {showInactive ? <FaEye className="mr-2" /> : <FaEyeSlash className="mr-2" />}
            {showInactive ? 'Mostrar todas' : 'Mostrar inactivas'}
          </button>
          
          <button
            onClick={() => handleOpenModal()}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Nueva Categoría
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Productos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories && filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id} className={`hover:bg-gray-50 ${!category.activa ? 'bg-gray-100' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.nombre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.activa 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.activa ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {category.products?.length || 0} productos
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenModal(category)}
                          className="text-blue-700 hover:text-blue-900 mx-2"
                          title="Editar categoría"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        {category.activa && (
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="text-red-700 hover:text-red-900 mx-2"
                            title="Desactivar categoría"
                          >
                            <FaTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No hay categorías disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para agregar/editar categoría */}
      {showModal && (
        <CategoryFormModal
          category={currentCategory}
          onClose={handleCloseModal}
          onSuccess={() => {
            handleCloseModal();
            dispatch(fetchCategories());
          }}
        />
      )}
    </div>
  );
};

export default CategoriesManagement;
