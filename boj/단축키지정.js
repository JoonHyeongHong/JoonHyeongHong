/*
한글 프로그램의 메뉴에는 총 N개의 옵션이 있다. 각 옵션들은 한 개 또는 여러 개의 단어로 옵션의 기능을 설명하여 놓았다. 그리고 우리는 위에서부터 차례대로 각 옵션에 단축키를 의미하는 대표 알파벳을 지정하기로 하였다. 단축키를 지정하는 법은 아래의 순서를 따른다.

먼저 하나의 옵션에 대해 왼쪽에서부터 오른쪽 순서로 단어의 첫 글자가 이미 단축키로 지정되었는지 살펴본다. 만약 단축키로 아직 지정이 안 되어있다면 그 알파벳을 단축키로 지정한다.
만약 모든 단어의 첫 글자가 이미 지정이 되어있다면 왼쪽에서부터 차례대로 알파벳을 보면서 단축키로 지정 안 된 것이 있다면 단축키로 지정한다.
어떠한 것도 단축키로 지정할 수 없다면 그냥 놔두며 대소문자를 구분치 않는다.
위의 규칙을 첫 번째 옵션부터 N번째 옵션까지 차례대로 적용한다.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());
const getShortcutList = (input) => {
  const shortcutList = {};

  const getShortCut = (words) => {
    const splittedWords = words.split(" ");
    for (let i = 0; i < splittedWords.length; i++) {
      const firstChar = splittedWords[i].split("")[0];
      if (shortcutList[firstChar.toUpperCase()] === undefined) {
        newSplittedWords = splittedWords[i].split("");
        newSplittedWords[0] = `[${firstChar}]`;
        splittedWords[i] = newSplittedWords.join("");
        shortcutList[firstChar.toUpperCase()] = splittedWords.join(" ");
        return;
      }
    }

    for (const [index, char] of words.split("").entries()) {
      if (char === " ") continue;
      if (shortcutList[char.toUpperCase()] === undefined) {
        const newWords = words.split("");
        newWords[index] = `[${char}]`;
        shortcutList[char.toUpperCase()] = newWords.join("");
        return;
      }
    }

    return (shortcutList[words] = words);
  };

  for (const words of input) {
    getShortCut(words);
  }

  return Object.values(shortcutList);
};

console.log(getShortcutList(input).join("\n"));
