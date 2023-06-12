const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

/*
L <= diff < = R

Math.floor(unitedPopulation / unitedCount)
*/

const [N, L, R] = input[0].split(" ").map(Number);
const map = [];
for (let i = 1; i <= N; i++) {
  map.push(input[i].split(" ").map(Number));
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const checkInMap = (x, y) => {
  return 0 <= x && x < N && 0 <= y && y < N;
};

const solution = () => {
  let days = 0;
  const averagePopulation = (united) => {
    if (united.length === 1) return 0;
    const average = Math.floor(
      united.reduce((acc, [x, y]) => acc + map[x][y], 0) / united.length
    );
    united.forEach(([x, y]) => (map[x][y] = average));
    return 1;
  };

  const checkDiff = (x, y, nx, ny) => {
    const diff = Math.abs(map[x][y] - map[nx][ny]);
    return L <= diff && diff <= R;
  };

  const movePopulation = (x, y, united, visited) => {
    visited[x][y] = true;
    united.push([x, y]);
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (checkInMap(nx, ny) && !visited[nx][ny] && checkDiff(x, y, nx, ny)) {
        movePopulation(nx, ny, united, visited);
      }
    }
  };

  while (true) {
    let moveCount = 0;
    const visited = Array.from({ length: N }, () => new Array(N).fill(false));
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        if (!visited[x][y]) {
          const united = [];
          movePopulation(x, y, united, visited);
          moveCount += averagePopulation(united);
        }
      }
    }
    if (moveCount === 0) break;
    days++;
  }
  return days;
};

console.log(solution());
