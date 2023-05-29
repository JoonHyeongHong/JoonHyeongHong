/*
홀수인 자연수 N이 주어지면, 다음과 같이 1부터 N2까지의 자연수를 달팽이 모양으로 N×N의 표에 채울 수 있다.

9	2	3
8	1	4
7	6	5
25	10	11	12	13
24	9	2	3	14
23	8	1	4	15
22	7	6	5	16
21	20	19	18	17
N이 주어졌을 때, 이러한 표를 출력하는 프로그램을 작성하시오. 또한 N2 이하의 자연수가 하나 주어졌을 때, 그 좌표도 함께 출력하시오. 예를 들어 N=5인 경우 6의 좌표는 (4,3)이다.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .split("\n");

const N = Number(input[0]);
const findingNumber = Number(input[1]);

const makeSnail = (N, findingNumber) => {
  const snail = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => 0)
  );
  //Array(N).feel(new Array(N).feel(0)) => 배열이 이어집니다 , 주의하세요.
  let [x, y] = [0, 0];
  let number = N ** 2;
  const [upAndLeft, downAndRight] = [true, false];
  let movement = downAndRight;
  const coordinate = [0, 0];

  const verticalMovement = (length) => {
    for (let i = 0; i < length; i++) {
      if (findingNumber === number) {
        coordinate[0] = x + 1;
        coordinate[1] = y + 1;
      }
      snail[x][y] = number--;

      movement === upAndLeft ? x-- : x++;
    }

    if (movement === upAndLeft) {
      x++;
      y--;
    } else if (movement === downAndRight) {
      x--;
      y++;
    }
  };

  const horizontalMovement = (length) => {
    for (let i = 0; i < length - 1; i++) {
      if (findingNumber === number) {
        coordinate[0] = x + 1;
        coordinate[1] = y + 1;
      }
      snail[x][y] = number--;
      movement === upAndLeft ? y-- : y++;
    }

    if (movement === upAndLeft) {
      y++;
      x++;
    } else if (movement === downAndRight) {
      y--;
      x--;
    }
  };

  for (let i = N; i >= 1; i--) {
    verticalMovement(i);
    horizontalMovement(i);

    movement = !movement;
  }

  return [snail, coordinate];
};

const [snail, coordinate] = makeSnail(N, findingNumber);
for (const row of snail) {
  console.log(row.join(" "));
}
console.log(coordinate.join(" "));
