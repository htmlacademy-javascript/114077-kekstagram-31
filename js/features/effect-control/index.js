import { chrome, sepia, marvin, phobos, heat } from '/js/features/effect-control/slider-configs';

const effectLevelContainer = document.querySelector('.img-upload__effect-level');

const sliderContainer = effectLevelContainer.querySelector('.effect-level__slider');
const effectLevelInput = effectLevelContainer.querySelector('.effect-level__value');

const previewImageContainer = document.querySelector('.img-upload__preview');
const previewImage = previewImageContainer.querySelector('img');

const effectInputs = document.querySelectorAll('.effects__radio');

const effectConfigs = [chrome, sepia, marvin, phobos, heat];

// При изменении пишем данные в скрытое поле

const recreateSlider = (config) => {
  if (sliderContainer.noUiSlider) {
    sliderContainer.noUiSlider.destroy();
  }

  noUiSlider.create(sliderContainer, config.sliderConfig);

  sliderContainer.noUiSlider.on('update', () => {
    effectLevelInput.value = +sliderContainer.noUiSlider.get();
    previewImage.style.filter = config.filterValue(sliderContainer.noUiSlider.get());
  });
};

const resetEffectSettings = () => {
  const original = Array.from(effectInputs).find((filterInput) => filterInput.value === 'none');
  original.checked = true;

  effectLevelContainer.classList.add('hidden');
  previewImage.style.filter = 'none';
};

const disableSlider = () => {
  // sliderContainer.noUiSlider.disable(); // доступно только с 15.7.0 версии

  effectInputs.forEach((input) => {
    input.setAttribute('disabled', 'true');
  });
};

const enableSlider = () => {
  // sliderContainer.noUiSlider.enable(); // доступно только с 15.7.0 версии

  effectInputs.forEach((input) => {
    input.removeAttribute('disabled');
  });
};

const initEffectHandlers = () => {
  effectInputs.forEach((filterInput) => {
    filterInput.addEventListener('change', (evt) => {
      evt.preventDefault();
      const currentFilterConfig = Object.assign({}, effectConfigs.find((filter) => filter.inputName === evt.target.value));

      if (evt.target.value === 'none' || !currentFilterConfig) {
        effectLevelContainer.classList.add('hidden');
        previewImage.style.filter = 'none';
      } else {
        effectLevelContainer.classList.remove('hidden');
        recreateSlider(currentFilterConfig);
      }
    });
  });
};

export {
  initEffectHandlers,
  resetEffectSettings,
  disableSlider,
  enableSlider,
};
