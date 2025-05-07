import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes } from 'react-icons/fa';
import { createCategory } from '../../redux/actions/categories/createCategories';
import { updateCategory } from '../../redux/actions/categories/updateCategories';
import { AppDispatch } from '../../redux/store';
import { Category} from '../../interfaces/Interfaces';

interface CategoryFormModalProps {
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CategoryFormModal = ({ category, onClose, onSuccess }: CategoryFormModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialValues = {
    nombre: category?.nombre || '',
    activa: category?.activa ?? true
  };
  
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede exceder los 50 caracteres')
  });
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (category) {
          // Actualizar categoría existente
          await dispatch(updateCategory(category.id, values));
        } else {
          // Crear nueva categoría
          await dispatch(createCategory(values));
        }
        onSuccess();
      } catch (error) {
        console.error('Error al guardar la categoría:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  });
  
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isSubmitting}
        >
          <FaTimes className="h-5 w-5" />
        </button>
        
        <h2 className="text-2xl font-bold text-pink-700 mb-6">
          {category ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la categoría
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
              className={`w-full px-4 py-2 rounded-lg border ${
                formik.touched.nombre && formik.errors.nombre
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
              }`}
              placeholder="Ej: Rosas, Arreglos florales, Ramos"
              disabled={isSubmitting}
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.nombre}</p>
            )}
          </div>
          
          {category && (
            <div className="flex items-center">
              <input
                id="activa"
                name="activa"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.activa}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <label htmlFor="activa" className="ml-2 block text-sm text-gray-700">
                Categoría activa
              </label>
            </div>
          )}
          
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className={`w-full ${
                isSubmitting || !formik.isValid
                  ? 'bg-gray-400'
                  : 'bg-pink-600 hover:bg-pink-700'
              } text-white py-2 rounded-lg transition-colors`}
            >
              {isSubmitting 
                ? 'Guardando...' 
                : category 
                  ? 'Actualizar Categoría' 
                  : 'Crear Categoría'
              }
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
