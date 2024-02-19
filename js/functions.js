const checkStrLimit = (str = '', limit = 0) => str.toString().length <= limit;

checkStrLimit('проверяемая строка', 20);
checkStrLimit('проверяемая строка', 18);
checkStrLimit('проверяемая строка', 10);
