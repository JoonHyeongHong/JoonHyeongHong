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
