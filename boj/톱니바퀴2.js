const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input.shift());
const gears = [];

const N = 0;
const S = 1;
const rightContact = 2;
const leftContact = 6;
for (let i = 1; i <= T; i++) {
  gears.push(input.shift().split("").map(Number));
}
const K = Number(input.shift());
const rotateArray = [];
for (let i = 0; i < K; i++) {
  rotateArray.push(input.shift().split(" ").map(Number));
}

const rotate = [
  (gearNumber) => gears[gearNumber].push(gears[gearNumber].shift()),
  (gearNumber) => gears[gearNumber].unshift(gears[gearNumber].pop()),
];

const rotateGears = (gearNumber, direction, visited) => {
  const gear = gears[gearNumber];
  visited[gearNumber] = true;

  if (gearNumber + 1 < T && !visited[gearNumber + 1]) {
    const nextGear = gears[gearNumber + 1];
    if (gear[rightContact] !== nextGear[leftContact]) {
      rotateGears(gearNumber + 1, direction * -1, visited);
    }
  }

  if (gearNumber > 0 && !visited[gearNumber - 1]) {
    const prevGear = gears[gearNumber - 1];

    if (gear[leftContact] !== prevGear[rightContact]) {
      rotateGears(gearNumber - 1, direction * -1, visited);
    }
  }
  rotate[Math.max(direction, 0)](gearNumber);
};

for (const [gearNumber, direction] of rotateArray) {
  const visited = new Array(T).fill(false);
  rotateGears(gearNumber - 1, direction, visited);
}

console.log(gears.filter((gear) => gear[0] === S).length);
