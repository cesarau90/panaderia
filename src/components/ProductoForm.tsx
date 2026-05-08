import { useState } from "react"
import type { Producto } from "../types/Producto"

interface Props {
    productoEditar: Producto | null
    onGuardar: (nombre: string, descripcion: string, precio: number, categoria: string, imagen: string) => void
    onCancelar: () => void
}

function ProductoForm({ productoEditar, onGuardar, onCancelar }: Props) {

    const [nombre, setNombre] = useState(productoEditar ? productoEditar.nombre : "")
    const [descripcion, setDescripcion] = useState(productoEditar ? productoEditar.descripcion : "")
    const [precio, setPrecio] = useState(productoEditar ? productoEditar.precio : 0)
    const [categoria, setCategoria] = useState(productoEditar ? productoEditar.categoria : "pan")
    const [imagen, setImagen] = useState(productoEditar ? productoEditar.imagen || "" : "")

    const handleGuardar = () => {
        if (!nombre || precio <= 0) return
        onGuardar(nombre, descripcion, precio, categoria, imagen)
    }

    return (
        <div className="form-container">
            <h2>{productoEditar ? "Editar Producto" : "Nuevo Producto"}</h2>

            <label><h4>Nombre</h4></label>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Croissant"
            />

            <label><h4>Descripción</h4></label>
            <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción opcional"
            />

            <label><h4>Precio ($)</h4></label>
            <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(Number(e.target.value))}
            />

            <label><h4>Categoría</h4></label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="pan">Pan</option>
                <option value="pastel">Pastel</option>
                <option value="galletas">Galletas</option>
                <option value="bebida">Bebida</option>
            </select>

            <label><h4>URL de imagen (opcional)</h4></label>
            <input
                type="text"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
            />

            {imagen && <img src={imagen} alt="preview" className="img-preview" />}

            <div className="form-botones">
                <button className="btn-guardar" onClick={handleGuardar}>
                    {productoEditar ? "Actualizar" : "Guardar"}
                </button>
                <button className="btn-cancelar" onClick={onCancelar}>
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default ProductoForm
