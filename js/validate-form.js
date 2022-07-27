import { checkStringLength} from './util.js';
import { sendDataServer } from './api.js';
import { closeForm } from './edit-form.js';
import { onSuccessForm, onErrorForm } from './success-error-mesages.js';

const STRING_LENGTH = 20;
const MAX_HASHTAGS = 5;

const form = document.querySelector('.img-upload__form');
const formButton = document.querySelector('.img-upload__submit');
const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');

const regular = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error-text',
});

const blockSubmitButton = () => {
  formButton.disabled = true;
  formButton.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  formButton.disabled = false;
  formButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = () => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    if (pristine.validate()) {
      blockSubmitButton();
      onSuccessForm();
      sendDataServer(formData, closeForm, unblockSubmitButton);

    } else {
      onErrorForm(unblockSubmitButton);
    }
  });
};

const checkHashtagRegExp = (value) => regular.test(value);

const checkValidHashtag = (value) => value === '' || value.split(' ').every(checkHashtagRegExp);

pristine.addValidator(hashtagInput, checkValidHashtag, 'Хештег должен начинаться с # и не должен состоять из (#, @, $...), и не может содержать пробелы');

const checkHashTagLength = (value) => {
  const hashTag = value.split(' ');

  return hashTag.every((item) => item.length <= STRING_LENGTH);
};
pristine.addValidator(hashtagInput, checkHashTagLength, `Максимальная длина одного хэш-тега ${STRING_LENGTH} символов`);

const checkHashTagCount = (value) => {
  const hashTag = value.split(' ');
  if (hashTag.length <= MAX_HASHTAGS) {
    return hashTag;
  }
  return false;
};
pristine.addValidator(hashtagInput, checkHashTagCount, 'Хештегов может быть не больше 5');

const checkSimilarHashTag = (value) => {
  const hashTag = value.toLowerCase().split(' ');
  return new Set(hashTag).size === hashTag.length;
};
pristine.addValidator(hashtagInput, checkSimilarHashTag, 'Один и тот же хэш-тег не может быть использован дважды;');

pristine.addValidator(commentArea, checkStringLength, 'Комментарий не должен привышать 140 символов');

export {commentArea, hashtagInput, setUserFormSubmit};
