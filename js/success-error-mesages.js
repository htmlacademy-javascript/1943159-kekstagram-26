import {onClickEscapeKey} from './util.js';
import {onFormClickEsc} from './edit-form.js';

const bodyElement = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const onErrorClickEsc = (evt) => {
  if(onClickEscapeKey(evt)) {
    evt.preventDefault();
    closeWarningWindow();
  }
};

function closeWarningWindow () {
  const successSection = document.querySelector('.success');
  const errorSection = document.querySelector('.error');

  if (successSection) {
    successSection.remove();
  }

  if (errorSection) {
    errorSection.remove();
  }
  document.addEventListener('keydown', onFormClickEsc);
}

const onAreaWindowClose = (evt) => {
  if (evt.target.closest('section')) {
    closeWarningWindow();
  }
};

const onSuccessForm = () => {
  const cloneSuccess = templateSuccess.cloneNode(true);
  const successButton = cloneSuccess.querySelector('.success__button');
  bodyElement.append(cloneSuccess);

  document.addEventListener('click', onAreaWindowClose);
  document.addEventListener('keydown', onErrorClickEsc);
  successButton.addEventListener('click', closeWarningWindow);
};

const onErrorForm = (unblock) => {
  const cloneError = templateError.cloneNode(true);
  const errorButton = cloneError.querySelector('.error__button');
  bodyElement.append(cloneError);
  unblock();

  document.addEventListener('click', onAreaWindowClose);
  document.addEventListener('keydown', onErrorClickEsc);
  errorButton.addEventListener('click', closeWarningWindow);
  document.removeEventListener('keydown', onFormClickEsc);
};

export {onSuccessForm, onErrorForm};
