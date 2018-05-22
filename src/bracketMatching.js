const input = '[{abcsajdfjkasdfkja{skjd}]';

const stack = [];

const checkForCorrectParanthesis = args => {
  const paranthesis = '[]{}()';
  const splittedString = args.split('');

  splittedString.forEach((char, index) => {
    const indexOfBrace = paranthesis.indexOf(char);

    if (indexOfBrace === -1) {
      return;
    }

    if (indexOfBrace % 2 === 0) {
      stack.push(indexOfBrace + 1);
    } else if (stack.length === 0 || stack.pop() !== indexOfBrace) {
      return false;
    }
  });
  return stack.length === 0;
};

console.log(checkForCorrectParanthesis(input));
