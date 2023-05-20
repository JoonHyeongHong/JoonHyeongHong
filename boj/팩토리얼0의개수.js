/*
N!에서 뒤에서부터 처음 0이 아닌 숫자가 나올 때까지 0의 개수를 구하는 프로그램을 작성하시오.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const n = input.shift();

function countZeroOfFactorial(number) {
  // 2 * 5 는 10이 된다, 2가 5보다 많기 떄문에
  // 5의 배수가 나오는 값을 계속 센다.
  let countZero = 0;
  for (let i = 2; i <= number; i++) {
    if (i % 5 === 0) countZero++; // 한 자릿수(10)
    if (i % 25 === 0) countZero++; // 두 자릿수(100)
    if (i % 125 === 0) countZero++; // 세 자릿수(1000)
  }
  return countZero;
}

console.log(countZeroOfFactorial(n));
