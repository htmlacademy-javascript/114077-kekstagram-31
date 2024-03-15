import { renderPreviewPictures, getPicturesFromStore } from '/js/features/render-preview-pictures';

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const filterButtons = filterForm.querySelectorAll('.img-filters__button');

const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const RANDOM_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let timer;

const FilterButtonIds = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const showFilters = () => {
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
  clearTimeout(timer);

  const pictures = getPicturesFromStore();

  switch (button.id) {
    case FilterButtonIds.random:
      timer = setTimeout(() => {
        renderPreviewPictures(getRandomPictures(pictures.slice(), RANDOM_COUNT));
      }, DEBOUNCE_DELAY);
      break;
    case FilterButtonIds.discussed:
      timer = setTimeout(() => {
        renderPreviewPictures(getSortedByCommentsDESC(pictures.slice()));
      }, DEBOUNCE_DELAY);
      break;
    case FilterButtonIds.default:
      timer = setTimeout(() => {
        renderPreviewPictures(pictures);
      }, DEBOUNCE_DELAY);
      break;
    default:
      throw Error('Проверьте правильность идентификатора фильтра');
  }
};

const initPreviewFilter = () => {
  showFilters();

  filterForm.addEventListener('submit', (evt) => evt.preventDefault());

  filterButtons.forEach((button) => {
    button.addEventListener('click', onButtonClick(button));
  });
};

export { initPreviewFilter };
