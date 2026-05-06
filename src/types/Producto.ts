export interface Producto {
    id: number
    nombre: string
    descripcion: string
    precio: number
    categoria: 'pan' | 'pastel' | 'galletas' | 'bebida'
    created_at: string
}
