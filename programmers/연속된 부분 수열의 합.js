/*

비내림차순으로 정렬된 수열이 주어질 때, 다음 조건을 만족하는 부분 수열을 찾으려고 합니다.

기존 수열에서 임의의 두 인덱스의 원소와 그 사이의 원소를 모두 포함하는 부분 수열이어야 합니다.
부분 수열의 합은 k입니다.
합이 k인 부분 수열이 여러 개인 경우 길이가 짧은 수열을 찾습니다.
길이가 짧은 수열이 여러 개인 경우 앞쪽(시작 인덱스가 작은)에 나오는 수열을 찾습니다.
수열을 나타내는 정수 배열 sequence와 부분 수열의 합을 나타내는 정수 k가 매개변수로 주어질 때, 위 조건을 만족하는 부분 수열의 시작 인덱스와 마지막 인덱스를 배열에 담아 return 하는 solution 함수를 완성해주세요. 이때 수열의 인덱스는 0부터 시작합니다.

dp인줄 알고 한 뻘짓
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
*/

/*
2차 뻘짓 
function solution(sequence, k) {
    let leftIndex = 0;
    let rightIndex = -1;
    let sum = 0;
    const stack = [];
    
    
    for(let i = 0 ; i < sequence.length ; i++){
        const seq = sequence[i]
        if(seq === k) return [i,i];
        if(seq > k) break;
        sum+=seq
        rightIndex++;
        while(sum > k){
            sum -= sequence[leftIndex]
            leftIndex++;
        }
        if(sum === k){
            stack.push([leftIndex,rightIndex]);
        }
    }
    
    let minDiff = 1000000;
  while (stack.length) {
    let [startIndex, endIndex] = stack.pop();
    const tmp = minDiff;
    minDiff = Math.min(minDiff, endIndex - startIndex);
    if(minDiff === tmp){
        if(startIndex < leftIndex){
            leftIndex = startIndex;
            rightIndex = endIndex;
        }   
    }
    else if (minDiff < tmp) {
      leftIndex = startIndex;
      rightIndex = endIndex;
    }
  }
  return [leftIndex,rightIndex];
}
*/

/*
function solution(sequence, k) {
  let leftIndex = 0;
  let rightIndex = 0;
  let sum = sequence[0];
  const stack = [];

  while (rightIndex < sequence.length) {
    if (sum < k) {
      rightIndex++;
      sum += sequence[rightIndex];
    } else if (sum > k) {
      sum -= sequence[leftIndex];
      leftIndex++;
    } else {
      stack.push([leftIndex, rightIndex]);
      rightIndex++;
      sum += sequence[rightIndex];
    }
  }

  return stack.sort((a, b) => {
    const diff = Math.abs(a[0] - a[1]) - Math.abs(b[0] - b[1]);
    if (diff !== 0) return diff;
    return a[0] - b[0];
  })[0];
}
*/

function solution(sequence, k) {
  //right가 0인 이유는 sequence[0]부터 시작하게 하기 때문이다
  let [left, right] = [0, -1];

  let sum = 0;
  const answer = [];

  for (let i = 0; i < sequence.length; i++) {
    const seq = sequence[i];

    //seq값이 k를 넘어서면 의미가 없고, 제일 짧은 수열은 결국 seq가 k인 상황이다
    //0부터 순서대로 오르기 떄문에 그대로 끝나면, 제일 index도 제일 작은 값이다
    if (seq === k) return [i, i];
    if (seq > k) break;
    sum += seq;
    right++;

    //합계가 k를 넘기면, 더이상 수열의 의미가 없으므로,
    //left를 index 값으로 가진 수를 빼고 left를 하나씩 올려 k보다 작거나 같은 값으로 만든다.
    while (sum > k) {
      sum -= sequence[left];
      left++;
    }

    //이 때 부분수열이 완성됐다면 answer에 해당 left와 right를 넣어준다
    if (sum === k) {
      answer.push([left, right]);
    }
  }

  //그 뒤 제일 차이가 작은 값이 우선적으로
  //그 다음은 left가 제일 작은 값이 먼저 오도록 정렬해준다.
  return stack.sort((a, b) => {
    const diff = a[1] - a[0] - (b[1] - b[0]);
    if (diff !== 0) return diff;
    return a[0] - b[0];
  })[0];
}
solution([1, 2, 3, 4, 5], 6);
