const container = document.querySelector('.big-picture');
const closeButton = document.querySelector('#picture-cancel');

const prepareData = ({ id, url, description, likes, comments }) => {
  const imgEl = container.querySelector('.big-picture__img').querySelector('img');
  const likeEl = container.querySelector('.likes-count');
  const descriptionEl = container.querySelector('');

  imgEl.src = url;
  likeEl.textContent = likes;
};

const openImageModal = () => {
  container.classList.remove('hidden');
};

const closeImageModal = () => {
  container.classList.add('hidden');
};

const initFullImage = () => {
  console.log('init');

  closeButton.addEventListener('click', (evt) => {
    closeImageModal();
  });
};

export {
  prepareData,
  openImageModal,
  closeImageModal,
  initFullImage,
};
