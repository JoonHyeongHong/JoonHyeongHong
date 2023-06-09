/*
작고 특이한 모양의 유성 사진이 인터넷에 올라왔다. 사진에는 매우 높은 곳에서 떨어지고 있는 유성이 허공에 찍혀 있었다. 유성이 떨어지고 난 뒤의 사진도 있었지만 안타깝게도 소실돼버려 이를 복원해야 한다.

유성 사진을 문자의 배열로 단순화시켜 표기할 것이다. 문자 'X'는 유성의 일부를, 문자 '#'는 땅의 일부를, 그리고 나머지(공기)는 문자 '.'로 이루어져 있다.

모든 유성 조각들은 연결되어 있다. 즉, 두 부분 유성이 존재한다면, 한 쪽에서 유성 조각을 통해 상하좌우로 이동해서 다른 부분 유성에 도달할 수 있다. 땅 또한 같은 방식으로 연결되어 있다.

주어진 사진에서 유성은 땅보다 위에 있다. 정확히 말하자면, 적어도 한 줄 이상의 공기('.')가 존재하며, 유성은 그 보다 위에, 땅은 그 보다 아래쪽에 있다. 또한, 사진의 맨 밑 줄은 모두 땅이다.

유성은 수직으로 낙하한다. 유성이 땅에 떨어졌을 때, 유성과 땅은 원형을 유지한다고 한다. 유성이 떨어진 후의 사진을 복구하여라.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [R, S] = input.shift().split(" ").map(Number);
const photo = [];
for (const row of input) {
  photo.push(row.split(""));
}

const meteor = "X";
const ground = "#";
const air = ".";

const getDiff = (photo) => {
  const diffArray = [];
  for (let y = 0; y < S; y++) {
    let lowestMeteor = Number.MIN_SAFE_INTEGER;
    let highestGround = R;
    for (let x = 0; x < R; x++) {
      if (photo[x][y] === meteor) lowestMeteor = x;
      if (photo[x][y] === ground) {
        highestGround = x;
        break;
      }
    }
    diffArray.push(Math.max(highestGround - lowestMeteor - 1, 1));
  }
  return Math.min(...diffArray);
};

const falling = (photoBeforeFalling, diff) => {
  const newPhoto = Array.from({ length: R }, () => Array(S).fill("."));
  for (let x = 0; x < R; x++) {
    for (let y = 0; y < S; y++) {
      if (photoBeforeFalling[x][y] === meteor) {
        newPhoto[x + diff][y] = meteor;
      }
      if (photoBeforeFalling[x][y] === ground) {
        newPhoto[x][y] = ground;
      }
    }
  }
  return newPhoto.map((row) => row.join("")).join("\n");
};

const solution = (photoBeforeFalling) => {
  return falling(photoBeforeFalling, getDiff(photoBeforeFalling));
};

console.log(solution(photo));
