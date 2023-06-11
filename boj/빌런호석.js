const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

// K자리의 수 [ 0부터 시작 가능 ]
// 1개 ~ P개 반전 계획
// 켜진 부분은 끄고, 꺼진 부분은 켜는 것
// 반전 이후엔, 디스플레이에 올바른 수가 보이게 해서 1 이상 N 이하가 되도록 바꿀 예정

// X 층에 멈췄을 때, 호석이가 반전시킬 LED

const [N, K, P, X] = input[0].split(" ").map(Number);

const LED = [
  [1, 1, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1],
  [0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
];

const fillZero = (K, str) => {
  return str.length >= K ? str : new Array(K - str.length + 1).join("0") + str;
};

const solution = () => {
  let changingNumber = new Set();
  const number = fillZero(K, X.toString()).split("").map(Number);
  const getInversionCount = (a, b) => {
    let inversionCount = 0;
    for (let i = 0; i < 7; i++) {
      if (LED[a][i] !== LED[b][i]) inversionCount++;
    }
    return inversionCount;
  };

  const inversion = (number, index, restP) => {
    if (restP <= 0) return 0;
    if (index >= K) return 0;

    for (let i = 0; i < 10; i++) {
      const newNumber = [...number];
      let inversionCount = getInversionCount(newNumber[index], i);
      if (restP >= inversionCount) {
        newNumber[index] = i;
        {
          changingNumber.add(Number(newNumber.join("")));
          inversion(newNumber, index + 1, restP - inversionCount);
        }
      }
    }
  };

  inversion(number, 0, P);

  return [...changingNumber].filter((el) => el > 0 && el <= N && el !== X)
    .length;
};

console.log(solution());
