/*
임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다.
n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.
*/

function solution(n) {
  const x = Math.sqrt(n);
  return x ** 2 === Math.floor(x) ** 2 ? (Math.abs(x) + 1) ** 2 : -1;
}
