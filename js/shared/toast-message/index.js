import { fillDocumentFragment } from '../fill-document-fragment';
import {isEscapeKey} from '../utils';

const TOAST_LIFETIME_MS = 5000;
let timer;
let escCallbackPointer;

const createToast = (toastType) => {
  const container = document.querySelector(`#${toastType}`).content;
  const toastCloned = container.cloneNode(true);
  document.body.append(fillDocumentFragment([toastCloned]));
};

const removeToast = (toastElement, callback) => {
  document.body.removeChild(toastElement);
  document.removeEventListener('keydown', escCallbackPointer);

  if (callback) {
    callback();
  }
};

const expireHandler = (toastElement, ms, callback) => {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    removeToast(toastElement);

    if (callback) {
      callback();
    }
  }, ms);
};

const confirmHandler = (toastElement, callback) => {
  const button = toastElement.querySelector('button[type="button"]');
  escCallbackPointer = onEscKeydown(toastElement, callback);

  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    removeToast(toastElement, callback);
  });

  toastElement.addEventListener('click', (evt) => {
    evt.stopPropagation();

    if (evt.target.classList.contains(toastElement.className)) {
      removeToast(toastElement, callback);
    }
  });

  document.addEventListener('keydown', escCallbackPointer);
};

function onEscKeydown(toastElement, callback) {
  return function(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeToast(toastElement, callback);
    }
  };
}

const showExpiredToast = (toastType, callback) => {
  createToast(toastType);
  const toastElement = document.querySelector(`.${toastType}`);
  expireHandler(toastElement, TOAST_LIFETIME_MS, callback);
};

const showConfirmedToast = (toastType, callback) => {
  createToast(toastType);
  const toastElement = document.querySelector(`.${toastType}`);
  confirmHandler(toastElement, callback);
};


export { showExpiredToast, showConfirmedToast };
