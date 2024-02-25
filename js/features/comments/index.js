import { getRandomInteger, createConsistentIdGenerator, } from '../../shared/utils';

const AVATAR_INDEX_MIN = 1;
const AVATAR_INDEX_MAX = 6;

const AVATAR_FOLDER = 'img';
const AVATAR_NAME_PREFIX = 'avatar-';
const AVATAR_EXTENSION = 'svg';

const NAMES = ['Ксения', 'Лев', 'Моника', 'Таисия', 'Сергей', 'Валерия', 'Фёдор', 'Дмитрий', 'Григорий', 'Михаил', 'Давид', 'Арина', 'Марта', 'Маргарита', 'Ярослав', 'Елена', 'Илья', 'Алиса', 'Андрей', 'Мария'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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

export {
  createCommentMock
};
