//청소하는 영역의 개수 구하기
const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");
const wall = 1;
const notClean = 0;
const clean = 2;
const map = [];
const solution = () => {
  const [N, M] = input.shift().split(" ").map(Number);
  let [x, y, direction] = input.shift().split(" ").map(Number);
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  for (const row of input) {
    map.push(row.split(" ").map(Number));
  }

  const cleanRoom = () => {
    if (map[x][y] === notClean) {
      console.log(x, y);
      console.log(map.map((el) => el.join("")).join("\n"));
      map[x][y] = clean;
    }

    for (let i = 3; i > -1; i--) {
      const d = (direction + i) % 4;
      const nx = x + dx[d];
      const ny = y + dy[d];
      if (map[nx][ny] === notClean) {
        [x, y, direction] = [nx, ny, d];
        return cleanRoom();
      }
    }

    const nx = x - dx[direction];
    const ny = y - dy[direction];

    if (map[nx][ny] === wall) {
      return map.flat().filter((el) => el === clean).length;
    } else {
      x = nx;
      y = ny;
      return cleanRoom();
    }
  };

  return cleanRoom();
};

console.log(solution());
