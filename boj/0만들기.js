const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input.shift());

const obj = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  " ": (a, b) => a * 10 + b,
};
const solution = (number) => {
  const makeZero = (currentNumber, expression) => {
    if (currentNumber === number) {
      let newExpression = expression.split(" ").join("");
      return eval(newExpression) === 0 ? console.log(expression) : 0;
    }
    makeZero(currentNumber + 1, expression + " " + Number(currentNumber + 1));
    makeZero(currentNumber + 1, expression + "+" + Number(currentNumber + 1));
    makeZero(currentNumber + 1, expression + "-" + Number(currentNumber + 1));
  };

  makeZero(1, 1);
};
for (let i = 0; i < T; i++) {
  const N = Number(input.shift());
  solution(N);
  if (i === T - 1) break;
  console.log();
}
