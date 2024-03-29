import { formatearDinero } from "../helpers";

import useQuiosco from "../hooks/useQuiosco";

export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {

  const { nombre, imagen, precio, disponible } = producto;

  const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useQuiosco();

  return (
    <div className="border p-3 shadow bg-white flex flex-col">
      {/* <img
        src={`/img/${imagen}.jpg`}
        alt={`Imagen de ${nombre}`}
        className="w-full m-auto rounded-md"
      /> */}
      <div className="w-full rounded-md">
        <picture >
          <source srcSet={`/img/${imagen}.webp`} type="image/webp" />
          <img src={`/img/${imagen}.jpg`} alt={`Imagen de ${nombre}`} loading="lazy" />
        </picture>
      </div>


      <div className="pt-2 md:p-5 h-full flex flex-col justify-between">
        <h3 className="text-xl font-bold">
          {nombre}
        </h3>

        <div>
          <p className="mt-5 font-black text-4xl text-amber-500">
            {formatearDinero(precio)}
          </p>

          {botonAgregar && (
            <button
              type="button"
              onClick={() => {
                handleClickModal()
                handleSetProducto(producto)
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-base w-full mt-5 p-3 uppercase font-bold rounded"
            >Agregar
            </button>
          )}

          {botonDisponible && (
            <button
              type="button"
              onClick={() => handleClickProductoAgotado(producto.id, producto.nombre, disponible)}
              className={`${disponible ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'} text-white text-xs md:text-base w-full mt-5 p-3 uppercase font-bold rounded`}
            >{disponible ? 'Producto Disponible' : 'Producto Agotado'}
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
