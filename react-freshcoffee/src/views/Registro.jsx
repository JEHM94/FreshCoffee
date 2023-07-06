import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const [errores, setErrores] = useState([]);
    const { registro } = useAuth({ middleware: 'guest', url: '/' })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        registro(datos, setErrores)
    }


    return (
        <>
            <h1 className="text-4xl font-black mb-2 text-center md:text-left">Crea tu Cuenta</h1>
            <p className="text-center md:text-left">Completa el siguiente formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-3">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="text-slate-800 p-1"
                        >Nombre:
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            ref={nameRef}
                            placeholder="Ingresa tu Nombre"
                            className="mt-2 w-full p-3 bg-gray-50 rounded-md"
                        />
                    </div>

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

                    <div className="mb-4">
                        <label
                            htmlFor="password_confirmation"
                            className="text-slate-800 p-1"
                        >Repetir Contraseña:
                        </label>

                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            ref={passwordConfirmationRef}
                            placeholder="Repite tu Contraseña"
                            className="mt-2 w-full p-3 bg-gray-50 rounded-md"
                        />
                    </div>

                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>

            <nav className="mt-5">
                <Link
                    className="hover:underline"
                    to="/auth/login"
                >¿Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    )
}
