import { useState, useEffect } from "react"
import type { Producto } from "../types/Producto"

// lo que le pasamos al formulario desde afuera
interface Props {
    productoEditar: Producto | null
    onGuardar: (nombre: string, descripcion: string, precio: number, categoria: string, imagen: string) => void
    onCancelar: () => void
}

function ProductoForm({ productoEditar, onGuardar, onCancelar }: Props) {

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState(0)
    const [categoria, setCategoria] = useState("pan")
    const [imagen, setImagen] = useState("")

    // si nos pasan un producto para editar, llenamos los campos con sus datos
    useEffect(() => {
        if (productoEditar) {
            setNombre(productoEditar.nombre)
            setDescripcion(productoEditar.descripcion)
            setPrecio(productoEditar.precio)
            setCategoria(productoEditar.categoria)
            setImagen(productoEditar.imagen || "")
        } else {
            setNombre("")
            setDescripcion("")
            setPrecio(0)
            setCategoria("pan")
            setImagen("")
        }
    }, [productoEditar])

    const handleGuardar = () => {
        if (!nombre || precio <= 0) return
        onGuardar(nombre, descripcion, precio, categoria, imagen)
    }

    return (
        <>
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

                {/* si hay url de imagen, mostramos una preview */}
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
        </>
    )
}

export default ProductoForm
