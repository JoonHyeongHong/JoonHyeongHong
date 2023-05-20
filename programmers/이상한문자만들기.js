/*
문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.
*/

function solution(s) {
  return s
    .split(" ")
    .reduce(
      (acc, word) =>
        acc +
        word
          .split("")
          .reduce(
            (acc2, alphabet, idx) =>
              (acc2 +=
                idx % 2 ? alphabet.toLowerCase() : alphabet.toUpperCase()),
            ""
          ) +
        " ",
      ""
    )
    .split("")
    .slice(0, s.length)
    .join("");
}
