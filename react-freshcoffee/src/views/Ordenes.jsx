
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'
import { DotSpinner } from '@uiball/loaders'

export default function Ordenes() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/pedidos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, { refreshInterval: 2000 })
  const { handleClickCompletarPedido } = useQuiosco()

  if (isLoading) return (
    <div className='h-full flex items-center justify-center'>
      <DotSpinner
        size={40}
        speed={0.9}
        color="orange"
      />
    </div>
  )

  return (
    <div>
      <h1 className="text-4xl font-black text text-amber-500 pt-24 md:pt-0 italic text-center md:text-left md:pl-4">
        Ordenes
      </h1>

      <p className="text-2xl my-7 md:my-5 text-gray-600 md:pl-4 text-center md:text-left">
        Administra los pedidos
      </p>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-1 md:p-4'>
        {data.data.data.map(pedido => (
          <div
            key={pedido.id}
            className='p-5 bg-white shadow-xl space-y-2 border-b flex flex-col justify-between rounded-md hover:border hover:border-indigo-700'
          >
            <div>
              <p className='text-xl font-bold text-slate-600'>
                Pedido #{pedido.id}
              </p>
              {pedido.productos.map(producto => (
                <div
                  key={producto.id}
                  className='border-b border-b-slate-200 last-of-type:border-none py-4'
                >
                  <p className='text-sm'>ID: {producto.id}</p>
                  <p className='font-bold text-amber-600 uppercase'>{producto.nombre}</p>
                  <p>
                    Cantidad: {''}
                    <span className='font-bold text-amber-600'>{producto.pivot.cantidad}</span>
                  </p>

                </div>
              ))}

              <p className='text-lg font-bold text-slate-600'>
                Cliente:
                <span className='font-normal'> {pedido.user.name}</span>
              </p>

              <p className='text-lg font-bold text-slate-600'>
                Total a pagar
                <span className='text-amber-600'> {formatearDinero(pedido.total)}</span>
              </p>

            </div>

            <button
              onClick={() => handleClickCompletarPedido(pedido.id)}
              type="button"
              className='bg-indigo-600 hover:bg-indigo-700 cursor-pointer px-5 py-2 rounded uppercase font-bold text-white text-center w-full'
            >Completar</button>

          </div>
        ))}
      </div>

      {(data.data.data.length === 0) ? (
        <p className='p-4 font-bold text-slate-500 italic'>
          No hay pedidos pendientes
        </p>
      ) : ''}

    </div>
  )
}
