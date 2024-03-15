// none
// chrome
// sepia
// marvin
// phobos
// heat

const defaultSettings = {
  animate: false,
  connect: 'lower',
  start: 0,
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
};

const chrome = {
  inputName: 'chrome',
  sliderConfig: Object.assign({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
  }, defaultSettings),
  filterValue(value) {
    return `grayscale(${value})`;
  }
};

const sepia = {
  inputName: 'sepia',
  sliderConfig: Object.assign({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
  }, defaultSettings),
  filterValue(value) {
    return `sepia(${value})`;
  }
};

const marvin = {
  inputName: 'marvin',
  sliderConfig: Object.assign({
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
  }, defaultSettings),
  filterValue(value) {
    return `invert(${value}%)`;
  }
};

const phobos = {
  inputName: 'phobos',
  sliderConfig: Object.assign({
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
  }, defaultSettings),
  filterValue(value) {
    return `blur(${value}px)`;
  }
};

const heat = {
  inputName: 'heat',
  sliderConfig: Object.assign({
    start: 1,
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
  }, defaultSettings),
  filterValue(value) {
    return `brightness(${value})`;
  }
};

export {
  chrome,
  sepia,
  marvin,
  phobos,
  heat
};
