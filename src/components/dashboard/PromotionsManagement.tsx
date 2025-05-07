import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash, FaLink } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AppDispatch, RootState } from '../../redux/store';
import PromotionFormModal from './PromotionFormModal';
import ApplyPromotionModal from './ApplyPromotionModal';
import { formatDate } from '../../utils/formatDate';
import { fetchPromotions } from '../../redux/actions/promotions/fetchPromotions';
import { deletePromotion } from '../../redux/actions/promotions/deletePromotions';
import { Promotion } from '../../interfaces/Interfaces';

const PromotionsManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const promotions = useSelector((state: RootState) => state.products.promotions || []);
  const error = useSelector((state: RootState) => state.dashboard?.error || null);
  
  // Estados locales
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  // Función para cargar promociones
  const loadPromotions = async () => {
    setIsLoading(true);
    await dispatch(fetchPromotions());
    setIsLoading(false);
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  const handleOpenModal = (promotion?: Promotion) => {
    setCurrentPromotion(promotion || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPromotion(null);
  };

  const handleOpenApplyModal = (promotion: Promotion) => {
    setCurrentPromotion(promotion);
    setShowApplyModal(true);
  };

  const handleCloseApplyModal = () => {
    setShowApplyModal(false);
    setCurrentPromotion(null);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desactivará la promoción. Los productos asociados ya no tendrán este descuento aplicado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deletePromotion(id));
        // Recargar las promociones después de desactivar
        await loadPromotions();
        Swal.fire("Desactivada", "La promoción ha sido desactivada.", "success");
      }
    });
  };

  // Filtrar promociones según el estado de showInactive
  const filteredPromotions = showInactive 
    ? promotions 
    : promotions.filter((promotion: Promotion) => promotion.activo);
  
  // Obtener estado visual de la promoción
  const getPromotionStatus = (promotion: Promotion) => {
    if (!promotion.activo) return { text: 'Inactiva', color: 'bg-red-100 text-red-800' };
    
    const now = new Date();
    const startDate = new Date(promotion.fecha_inicio);
    const endDate = new Date(promotion.fecha_fin);
    
    if (now < startDate) return { text: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' };
    if (now > endDate) return { text: 'Finalizada', color: 'bg-gray-100 text-gray-800' };
    return { text: 'Activa', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Gestión de Promociones</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowInactive(!showInactive)}
            className={`${
              showInactive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-500 hover:bg-gray-600'
            } text-white font-medium py-2 px-4 rounded-lg flex items-center`}
          >
            {showInactive ? <FaEye className="mr-2" /> : <FaEyeSlash className="mr-2" />}
            {showInactive ? 'Mostrar activas' : 'Mostrar todas'}
          </button>
          
          <button
            onClick={() => handleOpenModal()}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Nueva Promoción
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
                  Descuento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Período
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
              {filteredPromotions && filteredPromotions.length > 0 ? (
                filteredPromotions.map((promotion: Promotion) => {
                  const status = getPromotionStatus(promotion);
                  return (
                    <tr key={promotion.id} className={`hover:bg-gray-50 ${!promotion.activo ? 'bg-gray-100' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{promotion.nombre}</div>
                        {promotion.descripcion && (
                          <div className="text-xs text-gray-500 mt-1">{promotion.descripcion}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-semibold">
                          {promotion.valor}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-gray-500">
                          <div>Inicio: {formatDate(new Date(promotion.fecha_inicio))}</div>
                          <div>Fin: {formatDate(new Date(promotion.fecha_fin))}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {promotion.products?.length || 0} productos
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleOpenModal(promotion)}
                            className="text-blue-700 hover:text-blue-900 mx-2"
                            title="Editar promoción"
                          >
                            <FaEdit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleOpenApplyModal(promotion)}
                            className="text-green-700 hover:text-green-900 mx-2"
                            title="Aplicar a productos"
                          >
                            <FaLink className="h-5 w-5" />
                          </button>
                          {promotion.activo && (
                            <button
                              onClick={() => handleDelete(promotion.id)}
                              className="text-red-700 hover:text-red-900 mx-2"
                              title="Desactivar promoción"
                            >
                              <FaTrash className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No hay promociones disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para agregar/editar promoción */}
      {showModal && (
        <PromotionFormModal
          promotion={currentPromotion}
          onClose={handleCloseModal}
          onSuccess={() => {
            handleCloseModal();
            loadPromotions();
          }}
        />
      )}

      {/* Modal para aplicar promoción a productos */}
      {showApplyModal && currentPromotion && (
        <ApplyPromotionModal
          promotion={currentPromotion}
          onClose={handleCloseApplyModal}
          onSuccess={() => {
            handleCloseApplyModal();
            loadPromotions();
          }}
        />
      )}
    </div>
  );
};

export default PromotionsManagement;
