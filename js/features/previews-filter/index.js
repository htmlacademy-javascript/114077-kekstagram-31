import { renderPreviewPictures, getPicturesFromStore } from '../render-preview-pictures';

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const filterButtons = filterForm.querySelectorAll('.img-filters__button');

const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const RANDOM_COUNT = 10;

const FilterButtonIds = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const showFilters = () => {
  console.log('SHOW');
  filterContainer.classList.remove('img-filters--inactive');
};

const setActiveButton = (button) => {
  filterButtons.forEach((btn) => btn.classList.remove(BUTTON_ACTIVE_CLASS));
  button.classList.add(BUTTON_ACTIVE_CLASS);
};

const getSortedByCommentsDESC = (pictures) => pictures.sort((a, b) => b.comments.length - a.comments.length);

const getRandomPictures = (pictures, count) => pictures.sort(() => Math.random() - 0.5).slice(0, count);

const onButtonClick = (button) => (evt) => {
  evt.preventDefault();
  setActiveButton(evt.currentTarget);

  const pictures = getPicturesFromStore();

  switch (button.id) {
    case FilterButtonIds.random:
      renderPreviewPictures(getRandomPictures(pictures.slice(), RANDOM_COUNT));
      break;
    case FilterButtonIds.discussed:
      renderPreviewPictures(getSortedByCommentsDESC(pictures.slice()));
      break;
    case FilterButtonIds.default:
      renderPreviewPictures(pictures);
      break;
    default:
      throw Error('Проверьте правильность идентификатора фильтра');
  }
};



filterForm.addEventListener('submit', (evt) => evt.preventDefault());

filterButtons.forEach((button) => {
  button.addEventListener('click', onButtonClick(button));
});

export {
  showFilters,
};
