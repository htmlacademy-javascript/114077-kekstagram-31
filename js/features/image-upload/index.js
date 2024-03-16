import { sendData } from '/js/shared/api';
import { isEnterKey, isEscapeKey } from '/js/shared/utils';
import { showConfirmedToast } from '/js/shared/toast-message';

import { pristine } from '/js/features/image-upload/validation/';
import { resetPreviewImage, disableScaleButtons, enableScaleButtons } from '/js/features/scale-control';
import { resetEffectSettings, disableSlider, enableSlider } from '/js/features/effect-control';

const mainContainer = document.querySelector('.img-upload');

const inputFile = mainContainer.querySelector('.img-upload__input');
const previewImageContainer = mainContainer.querySelector('.img-upload__preview');
const imageElement = previewImageContainer.querySelector('img');

const imgUploadOverlay = mainContainer.querySelector('.img-upload__overlay');
const cancelButton = mainContainer.querySelector('.img-upload__cancel');
const sendButton = mainContainer.querySelector('.img-upload__submit');

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentsInput = uploadForm.querySelector('.text__description');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
  resetEffectSettings();
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

const setLoadedImage = (file) => {
  const blodUrl = URL.createObjectURL(file);

  imageElement.src = blodUrl;
  document.querySelectorAll('.effects__preview')
    .forEach((effectPreviewElement) => {
      effectPreviewElement.style.backgroundImage = `url(${blodUrl})`;
    });
};

/**
 *
 */
const initUploadHandlers = () => {
  inputFile.addEventListener('change', () => {
    const file = inputFile.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      setLoadedImage(file);
      openModal();
    } else {
      showConfirmedToast('error', closeModal);
    }
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
