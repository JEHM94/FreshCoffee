import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from '../config/axios'
import Alerta from "../components/Alerta";

export default function Login() {

  const emailRef = createRef();
  const passwordRef = createRef();
  const [errores, setErrores] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      const { data } = await clienteAxios.post('api/login', datos)
      localStorage.setItem('AUTH_TOKEN', data.token);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors))
    }
  }

  return (
    <>
      <h1 className="text-4xl font-black mb-2">Iniciar Sesión</h1>
      <p>Para crear un pedido debes iniciar sesión</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-3">
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-slate-800 p-1"
            >Email:
            </label>

            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              placeholder="Ingresa tu Email"
              className="mt-2 w-full p-3 bg-gray-50 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-slate-800 p-1"
            >Contraseña:
            </label>

            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              placeholder="Ingresa tu Contraseña"
              className="mt-2 w-full p-3 bg-gray-50 rounded-md"
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>

      <nav className="mt-5">
        <Link
          className="hover:underline"
          to="/auth/registro"
        >¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}
