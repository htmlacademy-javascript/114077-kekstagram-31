import { fillDocumentFragment } from '/js/shared/fill-document-fragment';
import { openImageModal } from '/js/shared/modal-handlers';
import { createTileImage } from '/js/entities/photo';
import { setModalImage } from '/js/features/set-modal-image';
import { prepareCommentRender } from '/js/features/render-comments-section';

const picturesPlace = document.querySelector('.pictures');

const getClickTileHandler = (photos) => (evt) => {
  evt.preventDefault();

  const actualData = photos.find((photo) => evt.currentTarget.dataset.id === photo.id.toString());

  setModalImage(actualData);
  prepareCommentRender(actualData.comments);

  openImageModal();
};

const imageTilesHandlers = (photos) => {
  const pictureEls = picturesPlace.querySelectorAll('.picture');

  pictureEls.forEach((pictureEl) => {
    pictureEl.addEventListener('click', getClickTileHandler(photos));
  });
};

/**
 *
 * @param {PhotoItem[]} photos - массив данных для отрисовки фотографий
 *
 */
const renderImageTiles = (photos) => {
  const documentFragment = fillDocumentFragment(photos.map(createTileImage));
  picturesPlace.append(documentFragment);

  imageTilesHandlers(photos);
};

export { renderImageTiles };
