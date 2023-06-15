function solution(places) {
  const answer = [];
  //Math.abs(r1-r2) + Math.abs(c1-c2)
  //맨하튼 거리 > 3 or 파티션 막혀있어야함

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const checkPartition = (place, player1, player2) => {
    const [x1, y1] = player1;
    const [x2, y2] = player2;
    const visited = Array.from({ length: 5 }, () => new Array(5).fill(false));

    const queue = [player1];
    while (queue.length) {
      const [x, y] = queue.shift();
      visited[x][y] = true;

      if (x === x2 && y === y2) return false;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (0 <= nx && nx < 5 && 0 <= ny && ny < 5) {
          if (
            Math.abs(x2 - x1) + Math.abs(y2 - y1) <
            Math.abs(x2 - nx) + Math.abs(y2 - ny)
          )
            continue;
          if (!visited[nx][ny] && place[nx][ny] !== "X") {
            queue.push([nx, ny]);
          }
        }
      }
    }
    return true;
  };

  const checkDiff = (place, players) => {
    for (let i = 0; i < players.length - 1; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const diff =
          Math.abs(players[i][0] - players[j][0]) +
          Math.abs(players[i][1] - players[j][1]);

        if (diff <= 2) {
          if (!checkPartition(place, players[i], players[j])) {
            return false;
          }
        }
      }
    }
    return true;
  };

  for (const place of places) {
    const players = [];
    place.forEach((row, idx1) =>
      row.split("").forEach((el, idx2) => {
        if (el === "P") players.push([idx1, idx2]);
      })
    );

    if (checkDiff(place, players)) {
      answer.push(1);
    } else {
      answer.push(0);
    }
  }
  return answer;
}
