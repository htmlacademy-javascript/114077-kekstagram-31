import { hashtagsErrorMessage, isHashtagsValid } from './hashtag-validation';
import { commentErrorMessage, isCommentValid } from './comment-validation';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentsInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(hashtagsInput, isHashtagsValid, hashtagsErrorMessage);
pristine.addValidator(commentsInput, isCommentValid, commentErrorMessage);

export { pristine };
