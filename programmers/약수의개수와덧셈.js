function yaksoo(n) {
  let cnt = 0;
  for (let i = Math.floor(Math.sqrt(n)); i >= 1; i--) {
    if (n % i === 0) cnt += i % (n / i) === 0 ? 1 : 2;
  }
  return cnt;
}

function solution(left, right) {
  let answer = 0;
  for (let i = left; i <= right; i++) {
    answer += yaksoo(i) % 2 === 1 ? -i : i;
  }
  return answer;
}
