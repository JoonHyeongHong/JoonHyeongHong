/*


*/

const fs = require("fs");

const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .split("\n");
const n = +input[0];
let t = 1;

let sum = 0;

for (let i = 1; i < n; i += t) {
  t++;
  sum = i;
}

t++;

let num = n - sum;

if (t % 2) {
  console.log(`${num}/${t - num}`);
} else {
  console.log(`${t - num}/${num}`);
}
