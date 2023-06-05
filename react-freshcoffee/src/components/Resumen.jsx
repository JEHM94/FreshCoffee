import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./ResumenProducto";
import { formatearDinero } from "../helpers";

export default function Resumen() {

  const { pedido, total } = useQuiosco();

  return (
    <aside className="md:w-72 h-screen overflow-y-scroll p-5 mt-5 md:mt-0">
      <h1 className="text-4xl font-black">
        Mi Pedido
      </h1>

      <p className="text-lg my-5">
        Aquí podrás ver el resumen y totales de tu pedido
      </p>

      <div className="h-5/6 md:flex md:flex-col md:justify-between">
        <div className=" overflow-y-scroll">
          {pedido.length === 0 ? (
            <p className="my-7 text-center text-2xl text-gray-600">
              No hay elementos en tu pedido aún.
            </p>

          ) : (
            pedido.map(producto => (
              <ResumenProducto
                key={producto.id}
                producto={producto}
              />
            ))

          )}
        </div>

        <div>
          <p className="text-xl mt-10 font-bold text-amber-500">
            Total: {formatearDinero(total)}
          </p>

          <form className="w-full">
            <div className="mt-5">
              <input
                type="submit"
                value="Confirmar Pedido"
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
              />
            </div>
          </form>
        </div>

      </div>

    </aside>
  )
}
