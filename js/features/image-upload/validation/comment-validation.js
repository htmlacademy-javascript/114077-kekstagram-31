const MAX_LENGTH = 140;

const isCommentValid = (value) => parseInt(value.length, 10) <= MAX_LENGTH;

const commentErrorMessage = () => `Длина комментария больше ${MAX_LENGTH} символов`;

export {
  isCommentValid,
  commentErrorMessage
};
