/*
스택 (stack)은 기본적인 자료구조 중 하나로, 컴퓨터 프로그램을 작성할 때 자주 이용되는 개념이다. 스택은 자료를 넣는 (push) 입구와 자료를 뽑는 (pop) 입구가 같아 제일 나중에 들어간 자료가 제일 먼저 나오는 (LIFO, Last in First out) 특성을 가지고 있다.

1부터 n까지의 수를 스택에 넣었다가 뽑아 늘어놓음으로써, 하나의 수열을 만들 수 있다. 이때, 스택에 push하는 순서는 반드시 오름차순을 지키도록 한다고 하자. 임의의 수열이 주어졌을 때 스택을 이용해 그 수열을 만들 수 있는지 없는지, 있다면 어떤 순서로 push와 pop 연산을 수행해야 하는지를 알아낼 수 있다. 이를 계산하는 프로그램을 작성하라.
*/

//입력을 위한 fs
const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .split("\n")
  .map(Number);

const [n, ...nums] = input; // input[0]과 나머지 매개변수를 통한 nums에 할당하기
const stack = []; // 스택을 이용한 문제이므로 만든 스택.
let answer = ""; //출력값을 저장해두기 위핸 문자열 변수
let number = 1; // 숫자 1씩 증가시키며 스택에 넣기 위한 변수

//n만큼 반복해서 stack을 pop해야함
for (let i = 0; i < n; i++) {
  const num = nums[i]; // 꺼내야할 수
  while (number <= num) {
    // 만약 꺼내야할 수보다 number가 작으면
    stack.push(number++); // stack에 해당 수를 넣고 1증가시킴
    answer += "+ "; // 스택에 push 했으므로 + 추가
  }

  const popNum = stack.pop(); // 그렇게 stack에서 꺼낸 수가
  if (popNum !== num) {
    // 꺼내야할 수와 다르다면
    return console.log("NO"); // return No
  }
  answer += "- "; // 꺼내야할 수 였다면, 조건문을 지나쳤으므로 answer에 - 추가
}

console.log(answer.split(" ").join("\n")); // 이후 answer 값 한 줄 단위로 출력
