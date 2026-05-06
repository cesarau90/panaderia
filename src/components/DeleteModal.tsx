import type { Producto } from "../types/Producto"

interface Props {
    producto: Producto | null
    onConfirmar: () => void
    onCancelar: () => void
}

function DeleteModal({ producto, onConfirmar, onCancelar }: Props) {
    if (!producto) return null

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>¿Eliminar producto?</h3>
                <p>Estás a punto de eliminar <strong>{producto.nombre}</strong>. Esta acción no se puede deshacer.</p>
                <div className="modal-botones">
                    <button className="btn-eliminar" onClick={onConfirmar}>
                        Sí, eliminar
                    </button>
                    <button className="btn-cancelar" onClick={onCancelar}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
