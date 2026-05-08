// aqui definimos como se ve un producto en la base de datos
export interface Producto {
    id: number
    nombre: string
    descripcion: string
    precio: number
    categoria: string
    imagen: string
    created_at: string
}
