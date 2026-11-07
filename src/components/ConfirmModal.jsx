import Button from './Button'
import './ConfirmModal.css'

function ConfirmModal({ message, onConfirm, onCancel, confirmLabel = 'Excluir', confirmVariant = 'danger' }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
