import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { FaTimes } from 'react-icons/fa';
import { Promotion } from '../../interfaces/Interfaces';
import { createPromotion } from '../../redux/actions/promotions/createPromotion';
import { updatePromotion } from '../../redux/actions/promotions/updatePromotion';

interface PromotionFormModalProps {
  promotion: Promotion | null;
  onClose: () => void;
  onSuccess: () => void;
};

const PromotionFormModal = ({ promotion, onClose, onSuccess }: PromotionFormModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isEditing = !!promotion;

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    valor: 0,
    fecha_inicio: '',
    fecha_fin: '',
    activo: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (promotion) {
      // Formatear fechas para el input date
      const formatDate = (dateValue: Date | string) => {
        if (!dateValue) return '';
        
        const d = new Date(dateValue);
        if (isNaN(d.getTime())) return '';
        
        return d.toISOString().split('T')[0];
      };

      setFormData({
        nombre: promotion.nombre || '',
        descripcion: promotion.descripcion || '',
        valor: promotion.valor || 0,
        fecha_inicio: formatDate(promotion.fecha_inicio),
        fecha_fin: formatDate(promotion.fecha_fin),
        activo: promotion.activo
      });
    }
  }, [promotion]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (formData.valor <= 0 || formData.valor > 100) {
      newErrors.valor = 'El descuento debe estar entre 1 y 100%';
    }
    
    if (!formData.fecha_inicio) {
      newErrors.fecha_inicio = 'La fecha de inicio es obligatoria';
    }
    
    if (!formData.fecha_fin) {
      newErrors.fecha_fin = 'La fecha de fin es obligatoria';
    }
    
    if (formData.fecha_inicio && formData.fecha_fin) {
      const startDate = new Date(formData.fecha_inicio);
      const endDate = new Date(formData.fecha_fin);
      
      if (startDate >= endDate) {
        newErrors.fecha_fin = 'La fecha de fin debe ser posterior a la fecha de inicio';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else if (name === 'valor') {
      // Asegurar que el valor es un número
      const numValue = parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Preparar los datos para enviar, convirtiendo las fechas a objetos Date
      const submissionData = {
        ...formData,
        fecha_inicio: new Date(formData.fecha_inicio),
        fecha_fin: new Date(formData.fecha_fin)
      };
      
      if (isEditing && promotion) {
        await dispatch(updatePromotion(promotion.id, submissionData));
      } else {
        await dispatch(createPromotion(submissionData));
      }
      onSuccess();
    } catch (error) {
      console.error('Error al guardar la promoción:', error);
      setErrors(prev => ({ ...prev, form: 'Error al guardar la promoción' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? 'Editar Promoción' : 'Nueva Promoción'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {errors.form && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.form}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nombre de la promoción"
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Descripción de la promoción"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">
              Porcentaje de descuento <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                min="1"
                max="100"
                step="0.01"
                className={`w-full p-2 border rounded-md ${errors.valor ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span className="ml-2 text-gray-700">%</span>
            </div>
            {errors.valor && <p className="mt-1 text-sm text-red-500">{errors.valor}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="fecha_inicio"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.fecha_inicio ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.fecha_inicio && <p className="mt-1 text-sm text-red-500">{errors.fecha_inicio}</p>}
            </div>
            
            <div>
              <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de fin <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="fecha_fin"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.fecha_fin ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.fecha_fin && <p className="mt-1 text-sm text-red-500">{errors.fecha_fin}</p>}
            </div>
          </div>
          
          {isEditing && (
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Promoción activa</span>
              </label>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionFormModal;
