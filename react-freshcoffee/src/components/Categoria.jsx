import useQuiosco from "../hooks/useQuiosco"

export default function Categoria({ categoria, isSidebar }) {

    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const { icono, id, nombre } = categoria

    const nombreCategoria = isSidebar ? nombre : '';

    const resaltarCategoriaActual = () => categoriaActual.id === id ? 'bg-amber-400' : ''

    return (
        <>
            <button
                className={`${resaltarCategoriaActual()} flex items-center gap-4 w-full border-b  p-3 hover:bg-amber-400 cursor-pointer text-lg font-bold truncate capitalize`}
                type="button"
                title={nombre}
                onClick={() => handleClickCategoria(id)}
            >
                <img
                    src={`/img/icono_${icono}.svg`}
                    alt={`Imagen de Categoria ${nombre}`}
                    className="w-12"
                />
                {nombreCategoria}
            </button>
        </>
    )
}
