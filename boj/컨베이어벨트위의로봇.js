/*
1. 컨베이어 벨트 회전
2. 로봇을 올리는 위치에 올리거나 어떤 칸으로 이동 시, 그 칸의 내구도 1 감소


1. 벨트가 각 칸위에 있는 로봇과 함께 회전
2. 가장 먼저 벨트에 올라간 로봇부터, 벨트가 회전하는 방향으로 한칸 이동할 수 있다면 이동
    - 없다면 가만히 있는다
    - 이동하려면 이동하려는 칸에 로봇이 없고, 그 칸의 내구도가 1 이상 남아있어야함
3. 올리는 위치에 내구도가 0이 아니면 로봇 올린다
4. 내구도가 0인 칸의 개수가 K개 이상이라면 과정 종료, 그게 아니면 1번으로 돌아간다

종료 시 몇 번째 단계가 진행 중이었는지 구해보자. 시작은 1단계
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const conveyorBelt = input[1].split(" ").map(Number);
const isRobotOnBeltArray = new Array(N * 2).fill(0);

const solution = () => {
  let stage = 0;
  let conveyorBeltIndex = 0;

  const dropRobot = () => {
    isRobotOnBeltArray[(conveyorBeltIndex + N - 1) % (N * 2)] = 0;
  };

  const rotateBelt = () => {
    conveyorBeltIndex = conveyorBeltIndex ? conveyorBeltIndex - 1 : N * 2 - 1;
    dropRobot();
  };

  const moveRobot = () => {
    for (let i = N - 2; i >= 1; i--) {
      const currentIndex = conveyorBeltIndex + i;
      if (isRobotOnBeltArray[currentIndex % (N * 2)]) {
        if (
          conveyorBelt[(currentIndex + 1) % (N * 2)] >= 1 &&
          isRobotOnBeltArray[(currentIndex + 1) % (N * 2)] === 0
        ) {
          isRobotOnBeltArray[currentIndex % (N * 2)] = 0;
          isRobotOnBeltArray[(currentIndex + 1) % (N * 2)] = 1;
          conveyorBelt[(currentIndex + 1) % (N * 2)]--;
        }
      }
      dropRobot();
    }
  };

  const insertRobot = () => {
    if (conveyorBelt[conveyorBeltIndex] > 0) {
      isRobotOnBeltArray[conveyorBeltIndex] = 1;
      conveyorBelt[conveyorBeltIndex]--;
    }
  };

  const isFinish = () => {
    return (
      conveyorBelt.reduce((acc, cur) => (cur === 0 ? acc + 1 : acc), 0) >= K
    );
  };

  while (!isFinish()) {
    stage++;
    rotateBelt();
    moveRobot();
    insertRobot();
  }

  return stage;
};

console.log(solution());
