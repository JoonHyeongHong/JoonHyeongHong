const language = {
  cpp: (array) => array.filter((el) => el[0] === "cpp"),
  java: (array) => array.filter((el) => el[0] === "java"),
  python: (array) => array.filter((el) => el[0] === "python"),
  "-": (array) => array,
};

const development = {
  backend: (array) => array.filter((el) => el[1] === "backend"),
  frontend: (array) => array.filter((el) => el[1] === "frontend"),
  "-": (array) => array,
};

const career = {
  junior: (array) => array.filter((el) => el[2] === "junior"),
  senior: (array) => array.filter((el) => el[2] === "senior"),
  "-": (array) => array,
};

const soulfood = {
  chicken: (array) => array.filter((el) => el[3] === "chicken"),
  pizza: (array) => array.filter((el) => el[3] === "pizza"),
  "-": (array) => array,
};

const score = (array, number) => {
  return array.filter((el) => el[4] >= +number);
};

function solution(info, query) {
  const information = info.map((el) => el.split(" "));

  const conditions = [
    (el) => language[el],
    (el) => development[el],
    (el) => career[el],
    (el) => soulfood[el],
    (el) => (array) => score(array, el),
  ];

  const answer = [];
  query.forEach((q) => {
    let result = [...information];
    const q2 = q.split(" and ").join(" ").split(" ");
    conditions.forEach((condition, idx) => {
      const func = condition(q2[idx]);
      if (func) {
        result = func(result);
      }
    });
    answer.push(result.length);
  });

  return answer;
}
