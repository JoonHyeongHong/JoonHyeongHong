function solution(n, info) {
  var answer = [];
  const infoScore = info.reduce((acc, cur, idx) => {
    acc += cur * (10 - idx);
    return acc;
  }, 0);
  let isCanWin = false;
  //a>b, a += k
  //a===b, a!==0 >> b += k;
  //a=b=0 >> k = 0;
  const maxScore = [Number.MIN_SAFE_INTEGER, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

  const checkScore = (array) => {
    let scoreA = 0;
    let scoreB = 0;
    for (let i = 0; i < 11; i++) {
      if (array[i] === info[i] && array[i] === 0) continue;
      if (array[i] > info[i]) {
        scoreA += 10 - i;
      } else if (array[i] <= info[i]) {
        scoreB += 10 - i;
      }
    }
    console.log(scoreA, scoreB);
    return scoreA - scoreB > 0 ? [scoreA - scoreB, array] : [0, 0];
  };
  const shooting = (n, scoreIndex, array) => {
    if (n === 0 || scoreIndex === 12) {
      const [scoreDiff, newArray] = checkScore(array);
      if (maxScore[0] < scoreDiff) {
        maxScore[0] = scoreDiff;
        maxScore[1] = newArray;
      } else if (maxScore[0] === scoreDiff) {
        for (let i = 10; i >= 0; i--) {
          if (newArray[i] > maxScore[1][i]) {
            maxScore[1] = newArray;
            break;
          } else if (newArray[i] < maxScore[1][i]) {
            maxScore[1] = maxScore[1];
            break;
          }
        }
      }
      return 0;
    }

    for (let j = 0; j <= info[scoreIndex] + 1; j++) {
      const newArray = [...array];
      newArray[scoreIndex] = j;
      shooting(n - j, scoreIndex + 1, newArray);
    }
  };
  shooting(n, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  return maxScore[0] > 0 ? maxScore[1] : [-1];
}
