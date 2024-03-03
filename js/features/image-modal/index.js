import { isEnterKey, isEscapeKey } from '/js/shared/utils';
import { fillDocumentFragment } from '/js/shared/fill-document-fragment';
import { createCommentElement } from '/js/features/image-comment';

const modalEl = document.querySelector('.big-picture');
const closeButton = document.querySelector('#picture-cancel');

const imgEl = modalEl.querySelector('.big-picture__img').querySelector('img');
const likesCountEl = modalEl.querySelector('.likes-count');

const socialHeaderEl = modalEl.querySelector('.social__header');
const descriptionEl = socialHeaderEl.querySelector('.social__caption');

const socialCommentCountEl = modalEl.querySelector('.social__comment-count');
const shownCommentCount = socialCommentCountEl.querySelector('.social__comment-shown-count');
const allCommentCount = socialCommentCountEl.querySelector('.social__comment-total-count');

const socialCommentsContainer = modalEl.querySelector('.social__comments');
const commentsLoaderEl = modalEl.querySelector('.comments-loader');

const COMMENT_LOADING_STEP = 5;

/**
 *
 * @param {string} url
 * @param {string} description
 * @param {number} likes
 * @param {CommentItem[]} comments
 */
const prepareImageModal = ({ url, description, likes, comments }) => {
  imgEl.src = url;
  imgEl.alt = description;
  likesCountEl.textContent = likes.toString();

  descriptionEl.textContent = description;

  shownCommentCount.textContent = COMMENT_LOADING_STEP.toString();
  allCommentCount.textContent = comments.length;

  // TODO: отрефакторить на след.шаге
  const documentFragment = fillDocumentFragment(comments.map(createCommentElement));
  socialCommentsContainer.innerHTML = '';
  socialCommentsContainer.append(documentFragment);

  socialCommentCountEl.classList.add('hidden');
  commentsLoaderEl.classList.add('hidden');
};

const openImageModal = () => {
  document.body.classList.add('modal-open');
  modalEl.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeImageModal = () => {
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

export {
  prepareImageModal,
  openImageModal,
};
