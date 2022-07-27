import {onClickEscapeKey, stopListener} from './util.js';
import {hashtagInput, commentArea} from './validate-form.js';
import {onScalePlusClick, onScaleRemoveClick, getScaleDefault} from './photo-zoom.js';
import {onChangeEffect, imgUploadPreview} from './slider.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('#upload-file');
const imgElement = document.querySelector('.img-upload__overlay');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const closeImgButtonElement = imgElement.querySelector('#upload-cancel');

const resetForm = () => {
  fileChooserElement.value = '';
  hashtagInput.value = '';
  commentArea.value = '';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.className = 'effects__preview--none';
};

const closeForm = () => {
  imgElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onFormClickEsc);
  closeImgButtonElement.removeEventListener('click', closeForm);
  resetForm();
  onScaleRemoveClick();
};

function onFormClickEsc (evt) {
  if(onClickEscapeKey(evt)) {
    closeForm();
  }
}

const uploadPhotosModal = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const fileNameMatches = FILE_TYPES.some((element) => fileName.endsWith(element));

    if(fileNameMatches) {
      imgPreviewElement.src = URL.createObjectURL(file);
      imgElement.classList.remove('hidden');
      document.body.classList.add('modal-open');

      closeImgButtonElement.addEventListener('click', closeForm);
      document.addEventListener('keydown', onFormClickEsc);
    }

    stopListener(hashtagInput, commentArea);
    getScaleDefault();
    onScalePlusClick();
    onChangeEffect();
  });
};

export {uploadPhotosModal, closeForm, onFormClickEsc};
