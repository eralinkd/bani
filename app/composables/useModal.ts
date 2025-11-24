// Глобальное состояние модального окна (singleton)
const globalModalState = {
  isOpen: ref(false),
  modalType: ref('default'),
}

export const useModal = () => {
  const open = (type = 'default') => {
    globalModalState.modalType.value = type
    globalModalState.isOpen.value = true
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const close = () => {
    globalModalState.isOpen.value = false
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const toggle = (type = 'default') => {
    if (globalModalState.isOpen.value) {
      close()
    } else {
      open(type)
    }
  }

  return {
    isOpen: readonly(globalModalState.isOpen),
    modalType: readonly(globalModalState.modalType),
    open,
    close,
    toggle,
  }
}
