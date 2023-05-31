/*
2차원 세계에 블록이 쌓여있다. 비가 오면 블록 사이에 빗물이 고인다.
비는 충분히 많이 온다. 고이는 빗물의 총량은 얼마일까?
*/

const { count } = require("console");
const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const blocks = Array.from({ length: H }, () =>
  Array.from({ length: W }, () => 0)
);

const blockHeights = input[1].split(" ").map(Number);
for (let i = 0; i < W; i++) {
  for (let j = 1; j <= blockHeights[i]; j++) {
    blocks[H - j][i] = 1;
  }
}

const solution = (blocks) => {
  let totalAmount = 0;

  const countRainAmount = (row) => {
    const startIndex = row.indexOf(1);
    const endIndex = row.lastIndexOf(1);
    let rainAmount = 0;
    for (let i = startIndex + 1; i <= endIndex; i++) {
      if (row[i] === 0) rainAmount++;
    }
    return rainAmount;
  };

  for (const block of blocks) {
    totalAmount += countRainAmount(block);
  }

  return totalAmount;
};

console.log(solution(blocks));
