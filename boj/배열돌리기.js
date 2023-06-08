/*
크기가 n x n인 2차원 정수 배열 X가 있다. (n은 홀수)

X를 45° 의 배수만큼 시계방향 혹은 반시계방향으로 돌리려고 한다. X를 시계 방향으로 45° 돌리면 아래와 같은 연산이 동시에 X에 적용되어야 한다:

X의 주 대각선을 ((1,1), (2,2), …, (n, n)) 가운데 열 ((n+1)/2 번째 열)로 옮긴다.
X의 가운데 열을 X의 부 대각선으로 ((n, 1), (n-1, 2), …, (1, n)) 옮긴다. 
X의 부 대각선을 X의 가운데 행 ((n+1)/2번째 행)으로 옮긴다.
X의 가운데 행을 X의 주 대각선으로 옮긴다.
위 네 가지 경우 모두 원소의 기존 순서는 유지 되어야 한다.
X의 다른 원소의 위치는 변하지 않는다.
반시계 방향으로 45° 돌리는 경우도 위와 비슷하게 정의된다.

예를 들어, 아래 그림 중앙에 5x5 배열 X가 있고, 이 배열을 시계방향 혹은 반시계방향으로 45° 돌렸을 때의 결과가 우측 그리고 좌측에 있다. 굵은 원소는 주 대각선 / 중간 열 / 부 대각선 / 중간 행에 위치한 원소이다.

3	2	5	4	15
6	8	9	14	10
1	7	13	19	25
16	12	17	18	20
11	22	21	24	23	
1	2	3	4	5
6	7	8	9	10
11	12	13	14	15
16	17	18	19	20
21	22	23	24	25	
11	2	1	4	3
6	12	7	8	10
21	17	13	9	5
16	18	19	14	20
23	22	25	24	15
X를 반시계 방향으로 45° 회전한 경우	배열 X (5x5)	X를 시계 방향으로 45° 회전한 경우
입력으로 2차원 배열 X와 어느 방향으로 몇 도 회전할지 입력 받아, 그 결과를 출력하는 프로그램을 작성하시오.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input.shift());
const rotateArray = (array, angle) => {
  return angle >= 0
    ? rotateToRight(array, (angle % 360) / 45)
    : rotateToLeft(array, (Math.abs(angle) % 360) / 45);
};

const rotateToRight = (array, times) => {
  if (times === 0) return array;
  const n = array.length;
  const newArray = Array.from({ length: n }, (_, idx) => [...array[idx]]);
  for (let depth = 0; depth < Math.floor(n / 2); depth++) {
    const distanceMovedAtOneTime = Math.floor(n / 2) - depth;
    const limitOfArray = n - 1 - depth;

    for (let x = limitOfArray; x > depth; x = x - distanceMovedAtOneTime)
      newArray[x - distanceMovedAtOneTime][depth] = array[x][depth];

    for (let y = depth; y < limitOfArray; y = y + distanceMovedAtOneTime)
      newArray[depth][y + distanceMovedAtOneTime] = array[depth][y];

    for (let x = depth; x < limitOfArray; x = x + distanceMovedAtOneTime)
      newArray[x + distanceMovedAtOneTime][limitOfArray] =
        array[x][limitOfArray];

    for (let y = limitOfArray; y > depth; y = y - distanceMovedAtOneTime)
      newArray[limitOfArray][y - distanceMovedAtOneTime] =
        array[limitOfArray][y];
  }
  return rotateToRight(newArray, times - 1);
};

const rotateToLeft = (array, times) => {
  if (times === 0) return array;
  const n = array.length;
  const newArray = Array.from({ length: n }, (_, idx) => [...array[idx]]);
  for (let time = 0; time < times; time++) {
    for (let depth = 0; depth < Math.floor(n / 2); depth++) {
      const distanceMovedAtOneTime = Math.floor(n / 2) - depth;
      const limitOfArray = n - 1 - depth;

      for (let x = depth; x < limitOfArray; x = x + distanceMovedAtOneTime)
        newArray[x + distanceMovedAtOneTime][depth] = array[x][depth];

      for (let y = depth; y < limitOfArray; y = y + distanceMovedAtOneTime)
        newArray[limitOfArray][y + distanceMovedAtOneTime] =
          array[limitOfArray][y];

      for (let x = limitOfArray; x > depth; x = x - distanceMovedAtOneTime)
        newArray[x - distanceMovedAtOneTime][limitOfArray] =
          array[x][limitOfArray];

      for (let y = limitOfArray; y > depth; y = y - distanceMovedAtOneTime)
        newArray[depth][y - distanceMovedAtOneTime] = array[depth][y];
    }
  }
  return rotateToLeft(newArray, times - 1);
};

for (let t = 0; t < T; t++) {
  const [n, d] = input.shift().split(" ").map(Number);
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(input.shift().split(" ").map(Number));
  }
  const newArray = rotateArray(array, d);
  newArray.forEach((el) => console.log(el.join(" ")));
}
