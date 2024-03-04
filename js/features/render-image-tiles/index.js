import { fillDocumentFragment } from '/js/shared/fill-document-fragment';
import { createTileImage } from '/js/features/image-tile';
import { openImageModal, prepareImageModal} from '/js/features/image-modal';

const picturesPlace = document.querySelector('.pictures');

const imageTilesHandlers = (photos) => {
  const pictureEls = picturesPlace.querySelectorAll('.picture');

  pictureEls.forEach((pictureEl) => {
    pictureEl.addEventListener('click', (evt) => {
      evt.preventDefault();

      const actualData = photos.find((photo) => evt.currentTarget.dataset.id === photo.id.toString());

      prepareImageModal(actualData);
      openImageModal();
    });
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
