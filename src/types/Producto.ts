export interface Producto {
    id: number
    nombre: string
    descripcion: string
    precio: number
    categoria: 'pan' | 'pastel' | 'galletas' | 'bebida'
    imagen: string
    created_at: string
}
