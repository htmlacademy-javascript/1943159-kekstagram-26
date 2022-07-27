const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleValue = imgUploadScale.querySelector('.scale__control--value');
const scaleButtonDown = imgUploadScale.querySelector('.scale__control--smaller');
const scaleButtonUp = imgUploadScale.querySelector('.scale__control--bigger');

const scaleImgPreview = document.querySelector('.img-upload__preview img');

const getScaleValue = () => parseInt(scaleValue.value, 10);

const getScaleDown = () => {
  const {STEP, MIN} = Scale;

  scaleValue.value = `${getScaleValue() - STEP}%`;
  const percentValue = getScaleValue() / 100;
  scaleImgPreview.style.transform = `scale(${percentValue})`;

  if (getScaleValue() <= MIN) {
    scaleValue.value = `${MIN }%`;
    scaleImgPreview.style.transform = `scale(${getScaleValue() / 100})`;
  }
};

const getScaleUp = () => {
  const {STEP, MAX} = Scale;

  scaleValue.value = `${getScaleValue() + STEP}%` ;
  const percentValue = getScaleValue() / 100;
  scaleImgPreview.style.transform = `scale(${percentValue})`;

  if (getScaleValue() >= MAX) {
    scaleValue.value = `${MAX }%`;
    scaleImgPreview.style.transform = `scale(${getScaleValue() / 100})`;
  }
};

const getScaleDefault = () => {
  const {MAX} = Scale;

  scaleImgPreview.style.transform = `scale(${MAX / 100})`;
  scaleValue.value = `${MAX}%`;
  scaleValue.setAttribute('readonly', 'readonly');
};

const onScalePlusClick = () => {
  scaleButtonDown.addEventListener('click', getScaleDown);
  scaleButtonUp.addEventListener('click', getScaleUp);
};

const onScaleRemoveClick = () => {
  scaleButtonDown.removeEventListener('click', getScaleDown);
  scaleButtonUp.removeEventListener('click', getScaleUp);
  scaleImgPreview.removeAttribute = 'style';
};

export {onScalePlusClick, onScaleRemoveClick, getScaleDefault};
