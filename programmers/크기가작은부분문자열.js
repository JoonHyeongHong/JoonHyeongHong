function solution(t, p) {
  let count = 0;
  let i = 0;

  for (let i = 0; i <= t.length - p.length; i++) {
    if (t.substr(i, p.length) <= +p) {
      count++;
    }
  }

  return count;
}
