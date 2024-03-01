import { createPhotoMock } from '/js/entities/photo';
import { createPreviewImage } from '/js/features/create-preview-image';
import { renderDocumentFragment } from '/js/features/render-document-fragment';

const PHOTOS_COUNT_MAX = 25;
const photos = Array.from({ length: PHOTOS_COUNT_MAX }, createPhotoMock);

const picturesPlace = document.querySelector('.pictures');
const documentFragment = renderDocumentFragment(photos.map(createPreviewImage));

picturesPlace.append(documentFragment);
