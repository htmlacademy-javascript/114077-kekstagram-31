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
