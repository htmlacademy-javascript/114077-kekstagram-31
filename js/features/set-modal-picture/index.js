const modalContainer = document.querySelector('.big-picture');

const imgEl = modalContainer.querySelector('.big-picture__img').querySelector('img');
const likesCountEl = modalContainer.querySelector('.likes-count');

const socialHeaderEl = modalContainer.querySelector('.social__header');
const descriptionEl = socialHeaderEl.querySelector('.social__caption');

/**
 * Прописывает в модальном окне корректную фотографию
 *
 * @param {PictureItem} pictureItem
 * @param photoItem.url
 * @param photoItem.description
 * @param photoItem.likes
 */
const setModalPicture = ({ url, description, likes}) => {
  imgEl.src = url;
  imgEl.alt = description;
  likesCountEl.textContent = likes.toString();

  descriptionEl.textContent = description;
};

export { setModalPicture };
