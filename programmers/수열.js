function solution(sequence, k) {
  if (sequence[0] === k) return [0, 0];
  const dp = sequence.map((el, idx) => [idx, 0, k - el]);
  console.log(dp);
  const stack = [];
  for (let i = 0; i < sequence.length; i++) {
    const seq = sequence[i];
    if (seq > k) break;
    if (seq === k) return [i, i];
    for (let j = 0; j < dp[i].length; j++) {
      let [startIndex, diff, rest] = dp[i];
      console.log(startIndex, diff, rest);
      rest -= seq;
      if (rest === 0) {
        stack.push([startIndex, diff]);
      } else if (rest > 0) {
        if (i === sequence.length - 1) break;
        dp[i + 1].push([startIndex, diff + 1, rest]);
      } else {
        break;
      }
    }
  }
  let minDiff = 1000000;
  let index = 0;
  console.log(dp);
  while (stack.length) {
    let [startIndex, diff] = stack.pop();
    const tmp = minDiff;
    minDiff = Math.min(minDiff, diff);
    if (minDiff < tmp) {
      index = startIndex;
    }
  }
  return [index, index + minDiff];
}

solution([1, 2, 3, 4, 5], 6);
