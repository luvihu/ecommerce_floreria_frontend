import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../redux/actions/users/updateUser';
import { registerUser } from '../../redux/actions/users/registerUser';
import { AppDispatch } from '../../redux/store';
import { IUser } from '../../interfaces/Interfaces';
import axios from 'axios';

// interface UserRegister {
//   id?: string;
//   nombre: string;
//   apellido: string;
//   telefono: string;
//   email: string;
//   password: string;
//   rol?: 'USER' | 'ADMIN';
//   activo?: boolean;
//   fechaRegistro?: string | Date;
// }

interface UsuarioFormProps {
  usuario: IUser | null;
  onSaveSuccess: (message: string) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),
  apellido: Yup.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .required('El apellido es obligatorio'),
  telefono: Yup.string()
    .matches(/^\d{9}$/, 'El teléfono debe tener 9 dígitos')
    .required('El teléfono es obligatorio'),
  email: Yup.string()
    .email('Por favor ingresa un email válido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .when('$isEditing', {
      is: true,
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema
    }),
  rol: Yup.string()
    .oneOf(['ADMIN', 'USER'], 'Rol no válido')
    .required('El rol es obligatorio'),
  activo: Yup.boolean().required('El estado es obligatorio').default(true),
});

interface FormValues {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password?: string;
  rol: 'ADMIN' | 'USER';
  activo?: boolean;
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ 
  usuario, 
  onSaveSuccess, 
  onCancel,
  onError
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  // Valores iniciales para Formik
  const initialValues: FormValues = {
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || '',
    telefono: usuario?.telefono || '',
    email: usuario?.email || '',
    password: '',
    rol: usuario?.rol || 'USER',
    activo: usuario?.activo ?? true,
  };

  // Manejar envío del formulario
  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      // Crear objeto con datos a enviar
      const dataToSend = { 
        ...values,
        activo: Boolean(values.activo) // Convertir explícitamente a booleano
      };
                 
      // Si estamos editando y no hay contraseña, la eliminamos del objeto
      if (usuario?.id && !dataToSend.password) {
        // Usamos una aserción de tipo para indicar que password es opcional
        dataToSend.password = undefined;
      }

      if (usuario && usuario.id) {
        // Actualizar usuario existente
        await dispatch(updateUser(usuario.id, dataToSend));
        onSaveSuccess('Usuario actualizado correctamente');
      } else {
        // Crear nuevo usuario
        await dispatch(registerUser(dataToSend));
        onSaveSuccess('Usuario creado correctamente');
      }
    } catch (error) {
      console.error('Error:', error);
    const errorMessage = axios.isAxiosError(error) 
      ? error.response?.data?.message || error.message
      : error instanceof Error 
        ? error.message
        : 'Error desconocido';
     onError(errorMessage);
     } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {usuario ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
        enableReinitialize={true}
        context={{ isEditing: !!usuario }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                className={`w-full px-3 py-2 border rounded-md ${errors.nombre && touched.nombre ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <ErrorMessage name="nombre" component="p" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <Field
                type="text"
                id="apellido"
                name="apellido"
                className={`w-full px-3 py-2 border rounded-md ${errors.apellido && touched.apellido ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <ErrorMessage name="apellido" component="p" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <Field
                type="text"
                id="telefono"
                name="telefono"
                className={`w-full px-3 py-2 border rounded-md ${errors.telefono && touched.telefono ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <ErrorMessage name="telefono" component="p" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`w-full px-3 py-2 border rounded-md ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {usuario ? 'Contraseña (dejar en blanco para mantener la actual)' : 'Contraseña'}
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`w-full px-3 py-2 border rounded-md ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mb-6">
            <div className="flex items-center">
              <Field
                type="checkbox"
                id="activo"
                name="activo"
                checked={values.activo}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="activo" className="ml-2 block text-sm font-medium text-gray-700">
                Usuario activo
              </label>
            </div>
             <ErrorMessage name="activo" component="p" className="mt-1 text-sm text-red-500" />
           </div>
            <div className="mb-6">
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <Field
                as="select"
                id="rol"
                name="rol"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </Field>
              <ErrorMessage name="rol" component="p" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading }
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Guardando...
                  </div>
                ) : (
                  usuario ? 'Actualizar' : 'Crear'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UsuarioForm;
