import { chrome, sepia, marvin, phobos, heat } from '/js/features/filter-control/filter-configs';

const effectLevelContainer = document.querySelector('.img-upload__effect-level');

const sliderContainer = effectLevelContainer.querySelector('.effect-level__slider');
const effectLevelInput = effectLevelContainer.querySelector('.effect-level__value');

const previewImageContainer = document.querySelector('.img-upload__preview');
const previewImage = previewImageContainer.querySelector('img');

const filterInputs = document.querySelectorAll('.effects__radio');

const filterConfigs = [chrome, sepia, marvin, phobos, heat];

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

const resetFilterSettings = () => {
  const original = Array.from(filterInputs).find((filterInput) => filterInput.value === 'none');
  original.checked = true;

  effectLevelContainer.classList.add('hidden');
  previewImage.style.filter = 'none';
};

const initFilterHandlers = () => {
  filterInputs.forEach((filterInput) => {
    filterInput.addEventListener('change', (evt) => {
      evt.preventDefault();
      const currentFilterConfig = Object.assign({}, filterConfigs.find((filter) => filter.inputName === evt.target.value));

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

export { initFilterHandlers, resetFilterSettings };
