const input = process.argv[2];
const stack = [];
const checkForCorrectParanthesis = args => {
  const params = '[]{}()';
  const splittedString = args.split('');

  splittedString.forEach((char, index) => {
    const indexOfBrace = params.indexOf(char);

    if (indexOfBrace === -1) {
      return;
    }

    if (indexOfBrace % 2 === 0) {
      stack.push(indexOfBrace + 1);
    } else if (stack.length === 0) {
      return false;
    } else {
      if (stack.pop() !== indexOfBrace) {
        return false;
      }
    }
  });
  return stack.length === 0;
};

console.log(
  checkForCorrectParanthesis(input)
    ? 'Success'
    : 'Error in Matching Paranthesis'
);
