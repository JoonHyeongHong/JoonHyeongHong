/*
2020년 12월, 세 번째로 개최된 ZOAC의 오프닝을 맡은 성우는 누구보다 빠르게 ZOAC를 알리려 한다.

하지만 안타깝게도 성우는 독수리타법이다!

독수리 타법이란 양 손의 검지손가락만을 이용해 타자를 치는 타법이다.
성우는 한글 자음 쪽 자판은 왼손 검지손가락으로 입력하고, 한글 모음 쪽 자판은 오른손 검지손가락으로 입력한다.
a의 좌표가 (x1, y1)이고, b의 좌표가 (x2, y2)일 때, a에 위치한 성우의 손가락이 b로 이동하는 데에는 a와 b의 택시 거리 |x1-x2|+|y1-y2| 만큼의 시간이 걸린다.
각 키를 누르는 데에는 1의 시간이 걸린다.
성우는 두 손을 동시에 움직일 수 없다.
성우가 사용하는 키보드는 쿼티식 키보드이며, 아래 그림처럼 생겼다.


바쁜 성우를 위하여 해당 문자열을 출력하는 데 걸리는 시간의 최솟값을 구해보자.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");
const [sL, sR] = input[0].split(" ");

const qwertyLeft = [
  ["q", "w", "e", "r", "t"],
  ["a", "s", "d", "f", "g"],
  ["z", "x", "c", "v"],
];

const qwertyRight = [
  [" ", "y", "u", "i", "o", "p"],
  [" ", "h", "j", "k", "l"],
  ["b", "n", "m"],
];

const string = input[1].split("");
const left = true;
const right = false;

const checkLeftRight = (s) => {
  if (qwertyLeft.flat(1).indexOf(s) >= 0) return left;
  if (qwertyRight.flat(1).indexOf(s) >= 0) return right;
  return null;
};

const findLocation = (arr, s) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(s) >= 0) return [i, arr[i].indexOf(s)];
  }
};

let currentLeft = findLocation(qwertyLeft, sL);
let currentRight = findLocation(qwertyRight, sR);
let time = string.length;

for (const s of string) {
  if (checkLeftRight(s) === left) {
    const coordinate = findLocation(qwertyLeft, s);
    time +=
      Math.abs(coordinate[0] - currentLeft[0]) +
      Math.abs(coordinate[1] - currentLeft[1]);
    currentLeft = coordinate;
  } else {
    const coordinate = findLocation(qwertyRight, s);
    time +=
      Math.abs(currentRight[0] - coordinate[0]) +
      Math.abs(currentRight[1] - coordinate[1]);
    currentRight = coordinate;
  }
}
console.log(time);
