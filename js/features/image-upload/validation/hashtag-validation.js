const hashTagRx = /^#[a-zа-яё0-9]{1,19}$/i;

const QUANTITY_LIMIT = 5;
const HASHTAG_SEPARATOR = ' ';
const JOIN_ERROR_SIGN = ' / ';

const errorMessages = {
  matchError: {
    status: false,
    message: 'Введён невалидный хэштег',
  },
  quantityError: {
    status: false,
    message: `Превышено количество хэштегов (максимум ${QUANTITY_LIMIT})`,
  },
  repeatError: {
    status: false,
    message: 'Хэштеги повторяются'
  },
};

const isHashtagsValid = (value) => {
  const splittedValue = value.trim()
    .split(HASHTAG_SEPARATOR)
    .filter((item) => item)
    .map((item) => item.toLowerCase());

  const matchValidation = (item) => item && !hashTagRx.test(item);
  const repeatValidation = (item, index) => item && splittedValue.indexOf(item) !== -1 && splittedValue.indexOf(item) !== index;

  errorMessages.matchError.status = splittedValue.some(matchValidation);
  errorMessages.quantityError.status = splittedValue.length > QUANTITY_LIMIT;
  errorMessages.repeatError.status = splittedValue.some(repeatValidation);

  return !(Object.keys(errorMessages).some((type) => errorMessages[type].status));
};

const hashtagsErrorMessage = () => {
  const joinedError = Object.keys(errorMessages)
    .filter((type) => errorMessages[type].status)
    .map((type) => errorMessages[type].message)
    .join(JOIN_ERROR_SIGN);

  return joinedError;
};

export {
  isHashtagsValid,
  hashtagsErrorMessage
};
