import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useState, useEffect } from 'react';
import { loginUser } from '../redux/actions/users/loginUser';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const [showPassword, setShowPassword] = useState(false); 
  const authError = useSelector((state: RootState) => state.auth.error);
  const { rol } = useSelector((state: RootState) => state.auth);
  
  // Mapeo de nombres de campo en inglés a español
  const fieldLabels: Record<string, string> = {
    email: "Correo electrónico",
    password: "Contraseña"
  };

  useEffect(() => {
    if(rol === 'ADMIN') {
      navigate("/admin");
    } 
    if(rol === 'USER') {
      navigate("/user");
    }
  }, [navigate, rol]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const emailLowerCase = values.email.toLowerCase();
      await dispatch(loginUser(emailLowerCase, values.password));
    },
  });

  return (
    <div className="mt-10 sm:mt-14 md:mt-26 lg:mt-26 py-20 flex flex-col relative overflow-hidden bg-rose-50">
          
      {/* Contenedor principal centrado */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto my-8 px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 overflow-hidden">
            <h2 className="text-2xl font-bold text-center mb-6 font-poppins text-lime-800">
              Iniciar sesión
            </h2>
            
            {authError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-md">
                <p className="text-red-700 text-center text-sm">{authError}</p>
              </div>
            )}
            
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {["email", "password"].map((field) => (
                <div key={field} className="w-full">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                    {fieldLabels[field]}
                  </label>
                  <div className="relative">
                    <input
                      type={field === "password" ? (showPassword ? "text" : "password") : "text"}
                      id={field}
                      name={field}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[field as keyof typeof formik.values]}
                      className={`w-full px-4 py-2.5 rounded-md border transition duration-200 focus:ring-2 focus:outline-none ${
                        formik.touched[field as keyof typeof formik.touched] &&
                        formik.errors[field as keyof typeof formik.errors]
                          ? "border-red-300 focus:ring-red-100"
                          : "border-gray-300 focus:ring-lime-100 focus:border-lime-600"
                      }`}
                      placeholder={field === "email" ? "ejemplo@correo.com" : "••••••••"}
                    />
                    {field === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? 
                          <FaEye className="text-xl" /> : 
                          <FaEyeSlash className="text-xl" />
                        }
                      </button>
                    )}
                  </div>
                  {formik.touched[field as keyof typeof formik.touched] && 
                   formik.errors[field as keyof typeof formik.errors] && (
                    <p className="mt-1 text-red-700 text-xs font-medium">
                      {formik.errors[field as keyof typeof formik.errors]}
                    </p>
                  )}
                </div>
              ))}

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-lime-700 text-white py-2.5 rounded-md hover:bg-lime-600 transition duration-200 font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formik.isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </span>
                  ) : 'Ingresar'}
                </button>
                
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600 font-montserrat">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="font-medium text-lime-700 hover:text-lime-600 transition duration-200">
                      Regístrate aquí
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
