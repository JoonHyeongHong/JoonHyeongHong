const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = [];
for (let i = 1; i <= N; i++) {
  map.push(input[i].split(" ").map(Number));
}

const houseArray = [];
const chickenArray = [];

const putArray = [
  (el) => 0,
  (el) => houseArray.push(el),
  (el) => chickenArray.push(el),
];

const getDiff = (aX, aY, bX, bY) => {
  return Math.abs(aX - bX) + Math.abs(aY - bY);
};

for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    putArray[map[x][y]]([x, y]);
  }
}

const solution = () => {
  let minTotalDiff = Number.MAX_SAFE_INTEGER;

  const getTotalDiff = (M, index, array) => {
    if (M === 0) {
      let total = 0;
      for (const [aX, aY] of houseArray) {
        let minDiff = Number.MAX_SAFE_INTEGER;
        for (const [bX, bY] of array) {
          minDiff = Math.min(minDiff, getDiff(aX, aY, bX, bY));
        }
        total += minDiff;
      }
      minTotalDiff = Math.min(total, minTotalDiff);
    } else if (index === chickenArray.length) {
      return 0;
    } else {
      getTotalDiff(M, index + 1, array);
      getTotalDiff(M - 1, index + 1, [chickenArray[index], ...array]);
    }
  };
  getTotalDiff(M, 0, []);
  return minTotalDiff;
};

console.log(solution());
