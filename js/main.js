import { createPhotoMock } from '/js/entities/photo/model';
import { renderImageTiles } from '/js/features/render-image-tiles';
import { initModalHandlers } from '/js/shared/modal-handlers';

const PHOTOS_COUNT_MAX = 25;
const photos = Array.from({ length: PHOTOS_COUNT_MAX }, createPhotoMock);

renderImageTiles(photos);
initModalHandlers();
