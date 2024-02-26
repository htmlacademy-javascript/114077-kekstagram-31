import { getRandomInteger, createRandomIdFromRangeGenerator } from '/js/shared/utils';
import { createCommentMock } from '../comments';

const PHOTO_ID_MIN = 1;
const PHOTO_ID_MAX = 25;

const PHOTO_URL_INDEX_MIN = 1;
const PHOTO_URL_INDEX_MAX = 25;

const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;

const COMMENTS_COUNT_MIN = 0;
const COMMENTS_COUNT_MAX = 30;

const PHOTO_FOLDER = 'photos';
const PHOTO_NAME_PREFIX = '';
const PHOTO_EXTENSION = 'jpg';

const RANDOM_DESCRIPTION = {
  who: ['Человек', 'Кот', 'Собака', 'Лиса', 'Медведь', 'Птица', 'Ребёнок', 'Учитель', 'Друг', 'Герой'],
  what: ['бегает', 'прыгает', 'плавает', 'летает', 'поёт', 'танцует', 'смеётся', 'учит', 'играет', 'готовит'],
  how: ['быстро', 'медленно', 'легко', 'тяжело', 'весело', 'грустно', 'смешно', 'серьёзно', 'осторожно', 'беззаботно']
};

const createDescription = (descriptionDictionary) => () => {
  const getDescriptionPart = (descriptionKey) => {
    const max = descriptionDictionary[descriptionKey].length - 1;
    return descriptionDictionary[descriptionKey][getRandomInteger(0, max)];
  };

  return Object.keys(descriptionDictionary).map(getDescriptionPart).join(' ');
};

const createRandomPhotoUrlFromRange = (min, max) => {
  const getUniqIndex = createRandomIdFromRangeGenerator(min, max);

  return (folder = 'photo', prefix = '', extension = 'jpg') => {
    const name = `${prefix}${getUniqIndex()}`;
    return `${folder}/${name}.${extension}`;
  };
};

const generatePhotoId = createRandomIdFromRangeGenerator(PHOTO_ID_MIN, PHOTO_ID_MAX);
const generatePhotoUrl = createRandomPhotoUrlFromRange(PHOTO_URL_INDEX_MIN, PHOTO_URL_INDEX_MAX);
const generateRandomDescription = createDescription(RANDOM_DESCRIPTION);
const generateLikes = () => getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX);
const generateComments = () => Array.from({ length: getRandomInteger(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX) }, createCommentMock);

const createPhotoMock = () => ({
  id: generatePhotoId(),
  url: generatePhotoUrl(PHOTO_FOLDER, PHOTO_NAME_PREFIX, PHOTO_EXTENSION),
  description: generateRandomDescription(),
  likes: generateLikes(),
  comments: generateComments(),
});

export {
  createPhotoMock
};
