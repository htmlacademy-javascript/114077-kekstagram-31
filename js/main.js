import { createPhotoMock } from './features/photos';

const PHOTOS_COUNT_MAX = 25;
Array.from({ length: PHOTOS_COUNT_MAX }, createPhotoMock);
