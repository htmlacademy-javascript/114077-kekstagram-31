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
isPalindrome(notUse);
