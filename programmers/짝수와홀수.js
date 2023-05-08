/*
정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 함수, solution을 완성해주세요.
*/

function solution(num) {
  // num % 2 === 1 ? 'Odd' : 'Even'의 테스트 케이스 일부가 틀린 이유는
  // 음수는 나머지 2를 하면 -1이 되기 떄문이다.
  // 따라서 해당 코드를 고친다면 Math.abs(num) % 2 === 1 ? 'Odd' : 'Even'이 될 것이다.

  return Math.abs(num) % 2 === 1 ? "Odd" : "Even";
}
