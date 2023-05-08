/*
자연수 x를 y로 변환하려고 합니다. 사용할 수 있는 연산은 다음과 같습니다.

x에 n을 더합니다
x에 2를 곱합니다.
x에 3을 곱합니다.
자연수 x, y, n이 매개변수로 주어질 때, x를 y로 변환하기 위해 필요한 최소 연산 횟수를 return하도록 solution 함수를 완성해주세요. 이때 x를 y로 만들 수 없다면 -1을 return 해주세요.
*/

function solution(x, y, n) {
  //다이나믹 프로그래밍 문제 같다

  //x랑 y가 같으면 연산할 필요가 없다.
  if (x === y) return 0;
  const array = [[x]];

  //array의 길이만큼 반복
  //array의 길이는 n을 계산한 수가 초과하지 않는 이상 계속 늘어날 예정이다
  for (let i = 0; i < array.length; i++) {
    //arr =  array[계산 횟수]
    const arr = array[i];

    //arr에는 이전 횟수의 배열의 원소들을 +n, *2, *3한 값들이 들어있다
    for (let j = 0; j < arr.length; j++) {
      //array[i][j] === arr[j] === 현재 수
      //각각 n을 더한 값, * 2한 값, * 3한 값을 저장한 변수이다
      let [plusN, multiTwo, multiThree] = [arr[j] + n, arr[j] * 2, arr[j] * 3];

      //만약 이 세 수 중 하나가 n의 값과 일치한다면 현재 회수에서 +1을 한 값을 반환해주면 된다.
      if (plusN === y || multiTwo === y || multiThree === y) return i + 1;

      //만약 세 수 중 n이 없고, n보다 작다면 저장할 공간을 마련해줘야하기 떄문에
      if (plusN < y || multiTwo < y || multiThree < y) {
        //다음 배열이 존재하는 지 여부에 따라 array에 []을 넣어준다
        if (!array[i + 1]) array.push([]);
      }

      //그 뒤 각 수가 y를 넘는 지 안 넘는지 여부에 따라 추가해준다.
      if (plusN < y) array[i + 1].push(plusN);
      if (multiTwo < y) array[i + 1].push(multiTwo);
      if (multiThree < y) array[i + 1].push(multiThree);
    }

    //만약 현재 횟수의 계산이 끝나고, 다음 횟수의 계산을 시작할려고 하기 전에
    //중복되는 수가 있을 수 있으니, 한 번 정리해주고 간다.
    if (array[i + 1]) {
      array[i + 1] = [...new Set(array[i + 1])];
    }
  }

  //이 과정을 거쳤는데도 끝나지 않았다면, n을 만들 수 없는 것과 다름없으니 -1을 반환해준다.
  return -1;
}
