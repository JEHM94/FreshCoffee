import useSWR from 'swr'
import Producto from "../components/Producto";
import useQuiosco from "../hooks/useQuiosco";
import clienteAxios from '../config/axios';
import { DotSpinner } from '@uiball/loaders'

export default function Inicio() {

  const { categoriaActual } = useQuiosco();

  const token = localStorage.getItem('AUTH_TOKEN')
  // Consulta SWR
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, { refreshInterval: 1000 })

  if (isLoading) return (
    <div className='h-full flex items-center justify-center'>
      <DotSpinner
        size={40}
        speed={0.9}
        color="orange"
      />
    </div>
  )
  
  const productos = data?.data.filter((producto) => (
    (producto.categoria_id === categoriaActual.id) && (producto.disponible === 1)
  ))

  return (
    <>
      <h1 className="text-4xl font-black text text-amber-500 pt-24 md:pt-0 italic text-center md:text-left md:pl-4">
        {categoriaActual.nombre}
      </h1>

      <p className="text-2xl my-7 md:my-5 text-gray-600">
        Elige y personaliza tu pedido a continuación.
      </p>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos?.map(producto => (
          <Producto
            key={producto.imagen}
            producto={producto}
            botonAgregar={true}
          />
        ))}
      </div>
    </>
  )
}
