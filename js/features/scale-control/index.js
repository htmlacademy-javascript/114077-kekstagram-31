const previewContainer = document.querySelector('.img-upload__preview-container');

const previewImageContainer = previewContainer.querySelector('.img-upload__preview');
const scaleContainer = previewContainer.querySelector('.img-upload__scale');

const scaleDownButton = scaleContainer.querySelector('.scale__control--smaller');
const scaleUpButton = scaleContainer.querySelector('.scale__control--bigger');
const scaleResultInput = scaleContainer.querySelector('.scale__control--value');

const image = previewImageContainer.querySelector('img');

const DEFAULT_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const SCALE_STEP = 25;

let currentScaleValue = DEFAULT_SCALE_VALUE;

const checkButtonsAvailable = () => {
  scaleUpButton.disabled = currentScaleValue >= MAX_SCALE_VALUE;
  scaleDownButton.disabled = currentScaleValue <= MIN_SCALE_VALUE;
};

const disableScaleButtons = () => {
  scaleUpButton.disabled = true;
  scaleDownButton.disabled = true;
};

const enableScaleButtons = () => {
  scaleUpButton.disabled = false;
  scaleDownButton.disabled = false;
};

const renderScaleValue = (value) => {
  scaleResultInput.value = `${value}%`;
};

const scalePreviewImage = (value) => {
  image.style.transform = `scale(${value / 100})`;
};

const resetPreviewImage = () => {
  currentScaleValue = DEFAULT_SCALE_VALUE;

  renderScaleValue(currentScaleValue);
  checkButtonsAvailable(currentScaleValue);
  scalePreviewImage(currentScaleValue);
};

const initScaleHandlers = () => {
  checkButtonsAvailable();

  scaleUpButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (currentScaleValue < MAX_SCALE_VALUE) {
      currentScaleValue += SCALE_STEP;
      renderScaleValue(currentScaleValue);
    }

    checkButtonsAvailable();
    scalePreviewImage(currentScaleValue);
  });

  scaleDownButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (currentScaleValue > MIN_SCALE_VALUE) {
      currentScaleValue -= SCALE_STEP;
      renderScaleValue(currentScaleValue);
    }

    checkButtonsAvailable();
    scalePreviewImage(currentScaleValue);
  });
};

export {
  initScaleHandlers,
  resetPreviewImage,
  disableScaleButtons,
  enableScaleButtons
};
