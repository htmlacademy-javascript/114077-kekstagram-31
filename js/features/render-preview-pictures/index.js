import { createPreviewPicture } from '/js/entities/previews';
import { fillDocumentFragment } from '/js/shared/fill-document-fragment';
import { openPictureModal } from '/js/shared/modal-handlers';
import { setModalPicture } from '/js/features/set-modal-picture';
import { prepareCommentRender } from '/js/features/render-comments-section';

const store = { pictures: [] };
const picturesPlace = document.querySelector('.pictures');

const getClickTileHandler = (pictures) => (evt) => {
  evt.preventDefault();

  const actualData = pictures.find((picture) => evt.currentTarget.dataset.id === picture.id.toString());

  setModalPicture(actualData);
  prepareCommentRender(actualData.comments);

  openPictureModal();
};

const imageTilesHandlers = (pictures) => {
  const pictureEls = picturesPlace.querySelectorAll('.picture');

  pictureEls.forEach((pictureEl) => {
    pictureEl.addEventListener('click', getClickTileHandler(pictures));
  });
};

const removePreviewPictures = () => {
  const pictures = picturesPlace.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const savePicturesInStore = (pictures) => {
  store.pictures = pictures;
};

const getPicturesFromStore = () => store.pictures;

/**
 *
 * @param {PictureItem[]} pictures - массив данных для отрисовки фотографий
 *
 */
const renderPreviewPictures = (pictures) => {
  removePreviewPictures();

  const documentFragment = fillDocumentFragment(pictures.map(createPreviewPicture));
  picturesPlace.append(documentFragment);
  imageTilesHandlers(pictures);
};

export { savePicturesInStore, renderPreviewPictures, getPicturesFromStore };
