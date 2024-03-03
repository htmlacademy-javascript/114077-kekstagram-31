import { createPhotoMock } from '/js/entities/photo';
import { renderImageTiles } from '/js/features/render-image-tiles';

const PHOTOS_COUNT_MAX = 25;
const photos = Array.from({ length: PHOTOS_COUNT_MAX }, createPhotoMock);

renderImageTiles(photos);
