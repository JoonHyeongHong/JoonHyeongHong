function solution(data, col, row_begin, row_end) {
  data.sort((a, b) => {
    if (a[col - 1] === b[col - 1]) {
      return b[0] - a[0];
    }
    return a[col - 1] - b[col - 1];
  });

  const S = data.map((row, idx) =>
    row.reduce((acc, cur) => acc + (cur % (idx + 1)), 0)
  );

  const answer = S.slice(row_begin - 1, row_end);

  return answer.reduce((acc, cur) => acc ^ cur, 0);
}
