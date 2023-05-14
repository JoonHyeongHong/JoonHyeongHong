/*
문제
M이상 N이하의 소수를 모두 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 자연수 M과 N이 빈 칸을 사이에 두고 주어진다. (1 ≤ M ≤ N ≤ 1,000,000) M이상 N이하의 소수가 하나 이상 있는 입력만 주어진다.

출력
한 줄에 하나씩, 증가하는 순서대로 소수를 출력한다.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .split(" ");

//한줄 M N 밖에 없으므로, split("\n")이 아니라 split(" ") 민 해주었다.

//input.map(Number) === input.map((el,index,arr)=>Number(el,index,arr)) === input.map((...rest)=>Number(...rest));
const [M, N] = input.map(Number);

//N이 4이라면, [false,false,false,true,true]
const primeArray = new Array(N + 1).fill(true).fill(false, 0, 2);

//2부터 시작, 만약 N이 50이라면 7까지만 한다
for (let i = 2; i * i <= N + 1; i++) {
  //해당 값이 현재 true라면
  if (primeArray[i]) {
    //해당 값의 제곱에서 시작한다.
    // 2의 제곱인 4부터 시작해서, 2씩 더해가며 짝수 제거
    // 다음 i는 3이니, 9부터 시작해서 12 15 18 등 3의 배수 제거
    // 4는 false가 됐으니 넘어감
    // 5는 true이므로, 25부터 시작해 5의 배수 제거 (10,15,20) 등은 이미 2와 3의 배수에서 제거됨
    // 6은 false
    // 7은 true, 49 제거
    for (let j = i * i; j <= N + 1; j += i) {
      primeArray[j] = false;
    }
  }
}

//그런 식으로 만들어진 배열 primeArray의 index가 true인지 false인지에 따라 출력여부를 결정한다.
for (let i = M; i <= N; i++) {
  if (primeArray[i]) console.log(i);
}
