import { fillDocumentFragment } from '/js/shared/fill-document-fragment';
import { createCommentElement } from '/js/entities/comment';

const modalEl = document.querySelector('.big-picture');

const socialCommentCountEl = modalEl.querySelector('.social__comment-count');
const shownCommentCount = socialCommentCountEl.querySelector('.social__comment-shown-count');
const allCommentCount = socialCommentCountEl.querySelector('.social__comment-total-count');

const socialCommentsContainer = modalEl.querySelector('.social__comments');
const commentsLoaderEl = modalEl.querySelector('.comments-loader');

const COMMENT_LOADING_STEP = 5;

let fromIndex = 0;
let clickCallbackPointer; // ссылка на функцию, чтобы корректно удалить обработчик

const reachedLimitsHandler = (comments) => {
  shownCommentCount.textContent = comments.length.toString();
  commentsLoaderEl.classList.add('hidden');
};

const unreachedLimitsHandler = () => {
  shownCommentCount.textContent = fromIndex.toString();
  commentsLoaderEl.classList.remove('hidden');
};

const renderPartOfComments = (comments) => {
  const commentsPart = comments.slice().splice(fromIndex, COMMENT_LOADING_STEP);
  const documentFragment = fillDocumentFragment(commentsPart.map(createCommentElement));
  socialCommentsContainer.append(documentFragment);

  fromIndex += COMMENT_LOADING_STEP;

  if (fromIndex >= comments.length) {
    reachedLimitsHandler(comments);
  } else {
    unreachedLimitsHandler();
  }
};

function onButtonClick(comments) {
  return function(evt) {
    evt.preventDefault();
    renderPartOfComments(comments);
  };
}

const resetCommentsState = () => {
  fromIndex = 0;
  socialCommentsContainer.innerHTML = '';
  commentsLoaderEl.removeEventListener('click', clickCallbackPointer);
};

const prepareCommentRender = (comments) => {
  resetCommentsState();

  allCommentCount.textContent = comments.length.toString();
  renderPartOfComments(comments);

  clickCallbackPointer = onButtonClick(comments);
  commentsLoaderEl.addEventListener('click', clickCallbackPointer);
};

export { resetCommentsState, prepareCommentRender };
