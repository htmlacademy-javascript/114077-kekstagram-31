import { createPhotoMock } from '/js/entities/photo';
import { createTileImage, onTileClick } from '/js/features/create-tile-image';
import { renderDocumentFragment } from '/js/features/render-document-fragment';
import { initFullImage } from './features/create-full-image';

const PHOTOS_COUNT_MAX = 25;
const photos = Array.from({ length: PHOTOS_COUNT_MAX }, createPhotoMock);

const picturesPlace = document.querySelector('.pictures');
const documentFragment = renderDocumentFragment(photos.map(createTileImage));

picturesPlace.append(documentFragment);

const pictureEls = picturesPlace.querySelectorAll('.picture');

pictureEls.forEach((pictureEl) => {
  console.log('pictureEl', pictureEl);
  pictureEl.addEventListener('click', (evt) => {
    onTileClick(evt, photos);
  });
});

initFullImage();
