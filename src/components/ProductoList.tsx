import type { Producto } from "../types/Producto"

interface Props {
    productos: Producto[]
    onEditar: (producto: Producto) => void
    onEliminar: (producto: Producto) => void
}

function ProductoList({ productos, onEditar, onEliminar }: Props) {

    if (productos.length === 0) {
        return <p className="lista-vacia">No hay productos registrados.</p>
    }

    return (
        <>
            <table className="tabla-productos">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* recorremos el arreglo de productos y creamos una fila por cada uno */}
                    {productos.map((p) => (
                        <tr key={p.id}>
                            <td>
                                {/* si tiene imagen la mostramos, si no un placeholder */}
                                {p.imagen
                                    ? <img src={p.imagen} alt={p.nombre} className="img-tabla" />
                                    : <div className="img-placeholder">Sin imagen</div>
                                }
                            </td>
                            <td>{p.nombre}</td>
                            <td>{p.descripcion || "—"}</td>
                            <td>${p.precio.toFixed(2)}</td>
                            <td>
                                <span className={`badge badge-${p.categoria}`}>
                                    {p.categoria}
                                </span>
                            </td>
                            <td>
                                <button className="btn-editar" onClick={() => onEditar(p)}>Editar</button>
                                <button className="btn-eliminar" onClick={() => onEliminar(p)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProductoList
