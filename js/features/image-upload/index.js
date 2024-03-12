import { sendData } from '../../shared/api';
import { isEnterKey, isEscapeKey } from '/js/shared/utils';
import { showConfirmedToast } from '../../shared/toast-message';

import { pristine } from '/js/features/image-upload/validation/';
import { resetPreviewImage, disableScaleButtons, enableScaleButtons } from '/js/features/scale-control';
import { resetFilterSettings, disableSlider, enableSlider } from '/js/features/filter-control';

const mainContainer = document.querySelector('.img-upload');

const inputFile = mainContainer.querySelector('.img-upload__input');

const imgUploadOverlay = mainContainer.querySelector('.img-upload__overlay');
const cancelButton = mainContainer.querySelector('.img-upload__cancel');
const sendButton = mainContainer.querySelector('.img-upload__submit');

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentsInput = uploadForm.querySelector('.text__description');

const resetModalState = () => {
  inputFile.value = '';
  hashtagsInput.value = '';
  commentsInput.value = '';
};

const disableForm = () => {
  sendButton.disabled = true;
  hashtagsInput.disabled = true;
  commentsInput.disabled = true;
};

const enableForm = () => {
  sendButton.disabled = false;
  hashtagsInput.disabled = false;
  commentsInput.disabled = false;
};

const openModal = () => {
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadOverlay.classList.remove('hidden');

  pristine.validate();
  sendButton.disabled = !pristine.validate();
};

const closeModal = () => {
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadOverlay.classList.add('hidden');

  resetModalState();
  resetPreviewImage();
  resetFilterSettings();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const onSuccess = () => {
  showConfirmedToast('success');
  closeModal();
};

const onError = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  showConfirmedToast('error', () => document.addEventListener('keydown', onDocumentKeydown));
};

const onFinally = () => {
  enableForm();
  enableScaleButtons();
  enableSlider();
};

const onSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(uploadForm);

  disableForm();
  disableScaleButtons();
  disableSlider();

  sendData(formData)
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
};

/**
 *
 */
const initUploadHandlers = () => {
  inputFile.addEventListener('change', () => {
    openModal();
  });

  cancelButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeModal();
  });

  cancelButton.addEventListener('keypress', (evt) => {
    if (isEnterKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  });

  hashtagsInput.addEventListener('input', () => {
    sendButton.disabled = !pristine.validate();
    pristine.validate(hashtagsInput);
  });

  commentsInput.addEventListener('input', () => {
    sendButton.disabled = !pristine.validate();
    pristine.validate(commentsInput);
  });

  hashtagsInput.addEventListener('focus', () => document.removeEventListener('keydown', onDocumentKeydown));
  commentsInput.addEventListener('focus', () => document.removeEventListener('keydown', onDocumentKeydown));

  hashtagsInput.addEventListener('blur', () => document.addEventListener('keydown', onDocumentKeydown));
  commentsInput.addEventListener('blur', () => document.addEventListener('keydown', onDocumentKeydown));

  uploadForm.addEventListener('submit', onSubmit);
};

export { initUploadHandlers };
