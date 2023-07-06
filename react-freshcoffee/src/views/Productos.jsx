
import useSWR from "swr"
import clienteAxios from "../config/axios"
import Producto from '../components/Producto'
import useQuiosco from "../hooks/useQuiosco";

export default function Productos() {

  const { categoriaActual } = useQuiosco();

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(datos => datos.data)

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, { refreshInterval: 2000 })

  if (isLoading) return 'Cargando...'

  const productos = data?.data.filter((producto) => (
    producto.categoria_id === categoriaActual.id
  ))

  return (
    <div>
      <h1 className="text-4xl font-black text text-amber-500 pt-24 md:pt-0 italic text-center md:text-left md:pl-4">
        Productos
      </h1>

      <p className="text-2xl my-7 md:my-5 text-gray-600">
        Maneja la disponibilidad de los productos
      </p>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {productos.map(producto => (
          <Producto
            key={producto.imagen}
            producto={producto}
            botonDisponible={true}
          />
        ))}
      </div>

    </div>
  )
}
