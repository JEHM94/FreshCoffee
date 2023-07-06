import useQuiosco from '../hooks/useQuiosco'
import Categoria from '../components/Categoria'
import { useAuth } from '../hooks/useAuth';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';

export default function Sidebar() {

  const { categorias } = useQuiosco();
  const { logout, user } = useAuth({ middleware: 'auth' })
  const isAdmin = user?.admin

  return (
    <>
      <Menu>  
        <Link to={'/'}>
          <img src="/img/logo.svg" alt="Imagen Logotipo" className="w-32 m-auto" />
        </Link>

        <p className='text-center my-5 font-bold'>
          Bienvenido: <span className='text-amber-600'>{user?.name}</span>
        </p>

        <div className='mt-7'>
          {categorias.map(categoria => (
            <Categoria
              key={categoria.id}
              categoria={categoria}
              isSidebar={true}
              isAdmin={isAdmin}
            />
          ))}
        </div>

        <div className='my-5 px-5'>
          <button
            type='button'
            className='text-center bg-red-500 hover:bg-red-600 w-full p-3 font-bold text-white truncate rounded'
            onClick={logout}
          >
            {isAdmin ? 'Cerrar Sesión' : 'Cancelar Orden'}
          </button>
        </div>
      </Menu>

      <div className='pt-20 pl-1 bg-gray-100 hidden md:block'>
        {categorias.map(categoria => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
            isSidebar={false}
            isAdmin={isAdmin}
          />
        ))}

        <div className='my-5 pl-1'>
          <button
            type='button'
            title={isAdmin ? 'Cerrar Sesión' : 'Cancelar Orden'}
            className='flex justify-center bg-red-500 hover:bg-red-600 w-full p-3 font-bold text-white truncate rounded'
            onClick={logout}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </button>
        </div>
      </div>
    </>

    /* <aside className="md:w-72">
      <div className="p-4">
        <img src="img/logo.svg" alt="Imagen Logotipo" className="w-40 m-auto" />
      </div>

      <div className='mt-10'>
        {categorias.map(categoria => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </div>

      <div className='my-5 px-5'>
        <button
          type='button'
          className='text-center bg-red-500 hover:bg-red-600 w-full p-3 font-bold text-white truncate'
        >
          Cancelar Orden
        </button>
      </div>

    </aside> */
  )
}
