function whoIsWinner(board) {
  //가로
  let oWin = false;
  let xWin = false;
  let on = false;
  const o = new Array(3).fill(new Array(3).fill("X"));

  //가로
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    if (row[0] === ".") continue;
    if (
      row.filter((el, idx, arr) => el === arr[0] && el !== ".").length === 3
    ) {
      if (row[0] === "O") {
        o[i] = o[i].map((el) => ++el);
        oWin = true;
      } else if (row[0] === "X") {
        xWin = true;
      }
    }
  }

  //세로
  for (let i = 0; i < 3; i++) {
    if (board[i][i] === ".") continue;
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      if (board[0][i] === "O") {
        o[0][i] += 1;
        o[1][i] += 1;
        o[2][i] += 1;
        oWin = true;
      } else if (board[0][i] === "X") {
        xWin = true;
      }
    }
  }
  //오른쪽 대각선
  if (
    board[0][0] !== "." &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    if (board[0][0] === "O") {
      o[0][0] += 1;
      o[1][1] += 1;
      o[2][2] += 1;
      oWin = true;
    } else if (board[0][0] === "X") {
      xWin = true;
    }
    on = true;
  }
  if (
    board[0][2] !== "." &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    if (board[0][2] === "O") {
      o[0][2] += 1;
      o[1][1] += 1;
      o[2][0] += 1;
      oWin = true;
      on = true;
    } else if (board[0][2] === "X") {
      xWin = true;
    }
  }
  if (on) {
    let oCnt = o.reduce(
      (acc, cur) => acc + cur.reduce((acc2) => acc + 1, 0),
      0
    );
    for (let i = 2; i >= 0; i--) {
      for (let j = 2; j >= 0; j--) {
        if (o[i][j] === 2 && oCnt === 5) {
          return "O";
        } else if (o[i][j] === 2 && oCnt !== 5) {
          return false;
        }
      }
    }
  }

  if (
    o.reduce(
      (acc, cur) => acc + cur.reduce((acc2, cur2) => acc2 + cur2, 0),
      0
    ) === 3
  )
    return "O";

  if (oWin && !xWin) return "O";
  if (xWin && !oWin) return "X";
  if (oWin && xWin) return 0;
  return "Draw";
}

function solution(board) {
  let o = 0;
  let x = 0;

  for (let i = 0; i < 3; i++) {
    board[i] = board[i].split("");
  }

  for (const row of board) {
    o += row.filter((el) => el === "O").length;
    x += row.filter((el) => el === "X").length;
  }

  if (o === 0) {
    return x === 0 ? 1 : 0;
  }
  if (x > o) return 0;

  const winner = whoIsWinner(board);
  console.log(winner);
  //만약 승패가 결정났을 때
  if (winner) {
    if (winner === "O") {
      return o > x ? (o % x === 1 ? 1 : 0) : 0;
    } else if (winner === "X") {
      return o === x ? 1 : 0;
    } else if (winner === "Draw") {
      return o >= x ? (o % x <= 1 ? 1 : 0) : 0;
    }
  } else return 0;
}
