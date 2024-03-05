import { resetCommentsState } from '/js/features/render-comments-section';
import { isEnterKey, isEscapeKey } from '/js/shared/utils';

const modalEl = document.querySelector('.big-picture');
const closeButton = document.querySelector('#picture-cancel');

const openImageModal = () => {
  document.body.classList.add('modal-open');
  modalEl.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeImageModal = () => {
  resetCommentsState();

  document.body.classList.remove('modal-open');
  modalEl.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageModal();
  }
}

const initModalHandlers = () => {
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeImageModal();
  });

  closeButton.addEventListener('keypress', (evt) => {
    if (isEnterKey(evt)) {
      evt.preventDefault();
      closeImageModal();
    }
  });
};

export { initModalHandlers, openImageModal };
