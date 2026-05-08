import { useState, useEffect } from "react"
import supabase from "./lib/supabaseClient"
import type { Producto } from "./types/Producto"
import ProductoForm from "./components/ProductoForm"
import ProductoList from "./components/ProductoList"
import DeleteModal from "./components/DeleteModal"
import "./App.css"

function App() {

    const [productos, setProductos] = useState<Producto[]>([])
    const [mostrarForm, setMostrarForm] = useState(false)
    const [productoEditar, setProductoEditar] = useState<Producto | null>(null)
    const [productoEliminar, setProductoEliminar] = useState<Producto | null>(null)
    const [categoriaFiltro, setCategoriaFiltro] = useState("todos")
    const [busqueda, setBusqueda] = useState("")
    const [orden, setOrden] = useState("nombre-az")
    const [error, setError] = useState("")

    useEffect(() => {
        const cargar = async () => {
            const { data, error } = await supabase.from("productos").select("*")
            if (error) {
                setError("Error al cargar productos")
                return
            }
            setProductos(data ?? [])
        }
        cargar()
    }, [])

    const cargarProductos = async () => {
        const { data, error } = await supabase.from("productos").select("*")
        if (error) {
            setError("Error al cargar productos")
            return
        }
        setProductos(data ?? [])
    }

    const crearProducto = async (nombre: string, descripcion: string, precio: number, categoria: string, imagen: string) => {
        const { error } = await supabase.from("productos").insert([{ nombre, descripcion, precio, categoria, imagen }])
        if (error) {
            setError("Error al crear el producto")
            return
        }
        setMostrarForm(false)
        cargarProductos()
    }

    const editarProducto = async (nombre: string, descripcion: string, precio: number, categoria: string, imagen: string) => {
        if (!productoEditar) return
        const { error } = await supabase.from("productos").update({ nombre, descripcion, precio, categoria, imagen }).eq("id", productoEditar.id)
        if (error) {
            setError("Error al editar el producto")
            return
        }
        setProductoEditar(null)
        setMostrarForm(false)
        cargarProductos()
    }

    const eliminarProducto = async () => {
        if (!productoEliminar) return
        const { error } = await supabase.from("productos").delete().eq("id", productoEliminar.id)
        if (error) {
            setError("Error al eliminar el producto")
            return
        }
        setProductoEliminar(null)
        cargarProductos()
    }

    const handleGuardar = (nombre: string, descripcion: string, precio: number, categoria: string, imagen: string) => {
        setError("")
        if (productoEditar) {
            editarProducto(nombre, descripcion, precio, categoria, imagen)
        } else {
            crearProducto(nombre, descripcion, precio, categoria, imagen)
        }
    }

    const handleEditar = (producto: Producto) => {
        setProductoEditar(producto)
        setMostrarForm(true)
    }

    const handleCancelar = () => {
        setMostrarForm(false)
        setProductoEditar(null)
        setError("")
    }

    const productosFiltrados = productos
        .filter(p => categoriaFiltro === "todos" || p.categoria === categoriaFiltro)
        .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
        .sort((a, b) => {
            if (orden === "nombre-az") return a.nombre.localeCompare(b.nombre)
            if (orden === "precio-asc") return a.precio - b.precio
            if (orden === "precio-desc") return b.precio - a.precio
            return 0
        })

    const total = productos.length
    const promedio = total > 0 ? (productos.reduce((acc, p) => acc + p.precio, 0) / total).toFixed(2) : "0.00"

    return (
        <div className="app">
            <header className="app-header">
                <h1>Panadería</h1>
                <p className="app-subtitulo">Sistema de gestión de productos</p>
            </header>

            <div className="estadisticas">
                <div className="stat-card">
                    <h4>Total productos</h4>
                    <span>{total}</span>
                </div>
                <div className="stat-card">
                    <h4>Precio promedio</h4>
                    <span>${promedio}</span>
                </div>
            </div>

            <div className="controles">
                <div className="filtros-categoria">
                    <button className={categoriaFiltro === "todos" ? "btn-filtro activo" : "btn-filtro"} onClick={() => setCategoriaFiltro("todos")}>Todos</button>
                    <button className={categoriaFiltro === "pan" ? "btn-filtro activo" : "btn-filtro"} onClick={() => setCategoriaFiltro("pan")}>Pan</button>
                    <button className={categoriaFiltro === "pastel" ? "btn-filtro activo" : "btn-filtro"} onClick={() => setCategoriaFiltro("pastel")}>Pastel</button>
                    <button className={categoriaFiltro === "galletas" ? "btn-filtro activo" : "btn-filtro"} onClick={() => setCategoriaFiltro("galletas")}>Galletas</button>
                    <button className={categoriaFiltro === "bebida" ? "btn-filtro activo" : "btn-filtro"} onClick={() => setCategoriaFiltro("bebida")}>Bebida</button>
                </div>

                <div className="controles-busqueda">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="input-busqueda"
                    />
                    <select value={orden} onChange={(e) => setOrden(e.target.value)} className="select-orden">
                        <option value="nombre-az">Nombre A-Z</option>
                        <option value="precio-asc">Precio: menor a mayor</option>
                        <option value="precio-desc">Precio: mayor a menor</option>
                    </select>
                    <button className="btn-nuevo" onClick={() => { setMostrarForm(true); setProductoEditar(null) }}>
                        + Nuevo Producto
                    </button>
                </div>
            </div>

            {error && <p className="mensaje-error">{error}</p>}

            {mostrarForm && (
                <ProductoForm
                    key={productoEditar ? productoEditar.id : "nuevo"}
                    productoEditar={productoEditar}
                    onGuardar={handleGuardar}
                    onCancelar={handleCancelar}
                />
            )}

            <ProductoList
                productos={productosFiltrados}
                onEditar={handleEditar}
                onEliminar={(p) => setProductoEliminar(p)}
            />

            <DeleteModal
                producto={productoEliminar}
                onConfirmar={eliminarProducto}
                onCancelar={() => setProductoEliminar(null)}
            />
        </div>
    )
}

export default App
