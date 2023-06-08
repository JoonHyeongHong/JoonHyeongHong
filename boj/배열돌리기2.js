/*
크기가 N×M인 배열이 있을 때, 배열을 돌려보려고 한다. 배열은 다음과 같이 반시계 방향으로 돌려야 한다.

A[1][1] ← A[1][2] ← A[1][3] ← A[1][4] ← A[1][5]
   ↓                                       ↑
A[2][1]   A[2][2] ← A[2][3] ← A[2][4]   A[2][5]
   ↓         ↓                   ↑         ↑
A[3][1]   A[3][2] → A[3][3] → A[3][4]   A[3][5]
   ↓                                       ↑
A[4][1] → A[4][2] → A[4][3] → A[4][4] → A[4][5]
예를 들어, 아래와 같은 배열을 2번 회전시키면 다음과 같이 변하게 된다.

1 2 3 4       2 3 4 8       3 4 8 6
5 6 7 8       1 7 7 6       2 7 8 2
9 8 7 6   →   5 6 8 2   →   1 7 6 3
5 4 3 2       9 5 4 3       5 9 5 4
 <시작>         <회전1>        <회전2>
배열과 정수 R이 주어졌을 때, 배열을 R번 회전시킨 결과를 구해보자.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (input) => {
  const [N, M, R] = input[0].split(" ").map(Number);
  const arr = [];
  for (let i = 1; i <= N; i++) {
    arr.push(input[i].split(" ").map(Number));
  }

  const getBorder = (array) => {
    const length = Math.ceil(Math.min(N, M) / 2);
    const border = Array.from({ length: length }, () => []);
    for (let i = 0; i < length; i++) {
      for (let y = i; y < M - i; y++) border[i].push(array[i][y]);
      for (let x = i + 1; x < N - i - 1; x++)
        border[i].push(array[x][M - 1 - i]);
      if (i + 1 <= N - i - 1) {
        for (let y = M - i - 1; y >= i; y--)
          border[i].push(array[N - i - 1][y]);
      }

      for (let x = N - i - 2; x >= i + 1; x--) border[i].push(array[x][i]);
    }
    return border;
  };

  const rotateBorder = (border, count) => {
    const newBorder = [];
    for (const row of border) {
      for (let i = 0; i < count; i++) {
        row.push(row.shift());
      }
      newBorder.push(row);
    }
    return newBorder;
  };

  const makeNewArray = (border) => {
    const length = Math.ceil(Math.min(N, M) / 2);
    const newArray = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => 0)
    );
    for (let i = 0; i < length; i++) {
      border[i].reverse();
      for (let y = i; y < M - i; y++) newArray[i][y] = border[i].pop();
      for (let x = i + 1; x < N - i - 1; x++)
        newArray[x][M - 1 - i] = border[i].pop();
      if (i + 1 <= N - i - 1) {
        for (let y = M - i - 1; y >= i; y--)
          newArray[N - i - 1][y] = border[i].pop();
      }
      for (let x = N - i - 2; x >= i + 1; x--) newArray[x][i] = border[i].pop();
    }
    return newArray;
  };

  const border = getBorder(arr);
  const newBorder = rotateBorder(border, R);
  return makeNewArray(newBorder);
};

const array = solution(input);
for (const row of array) {
  console.log(row.join(" "));
}

/*
const rotateArray = (array, number) => {
    const newArray = [];

    const borderArray = getBorder(array);
    for (const border of borderArray) {
      rotateBorder(border,number)
    }

    return newArray;
  };

  

  const rotateBorder = (border, i) => {
    const newBorder = [...border];

    return border;
  };

  return rotateArray(arr, R);
  */
