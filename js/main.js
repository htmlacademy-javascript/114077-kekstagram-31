import { createPhotoMock } from '/js/entities/photo/model';
import { initModalHandlers } from '/js/shared/modal-handlers';
import { initUploadHandlers } from '/js/features/image-upload';
import { renderImageTiles } from '/js/features/render-image-tiles';

const PHOTOS_COUNT_MAX = 25;
const photos = Array.from({ length: PHOTOS_COUNT_MAX }, createPhotoMock);

initModalHandlers();
initUploadHandlers();
renderImageTiles(photos);
