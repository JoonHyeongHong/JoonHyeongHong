/*수를 처리하는 것은 통계학에서 상당히 중요한 일이다. 통계학에서 N개의 수를 대표하는 기본 통계값에는 다음과 같은 것들이 있다. 단, N은 홀수라고 가정하자.

산술평균 : N개의 수들의 합을 N으로 나눈 값
중앙값 : N개의 수들을 증가하는 순서로 나열했을 경우 그 중앙에 위치하는 값
최빈값 : N개의 수들 중 가장 많이 나타나는 값
범위 : N개의 수들 중 최댓값과 최솟값의 차이
N개의 수가 주어졌을 때, 네 가지 기본 통계값을 구하는 프로그램을 작성하시오.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .split("\n");

const line = input[0];
let sum = 0;
let array = [];
for (let i = 1; i <= line; i++) {
  sum += +input[i];
  let isExisted = false;
  for (const arr of array) {
    if (arr[0] === input[i]) {
      arr[1]++;
      isExisted = true;
    }
  }
  if (!isExisted) array.push([+input[i], 1]);
}
array.sort((a, b) => a[0] - b[0]);
//산술평균
let average = Math.round(sum / line);
let middleValue =
  array.length % 1
    ? array[Math.floor(array.length / 2)][0]
    : (array[Math.floor(array.length / 2)][0] +
        array[Math.ceil(array.length / 2)][0]) /
      2;
let mostValue = [...array].sort((a, b) => b[1] - a[1])[0][0];
let arrange = array[array.length - 1][0] - array[0][0];
console.log(average, middleValue, mostValue, arrange);
