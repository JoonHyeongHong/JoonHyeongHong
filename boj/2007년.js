/*
오늘은 2007년 1월 1일 월요일이다. 그렇다면 2007년 x월 y일은 무슨 요일일까? 이를 알아내는 프로그램을 작성하시오.
*/

const fs = require("fs");

const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .split("\n");

const [x, y] = input[0].split(" ").map(Number);
const Day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const Month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

console.log(
  Day[(Month.slice(0, x).reduce((acc, cur) => (acc += cur), 0) + y) % 7]
);
