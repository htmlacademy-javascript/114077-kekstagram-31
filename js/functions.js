const checkStrLimit = (str = '', limit = 0) => str.toString().length <= limit;

const isPalindrome = (input = '') => {
  const phrase = input ?? '';

  if (typeof phrase !== 'string' || phrase.length === 0) {
    return new Error('Палиндром можно получить только для строки');
  }

  const normalizePhrase = phrase.replaceAll(' ', '').toLowerCase();
  let palindrome = '';

  for (let i = normalizePhrase.length - 1; i >= 0; i--) {
    palindrome += normalizePhrase.at(i);
  }

  return palindrome === normalizePhrase;
};

const extractNumbers = (input = '') => {
  const str = input ?? '';

  const preparedStr = str.toString().replaceAll(' ', '');
  let result = '';

  const isNan = (char) => Number.isNaN(parseInt(char, 10)); // helper

  for (let i = 0; i < preparedStr.length; i++) {
    const char = preparedStr.at(i);

    if (!isNan(char)) {
      result += char;
    }
  }

  return parseInt(result, 10);
};

let notUse;

checkStrLimit('проверяемая строка', 20);
checkStrLimit('проверяемая строка', 18);
checkStrLimit('проверяемая строка', 10);

isPalindrome();
isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome(null);
isPalindrome(notUse);

extractNumbers();
extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('агент 007');
extractNumbers('а я томат');
extractNumbers(2023);
extractNumbers(-1);
extractNumbers(1.5);
extractNumbers(null);

/* module5-task2 */

const MINUTES_IN_HOUR = 60;
const RADIX = 10;
const SPLIT_SIGN = ':';

/**
 * Возвращает количество минут от начала суток (00:00)
 *
 * @param {string} sTime - время формата «часы:минуты»
 * @param {string} [splitSign=SPLIT_SIGN] - знак разделения времени
 * @param {number} [radix=RADIX] - основание системы счисления
 *
 * @returns {number}
 */
const convertTimeToMinutes = (sTime, splitSign = SPLIT_SIGN, radix = RADIX) => {
  const [sHours, sMinutes] = sTime.split(splitSign);

  const hours = parseInt(sHours, radix);
  const minutes = parseInt(sMinutes, radix);

  if (isNaN(hours) || isNaN(minutes)) {
    throw Error(`Неверный формат данных. Не удалось строку времени "${sTime}" преобразовать в число`);
  }

  return hours * MINUTES_IN_HOUR + minutes;
};

/**
 * Проверяет, возможна ли встреча или нет
 *
 * @param {string} dayBeginAt - время начала рабочего дня
 * @param {string} dayEndAt - время конца рабочего дня
 * @param {string} meetingStartTime - время начала встречи
 * @param {number} meetingDurationInMinutes - продолжительность встречи
 *
 * @returns {boolean}
 */
const isMeetingPossible = (dayBeginAt, dayEndAt, meetingStartTime, meetingDurationInMinutes) => {
  if (typeof dayBeginAt !== 'string' || typeof dayEndAt !== 'string' || typeof meetingStartTime !== 'string' || typeof meetingDurationInMinutes !== 'number') {
    throw Error('Неверный формат данных');
  }

  if (!dayBeginAt.match(SPLIT_SIGN) || !dayEndAt.match(SPLIT_SIGN) || !meetingStartTime.match(SPLIT_SIGN)) {
    throw Error('Отсутствует маркер для разделения времени', SPLIT_SIGN);
  }

  const dayBeginAtMinutes = convertTimeToMinutes(dayBeginAt);
  const dayEndAtMinutes = convertTimeToMinutes(dayEndAt);
  const meetingStartTimeAtMinutes = convertTimeToMinutes(meetingStartTime);

  const isDayRangeIncorrect = dayBeginAtMinutes >= dayEndAtMinutes; // Если конец дня раньше, чем начало
  const isMeetingOutsideWorkDay = meetingStartTimeAtMinutes < dayBeginAtMinutes || meetingStartTimeAtMinutes > dayEndAtMinutes; // Если начало встречи раньше или позже промежутка рабочего дня
  const isMeetingLongerWorkDay = meetingStartTimeAtMinutes + meetingDurationInMinutes > dayEndAtMinutes; // Если встреча закончится позже конца дня

  return !(isDayRangeIncorrect || isMeetingOutsideWorkDay || isMeetingLongerWorkDay);
};

isMeetingPossible('08:00', '17:30', '14:00', 90);
isMeetingPossible('8:0', '10:0', '8:0', 120);
isMeetingPossible('08:00', '14:30', '14:00', 90);
isMeetingPossible('14:00', '17:30', '08:0', 90);
isMeetingPossible('8:00', '17:30', '08:00', 900);
