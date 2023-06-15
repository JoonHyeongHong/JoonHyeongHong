function solution(want, number, discount) {
  let answer = 0;

  const plan = want.reduce((acc, cur, idx) => {
    acc[cur] = number[idx];
    return acc;
  }, {});

  console.log(plan);

  const isMatch = (array) => {
    const map = new Map();
    for (let i = 0; i < array.length; i++) {
      map[array[i]] = (map[array[i]] || 0) + 1;
    }
    for (const item of want) {
      if (map[item] !== plan[item]) return false;
    }

    return true;
  };

  for (let i = 0; i < discount.length - 9; i++) {
    if (isMatch(discount.slice(i, i + 10))) answer++;
  }

  return answer;
}
