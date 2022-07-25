import {showAlert} from './util.js';

const SERVER_DATA = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(SERVER_DATA)
    .then((response) => response.json())
    .then((photo) => onSuccess(photo))
    .catch(() => {
      showAlert('Не удалось получить изображения. Обновите страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
