const modalEl = document.querySelector('.big-picture');

const imgEl = modalEl.querySelector('.big-picture__img').querySelector('img');
const likesCountEl = modalEl.querySelector('.likes-count');

const socialHeaderEl = modalEl.querySelector('.social__header');
const descriptionEl = socialHeaderEl.querySelector('.social__caption');

/**
 * Прописывает в модальном окне корректную фотографию
 *
 * @param {PhotoItem} photoItem
 * @param photoItem.url
 * @param photoItem.description
 * @param photoItem.likes
 */
const setModalImage = ({ url, description, likes}) => {
  imgEl.src = url;
  imgEl.alt = description;
  likesCountEl.textContent = likes.toString();

  descriptionEl.textContent = description;
};

export { setModalImage };
