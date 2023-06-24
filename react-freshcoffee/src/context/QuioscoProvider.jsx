import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    const obtenerCategorias = async () => {
        try {
            const { data } = await clienteAxios('/api/categorias');
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])


    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = () => {
        setModal(!modal);
    }

    const handleSetProducto = (producto) => {
        setProducto(producto);
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {

        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)

            setPedido(pedidoActualizado);
            toast.success('Pedido Actualizado')
        } else {
            setPedido([...pedido, producto]);
            toast.success('Agregado al Pedido')
        }
    }

    const handleEditarCantidad = id => {
        const actualizarProducto = pedido.filter(producto => producto.id === id)[0]
        setProducto(actualizarProducto)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Producto Eliminado')
    }

    const handleSubmitNuevaOrden = (logout) => {
        Swal.fire({
            title: '¿Está seguro que desea enviar el Pedido?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, enviar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('AUTH_TOKEN');

                try {
                    const { data } = await clienteAxios.post('/api/pedidos', {
                        total,
                        productos: pedido.map(producto => {
                            return {
                                id: producto.id,
                                cantidad: producto.cantidad
                            }
                        })
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    toast.success(data.mensaje)

                    setTimeout(() => {
                        setPedido([])
                    }, 1000);

                    setTimeout(() => {
                        logout()
                    }, 3000);

                } catch (error) {
                    console.log(error)
                }
            }
        })

    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden
            }}
        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext