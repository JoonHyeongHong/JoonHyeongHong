/*N×M크기의 직사각형이 있다. 각 칸에는 한 자리 숫자가 적혀 있다. 이 직사각형에서 꼭짓점에 쓰여 있는 수가 모두 같은 가장 큰 정사각형을 찾는 프로그램을 작성하시오. 이때, 정사각형은 행 또는 열에 평행해야 한다.
 */

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const rectangle = [];
for (const row of input) {
  rectangle.push(row.split("").map(Number));
}

const limit = Math.min(N, M);
const square = [];

const checkVertexEqual = (rectangle, x, y, i) => {
  return (
    rectangle[x][y] === rectangle[x + i][y] &&
    rectangle[x][y] === rectangle[x][y + i] &&
    rectangle[x + i][y] === rectangle[x + i][y + i]
  );
};

for (let i = 0; i < limit; i++) {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (x + i < N && y + i < M) {
        if (checkVertexEqual(rectangle, x, y, i)) {
          square.push((i + 1) * (i + 1));
        }
      }
    }
  }
}

console.log(Math.max(...square));
