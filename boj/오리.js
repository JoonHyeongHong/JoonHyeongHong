/*
오리의 울음 소리는 "quack"이다. 올바른 오리의 울음 소리는 울음 소리를 한 번 또는 그 이상 연속해서 내는 것이다. 예를 들어, "quack", "quackquackquackquack", "quackquack"는 올바른 오리의 울음 소리이다.

영선이의 방에는 오리가 있는데, 문제를 너무 열심히 풀다가 몇 마리의 오리가 있는지 까먹었다.

갑자기 영선이의 방에 있는 오리가 울기 시작했고, 이 울음소리는 섞이기 시작했다. 영선이는 일단 울음소리를 녹음했고, 나중에 들어보면서 총 몇 마리의 오리가 있는지 구해보려고 한다.

녹음한 소리는 문자열로 나타낼 수 있는데, 한 문자는 한 오리가 낸 소리이다. 오리의 울음 소리는 연속될 필요는 없지만, 순서는 "quack"이어야 한다. "quqacukqauackck"과 같은 경우는 두 오리가 울었다고 볼 수 있다.

영선이가 녹음한 소리가 주어졌을 때, 영선이 방에 있을 수 있는 오리의 최소 개수를 구하는 프로그램을 작성하시오.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const sound = input[0].split("");
const quack = { q: "u", u: "a", a: "c", c: "k", k: "q" };

const firstChar = sound.shift();
if (firstChar !== "q") return console.log(-1);

const stack = [];
stack.push([firstChar]);
for (const s of sound) {
  let useBrake = false;
  for (let i = 0; i < stack.length; i++) {
    const next = quack[stack[i][stack[i].length - 1]];
    if (next === s) {
      stack[i].push(s);
      useBrake = true;
      break;
    }
  }
  if (!useBrake) stack.push([s]);
}

if (
  stack.filter((el) => el.join("").replace(/quack/g, "").length !== 0).length >
  0
)
  return console.log(-1);
console.log(stack.length);
