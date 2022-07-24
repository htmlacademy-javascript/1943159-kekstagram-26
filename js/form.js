import {isEscapePressed, getLengthComparison, checkUniqueness} from './util.js';
import {resetScale} from './image-editing.js';

const uploadContainer = document.querySelector('.img-upload');
const uploadForm = uploadContainer.querySelector('.img-upload__form');
const uploadOverlay = uploadContainer.querySelector('.img-upload__overlay');
const uploadInput = uploadContainer.querySelector('#upload-file');
const body = document.querySelector('body');
const uploadCancelButton = uploadContainer.querySelector('#upload-cancel');
const uploadHashtag = uploadContainer.querySelector('.text__hashtags');
const uploadComment = uploadContainer.querySelector('.text__description');
const maxCommentLength = 140;
const maxHashtagsLength = 5;
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const onPopupEscKeydown = (evt) => {
  if (uploadHashtag === document.activeElement || uploadComment === document.activeElement) {
    return evt;
  }
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    overlayClose();
  }
};

function overlayOpen () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function overlayClose () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadInput.value = '';
  uploadHashtag.value = '';
  uploadComment.value = '';
}

resetScale();

uploadInput.addEventListener('change', overlayOpen);
uploadCancelButton.addEventListener('click', overlayClose);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

const splitHashtags = (value) => value.toLowerCase().split(' ');

const checkHashtagsLength = (value) => splitHashtags(value).length <= maxHashtagsLength;

const validateHashtag = (value) => splitHashtags(value).every((item) => re.test(item)) || value[0] === '';

const checkUniqueHashtags = (value) => checkUniqueness(splitHashtags(value));

const validateUploadComment = (value) => getLengthComparison(value, maxCommentLength);

pristine.addValidator(uploadHashtag, checkHashtagsLength, `Нельзя указать больше ${maxHashtagsLength} хэш-тегов`);
pristine.addValidator(uploadHashtag, validateHashtag, 'Хэш-тег начинается с символа #, строка должна состоять из букв и чисел, максимальная длина 20 символов');
pristine.addValidator(uploadHashtag, checkUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(uploadComment, validateUploadComment, `Длина комментария не может составлять больше ${maxCommentLength} символов!`);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});
