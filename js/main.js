import { createPhotoMock } from '/js/features/photos';

const PHOTOS_COUNT_MAX = 25;
Array.from({ length: PHOTOS_COUNT_MAX }, createPhotoMock);
