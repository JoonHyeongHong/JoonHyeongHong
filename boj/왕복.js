/*
왕복 달리기 선수는 N개의 이어진 일직선상의 코스들을 모두 지나 끝까지 도달한 뒤에, 다시 출발 지점으로 돌아와야 한다. 전체 코스들을 지나고 있는 상황에서 이동 거리가 K일 때, 현재 지나고 있는 코스의 번호를 출력하는 프로그램을 작성하시오. 단, 이동 거리가 K가 두 코스 사이에 위치한 경우에는 ‘지나야 할’ 코스의 번호를 출력한다.

예를 들어 N=5일 때, 각 코스의 길이가 차례대로 7, 4, 2, 4, 5라고 가정하자. 출발 지점을 0이라고 하면, 전체 코스가 구성된 형태를 다음과 같이 그릴 수 있다.



K=0일 때, 1번 코스를 지나고 있으므로 1을 출력한다.
K=7일 때, 2번 코스를 지나고 있으므로 2를 출력한다.
K=9일 때, 2번 코스를 지나고 있으므로 2를 출력한다.
K=12일 때, 3번 코스를 지나고 있으므로 3을 출력한다.
K=28일 때, 이는 끝까지 도달한 뒤에 시작 위치로 돌아오는 과정으로 볼 수 있다. 4번 코스를 지나고 있으므로 4를 출력한다.
또한 K는 항상 왕복 거리보다 작은 양의 정수 혹은 0으로 주어진다. 예를 들어 위와 같이 전체 코스들의 길이 합을 22라고 하면, 0≤K≤43이다.
*/
const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [_, K] = input[0].split(" ").map(Number);
const course = input[1].split(" ").map(Number);
const getCourseIndex = (course, K) => {
  let uTurn = false;
  let distance = 0;
  let courseIndex = 0;

  while (distance <= K) {
    distance += course[courseIndex];
    if (distance > K) return courseIndex + 1;
    uTurn ? courseIndex-- : courseIndex++;
    if (courseIndex < 0 || courseIndex >= course.length) {
      courseIndex = Math.min(Math.max(courseIndex, 0), course.length - 1);
      uTurn = !uTurn;
    }
  }
  return courseIndex + 1;
};

console.log(getCourseIndex(course, K));
