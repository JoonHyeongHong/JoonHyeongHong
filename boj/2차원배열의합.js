/*
2차원 배열이 주어졌을 때 (i, j) 위치부터 (x, y) 위치까지에 저장되어 있는 수들의 합을 구하는 프로그램을 작성하시오. 배열의 (i, j) 위치는 i행 j열을 나타낸다.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n")
  .reverse();

const [N, M] = input.pop().split(" ").map(Number);
const array = [];
for (let i = 0; i < N; i++) {
  array.push(input.pop().split(" ").map(Number));
}
const testCase = +input.pop();
let sum = 0;
for (let k = 0; k < testCase; k++) {
  sum = 0;
  const [startX, startY, endX, endY] = input
    .pop()
    .split(" ")
    .map((el) => +el - 1);
  const xDiff = endX - startX;
  const yDiff = endY - startY;
  if (xDiff === 0) {
    for (let j = startY; j <= endY; j++) {
      sum += array[startX][j];
    }
  } else if (yDiff === 0) {
    for (let j = startX; j <= endX; j++) {
      sum += array[j][startY];
    }
  } else {
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        sum += array[i][j];
      }
    }
  }

  console.log(sum);
}
