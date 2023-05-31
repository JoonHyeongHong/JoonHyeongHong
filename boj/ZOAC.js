/*
2018년 12월, 처음 시작하게 된 ZOAC의 오프닝을 맡은 성우는 누구보다 화려하게 ZOAC를 알리려 한다.
앞 글자부터 하나씩 보여주는 방식은 너무 식상하다고 생각한 성우는 문자열을 보여주는 새로운 규칙을 고안해냈다!
규칙은 이러하다. 아직 보여주지 않은 문자 중 추가했을 때의 문자열이 사전 순으로 가장 앞에 오도록 하는 문자를 보여주는 것이다.
예를 들어 ZOAC를 보여주고 싶다면, A → AC → OAC → ZOAC 순으로 보여주면 된다.
바쁜 성우를 위하여 이 규칙대로 출력해주는 프로그램을 작성하시오.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const basedString = input[0].split("");
const nextString = (string) => {
  const nextString = [];
  for (let i = 0; i < basedString.length; i++) {
    const newString = [...string];
    if (newString[i] === basedString[i]) continue;
    newString[i] = basedString[i];
    nextString.push(newString);
  }
  return returnFastestString(nextString);
};

const returnFastestString = (array) => {
  let fastestString = array[0];
  for (let i = 1; i < array.length; i++) {
    fastestString = compareString(fastestString, array[i]);
  }
  return fastestString;
};

const compareString = (a, b) => {
  const filterA = a.filter((el) => el !== "");
  const filterB = b.filter((el) => el !== "");
  if (filterA.length !== filterB.length) return a.length < b.length ? a : b;
  for (let i = 0; i < filterA.length; i++) {
    if (filterA[i] === filterB[i]) continue;
    if (filterA[i].charCodeAt(0) < filterB[i].charCodeAt(0)) return a;
    else if (filterA[i].charCodeAt(0) > filterB[i].charCodeAt(0)) return b;
  }
  return a;
};

const solution = () => {
  let newString = new Array(basedString.length).fill("");
  for (let i = 0; i < basedString.length; i++) {
    newString = nextString(newString);
    console.log(newString.join(""));
  }
};

solution();
