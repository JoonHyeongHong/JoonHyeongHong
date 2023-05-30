/*
빙고 게임은 다음과 같은 방식으로 이루어진다.

먼저 아래와 같이 25개의 칸으로 이루어진 빙고판에 1부터 25까지 자연수를 한 칸에 하나씩 쓴다



다음은 사회자가 부르는 수를 차례로 지워나간다. 예를 들어 5, 10, 7이 불렸다면 이 세 수를 지운 뒤 빙고판의 모습은 다음과 같다.



차례로 수를 지워가다가 같은 가로줄, 세로줄 또는 대각선 위에 있는 5개의 모든 수가 지워지는 경우 그 줄에 선을 긋는다.



이러한 선이 세 개 이상 그어지는 순간 "빙고"라고 외치는데, 가장 먼저 외치는 사람이 게임의 승자가 된다.



철수는 친구들과 빙고 게임을 하고 있다. 철수가 빙고판에 쓴 수들과 사회자가 부르는 수의 순서가 주어질 때, 사회자가 몇 번째 수를 부른 후 철수가 "빙고"를 외치게 되는지를 출력하는 프로그램을 작성하시오.
*/

const fs = require("fs");
const solution = () => {
  const input = fs
    .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
    .toString()
    .trim()
    .split("\n");

  const bingo = [];
  const checkList = [];

  for (let i = 0; i < 5; i++) {
    bingo.push(...input[i].split(" ").map(Number));
  }
  for (let i = 5; i < 10; i++) {
    checkList.push(...input[i].split(" ").map(Number));
  }

  const checkVertical = () => {
    let bingoCount = 0;
    for (let i = 0; i < 5; i++) {
      let count = 0;
      for (let j = i; j < 25; j += 5) {
        if (bingo[j] === "check") {
          count++;
        }
      }
      if (count === 5) bingoCount++;
    }
    return bingoCount;
  };

  const checkHorizontal = () => {
    let bingoCount = 0;
    for (let i = 0; i < 25; i += 5) {
      let count = 0;
      for (let j = i; j < i + 5; j++) {
        if (bingo[j] === "check") {
          count++;
        }
      }
      if (count === 5) bingoCount++;
    }
    return bingoCount;
  };

  const checkDiagonal = () => {
    // 0 6 12 18 24
    let bingoCount = 0;
    let count = 0;
    for (let i = 0; i < 25; i += 6) {
      if (bingo[i] === "check") {
        count++;
      }
    }

    if (count === 5) bingoCount++;
    count = 0;

    for (let i = 20; i >= 4; i -= 4) {
      if (bingo[i] === "check") {
        count++;
      }
    }

    if (count === 5) bingoCount++;
    return bingoCount;
  };

  const checkBingo = (number) => {
    if (typeof number !== "number") {
      console.log("숫자가 아닙니다.");
    } else if (number < 1 || number > 25) {
      console.log("빙고 범위를 벗어났습니다.");
    } else {
      bingo[bingo.indexOf(number)] = "check";
    }
  };

  for (let i = 0; i < checkList.length; i++) {
    checkBingo(checkList[i]);
    if (checkVertical() + checkHorizontal() + checkDiagonal() >= 3) {
      return i + 1;
    }
  }
};
console.log(solution());
