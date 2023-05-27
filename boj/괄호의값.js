/*
4개의 기호 ‘(’, ‘)’, ‘[’, ‘]’를 이용해서 만들어지는 괄호열 중에서 올바른 괄호열이란 다음과 같이 정의된다.

한 쌍의 괄호로만 이루어진 ‘()’와 ‘[]’는 올바른 괄호열이다.
만일 X가 올바른 괄호열이면 ‘(X)’이나 ‘[X]’도 모두 올바른 괄호열이 된다.
X와 Y 모두 올바른 괄호열이라면 이들을 결합한 XY도 올바른 괄호열이 된다.
예를 들어 ‘(()[[]])’나 ‘(())[][]’ 는 올바른 괄호열이지만 ‘([)]’ 나 ‘(()()[]’ 은 모두 올바른 괄호열이 아니다. 우리는 어떤 올바른 괄호열 X에 대하여 그 괄호열의 값(괄호값)을 아래와 같이 정의하고 값(X)로 표시한다.

‘()’ 인 괄호열의 값은 2이다.
‘[]’ 인 괄호열의 값은 3이다.
‘(X)’ 의 괄호값은 2×값(X) 으로 계산된다.
‘[X]’ 의 괄호값은 3×값(X) 으로 계산된다.
올바른 괄호열 X와 Y가 결합된 XY의 괄호값은 값(XY)= 값(X)+값(Y) 로 계산된다.
예를 들어 ‘(()[[]])([])’ 의 괄호값을 구해보자. ‘()[[]]’ 의 괄호값이 2 + 3×3=11 이므로 ‘(()[[]])’의 괄호값은 2×11=22 이다. 그리고 ‘([])’의 값은 2×3=6 이므로 전체 괄호열의 값은 22 + 6 = 28 이다.

여러분이 풀어야 할 문제는 주어진 괄호열을 읽고 그 괄호값을 앞에서 정의한대로 계산하여 출력하는 것이다.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const obj = { ")": "(", "]": "[", "[": "]", "(": ")" };
const solution = (string) => {
  if (string === "()") return 2;
  if (string === "[]") return 3;
  let score = [];
  const stack = [];
  let innerString = "";
  let isOpened = false;
  let opening = "";
  let stringArr = string.split("");
  while (stringArr.length > 0) {
    let s = stringArr.shift();
    if (isOpened) {
      if (s === "(" || s === "[") {
        stack.push(s);
      } else if (s === obj[opening] && stack.length === 0) {
        score.push(solution(opening + obj[opening]) * solution(innerString));
        innerString = "";
        isOpened = false;
      } else if (s === ")" || s === "]") {
        const pop = stack.pop();
        if (s !== obj[pop]) {
          console.log(innerString);
          return 0;
        }
        innerString += s;
      }
    } else {
      if (s === "(" || s === "[") {
        opening = s;
        isOpened = true;
      } else {
        console.log(s);
        return 0;
      }
    }
  }
  if (isOpened) return 0;
  return score.reduce((acc, cur) => (acc += cur), 0);
};

console.log(solution(input[0]));
