// CONST

const PHOTO_ID_MIN = 1;
const PHOTO_ID_MAX = 25;

const PHOTO_URL_INDEX_MIN = 1;
const PHOTO_URL_INDEX_MAX = 25;

const AVATAR_INDEX_MIN = 1;
const AVATAR_INDEX_MAX = 6;

const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;

const COMMENTS_COUNT_MIN = 0;
const COMMENTS_COUNT_MAX = 30;

const AVATAR_FOLDER = 'img';
const AVATAR_NAME_PREFIX = 'avatar-';
const AVATAR_EXTENSION = 'svg';

const PHOTO_FOLDER = 'photos';
const PHOTO_NAME_PREFIX = '';
const PHOTO_EXTENSION = 'jpg';

const PHOTOS_COUNT_MAX = 25;

// DATA

const NAMES = ['Ксения', 'Лев', 'Моника', 'Таисия', 'Сергей', 'Валерия', 'Фёдор', 'Дмитрий', 'Григорий', 'Михаил', 'Давид', 'Арина', 'Марта', 'Маргарита', 'Ярослав', 'Елена', 'Илья', 'Алиса', 'Андрей', 'Мария'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const RANDOM_DESCRIPTION = {
  who: ['Человек', 'Кот', 'Собака', 'Лиса', 'Медведь', 'Птица', 'Ребёнок', 'Учитель', 'Друг', 'Герой'],
  what: ['бегает', 'прыгает', 'плавает', 'летает', 'поёт', 'танцует', 'смеётся', 'учит', 'играет', 'готовит'],
  how: ['быстро', 'медленно', 'легко', 'тяжело', 'весело', 'грустно', 'смешно', 'серьёзно', 'осторожно', 'беззаботно']
};

// LIBS

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min = 0, max = 1) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const createConsistentIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
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

const createRandomAvatarUrlFromRange = (min, max) => (folder = 'img', prefix = 'avatar-', extension = 'svg') => {
  const name = `${prefix}${getRandomInteger(min, max)}`;
  return `${folder}/${name}.${extension}`;
};

const createCommentMessage = (min, max) => (messages) => {
  const limit = getRandomInteger(min, max);

  const selectedMessages = [];
  const messagesLimit = messages.length - 1;

  for (let i = 0; i <= limit; i++) {
    const message = messages[getRandomInteger(0, messagesLimit)];
    selectedMessages.push(message);
  }

  return selectedMessages.join(' ');
};

const createName = (limit) => (names) => {
  const namesLimit = limit || names.length - 1;
  return names[getRandomInteger(0, namesLimit)];
};

// COMMENTS

const generateCommentId = createConsistentIdGenerator();
const generateAvatar = createRandomAvatarUrlFromRange(AVATAR_INDEX_MIN, AVATAR_INDEX_MAX);
const generateMessage = createCommentMessage(0, 1);
const generateName = createName();

const createCommentMock = () => ({
  id: generateCommentId(),
  avatar: generateAvatar(AVATAR_FOLDER, AVATAR_NAME_PREFIX, AVATAR_EXTENSION), // img/avatar-{{случайное число от 1 до 6}}.svg
  message: generateMessage(MESSAGES), // вам необходимо взять одно или два случайных предложения из представленных в массиве MOCK_MESSAGES
  name: generateName(NAMES),
});

// PHOTOS

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

// RUN

Array.from({ length: PHOTOS_COUNT_MAX }, createPhotoMock);
