const solution = (arr) => {
  const array = [];

  const set = new Set([...arr]);

  for (const number of set) {
    let cnt = 0;
    for (const element of arr) {
      if (number === element) cnt++;
    }

    if (cnt > 1) array.push(cnt);
  }

  return array.length ? array : [-1];
};

console.log(solution([1, 2, 3, 3, 3, 3, 4, 4]));
console.log(solution([3, 2, 4, 4, 2, 5, 2, 5, 5]));
console.log(solution([3, 5, 7, 9, 1]));
