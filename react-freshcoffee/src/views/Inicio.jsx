import useSWR from 'swr'
import Producto from "../components/Producto";
import useQuiosco from "../hooks/useQuiosco";
import clienteAxios from '../config/axios';

export default function Inicio() {

  const { categoriaActual } = useQuiosco();

  // Consulta SWR
  const fetcher = () => clienteAxios('/api/productos').then(data => data.data)
  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })

  if (isLoading) return 'cargando...'

  const productos = data.data.filter((producto) => producto.categoria_id === categoriaActual.id)

  return (
    <>
      <h1 className="text-4xl font-black text text-amber-500 pt-24 md:pt-0 italic text-center md:text-left md:pl-4">
        {categoriaActual.nombre}
      </h1>

      <p className="text-2xl my-7 md:my-5 text-gray-600">
        Elige y personaliza tu pedido a continuación.
      </p>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos.map(producto => (
          <Producto
            key={producto.imagen}
            producto={producto}
          />
        ))}
      </div>
    </>
  )
}
