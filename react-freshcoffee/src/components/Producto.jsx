import { formatearDinero } from "../helpers";

import useQuiosco from "../hooks/useQuiosco";

export default function Producto({ producto }) {

  const { nombre, imagen, precio } = producto;

  const { handleClickModal, handleSetProducto } = useQuiosco();

  return (
    <div className="border p-3 shadow bg-white">
      <img
        src={`/img/${imagen}.jpg`}
        alt={`Imagen de ${nombre}`}
        className="w-full m-auto rounded-md"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold">
          {nombre}
        </h3>

        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>

        <button
          type="button"
          onClick={() => {
            handleClickModal()
            handleSetProducto(producto)
           }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold rounded"
        >Agregar
        </button>
      </div>

    </div>
  )
}
