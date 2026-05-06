import { useState, useEffect } from "react"
import type { Producto } from "../types/Producto"

interface Props {
    productoEditar: Producto | null
    onGuardar: (nombre: string, descripcion: string, precio: number, categoria: 'pan' | 'pastel' | 'galletas' | 'bebida') => void
    onCancelar: () => void
}

function ProductoForm({ productoEditar, onGuardar, onCancelar }: Props) {
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState(0)
    const [categoria, setCategoria] = useState<'pan' | 'pastel' | 'galletas' | 'bebida'>("pan")

    useEffect(() => {
        if (productoEditar) {
            setNombre(productoEditar.nombre)
            setDescripcion(productoEditar.descripcion)
            setPrecio(productoEditar.precio)
            setCategoria(productoEditar.categoria)
        } else {
            setNombre("")
            setDescripcion("")
            setPrecio(0)
            setCategoria("pan")
        }
    }, [productoEditar])

    const handleSubmit = () => {
        if (!nombre || precio <= 0) return
        onGuardar(nombre, descripcion, precio, categoria)
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
                min={0}
            />

            <label><h4>Categoría</h4></label>
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as 'pan' | 'pastel' | 'galletas' | 'bebida')}
            >
                <option value="pan">Pan</option>
                <option value="pastel">Pastel</option>
                <option value="galletas">Galletas</option>
                <option value="bebida">Bebida</option>
            </select>

            <div className="form-botones">
                <button className="btn-guardar" onClick={handleSubmit}>
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
