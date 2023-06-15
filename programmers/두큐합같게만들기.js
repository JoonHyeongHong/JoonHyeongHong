function solution(queue1, queue2) {
  let minCount = Number.MAX_SAFE_INTEGER;

  let q1 = queue1.reduce((acc, cur) => acc + cur, 0);
  let q2 = queue2.reduce((acc, cur) => acc + cur, 0);

  let q1Index = 0;
  let q2Index = 0;
  let cnt = 0;
  let length = queue1.length;
  if ((q1 + q2) % 2) return -1;
  let target = (q1 + q2) / 2;
  while (queue1.length < length * 2 || queue2.length < length * 2) {
    if (q1 > q2) {
      let pop = queue1[q1Index++];
      queue2.push(pop);
      q1 -= pop;
      q2 += pop;
    } else if (q1 < q2) {
      let pop = queue2[q2Index++];
      queue1.push(pop);
      q1 += pop;
      q2 -= pop;
    } else {
      return cnt;
    }
    cnt++;
  }
  return -1;
}
