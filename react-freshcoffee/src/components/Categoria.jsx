import useQuiosco from "../hooks/useQuiosco"
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Categoria({ categoria, isSidebar, isAdmin }) {

    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const { icono, id, nombre } = categoria

    const nombreCategoria = isSidebar ? nombre : '';

    const location = useLocation().pathname
    const navigate = useNavigate();

    const resaltarCategoriaActual = () => (categoriaActual.id === id && location !== '/admin') ? 'bg-amber-400' : ''
    const resaltarCategoriaPedido = () => location === '/admin' ? 'bg-amber-400' : ''

    const verProductos = () => {
        if (location === '/admin') navigate('/admin/productos')

        handleClickCategoria(id)
    }

    if (isAdmin && nombre === 'Pedidos') {
        return (
            <Link
                to={'/admin'}
                className={`${resaltarCategoriaPedido()} flex items-center gap-4 w-full border-b  p-3 hover:bg-amber-400 cursor-pointer text-lg font-bold truncate capitalize`}
                title={'Pedidos'}
            >
                <img
                    src={`/img/${icono}.png`}
                    alt={`Imagen de Categoria Pedidos`}
                    className="w-12"
                />
                {nombreCategoria}
            </Link>
        )
    }

    if (nombre !== 'Pedidos') {
        return (
            <>
                <button
                    className={`${resaltarCategoriaActual()} flex items-center gap-4 w-full border-b  p-3 hover:bg-amber-400 cursor-pointer text-lg font-bold truncate capitalize`}
                    type="button"
                    title={nombre}
                    onClick={() => verProductos()}
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

}
