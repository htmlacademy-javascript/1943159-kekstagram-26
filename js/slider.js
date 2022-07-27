const imgUploadPreview = document.querySelector('.img-upload__preview img');

const sliderValue = document.querySelector('.effect-level__value');
const effectsRadio = document.querySelectorAll('.effects__radio');

const effectsBlock = document.querySelector('.img-upload__effect-level');
const effectsBlockSlider = document.querySelector('.effect-level__slider');

const effects = {

  chrome: {
    effect: 'chrome',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },

  sepia: {
    effect: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },

  marvin: {
    effect: 'marvin',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },

  phobos: {
    effect: 'phobos',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },

  heat: {
    effect: 'heat',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },

};

noUiSlider.create(effectsBlockSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const getSliderEffect = () => {
  effectsBlockSlider.noUiSlider.on('update', () => {
    sliderValue.value = effectsBlockSlider.noUiSlider.get();

    const effectsClass = imgUploadPreview.className;

    switch (effectsClass) {

      case 'effects__preview--chrome':
        imgUploadPreview.style.filter = `grayscale(${sliderValue.value})`;
        effectsBlock.classList.remove('hidden');
        break;

      case 'effects__preview--sepia':
        imgUploadPreview.style.filter = `sepia(${sliderValue.value})`;
        effectsBlock.classList.remove('hidden');
        break;

      case 'effects__preview--marvin':
        imgUploadPreview.style.filter = `invert(${sliderValue.value}%)`;
        effectsBlock.classList.remove('hidden');
        break;

      case 'effects__preview--phobos':
        imgUploadPreview.style.filter = `blur(${sliderValue.value}px)`;
        effectsBlock.classList.remove('hidden');
        break;

      case 'effects__preview--heat':
        imgUploadPreview.style.filter = `brightness(${sliderValue.value})`;
        effectsBlock.classList.remove('hidden');
        break;

      default:
        imgUploadPreview.className = 'effects__preview--none';
        imgUploadPreview.style.filter = 'none';
        effectsBlock.classList.add('hidden');
    }
  });
};

const onChangeEffect = () => {

  effectsRadio.forEach((filter) => {
    const {chrome, sepia, marvin, phobos, heat} = effects;

    filter.addEventListener('click', () => {

      if(filter.matches('#effect-none') && filter.checked) {
        imgUploadPreview.className = 'effects__preview--none';
        imgUploadPreview.style.filter = 'none';
        effectsBlock.classList.add('hidden');
      }

      if(filter.matches('#effect-chrome')) {
        imgUploadPreview.className = `effects__preview--${chrome.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: chrome.range.min,
            max: chrome.range.max,
          },
          start: chrome.start,
          step: chrome.step,
        });
      }

      if (filter.matches('#effect-sepia')) {
        imgUploadPreview.className = `effects__preview--${sepia.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: sepia.range.min,
            max: sepia.range.max,
          },
          start: sepia.start,
          step: sepia.step,
        });
      }

      if (filter.matches('#effect-marvin')) {
        imgUploadPreview.className = `effects__preview--${marvin.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: marvin.range.min,
            max: marvin.range.max,
          },
          start: marvin.start,
          step: marvin.step,
        });
      }

      if (filter.matches('#effect-phobos')) {
        imgUploadPreview.className = `effects__preview--${phobos.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: phobos.range.min,
            max: phobos.range.max,
          },
          start: phobos.start,
          step: phobos.step,
        });
      }

      if (filter.matches('#effect-heat')) {
        imgUploadPreview.className = `effects__preview--${heat.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: heat.range.min,
            max: heat.range.max,
          },
          start: heat.start,
          step: heat.step,
        });
      }
    });
    getSliderEffect();
  });
};

export {onChangeEffect, imgUploadPreview};
