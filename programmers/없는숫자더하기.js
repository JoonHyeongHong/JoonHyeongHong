function solution(numbers) {
  const Number = new Array(10).fill().map((v, idx) => idx);

  return Number.filter((v) => !numbers.includes(v)).reduce(
    (v, acc) => v + acc,
    0
  );
}
