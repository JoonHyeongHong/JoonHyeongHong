/*
네오와 프로도가 숫자놀이를 하고 있습니다. 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.

다음은 숫자의 일부 자릿수를 영단어로 바꾸는 예시입니다.

1478 → "one4seveneight"
234567 → "23four5six7"
10203 → "1zerotwozero3"
이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다. s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

참고로 각 숫자에 대응되는 영단어는 다음 표와 같습니다.

숫자	영단어
0	zero
1	one
2	two
3	three
4	four
5	five
6	six
7	seven
8	eight
9	nine
*/

function solution(s) {
  //답을 return 할 때 쓸 문자열 변수 answer
  let answer = "";

  //해당 문자열과 숫자를 매칭시키기 위한 객체 obj
  const obj = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ].reduce((acc, cur, idx) => {
    acc[cur] = idx;
    return acc;
  }, {});

  //stack처럼 사용할 변수
  let str = "";

  for (const word of s) {
    //만약 word가 숫자라면, answer에 숫자를 더하고(문자열로 더해짐) 이후 continue
    if (!isNaN(word)) {
      answer += word;
      continue;
    }

    //그게 아니라면, str에 word 저장
    //str이 obj에 저장된 key값이 된다면
    //해당 key의 value를 answer에 더하고
    //str 초기화
    str += word;
    if (obj[str] >= 0) {
      answer += obj[str];
      str = "";
    }
  }

  //그렇게 구해진 answer는 문자열이므로, 숫자화시켜 리턴.
  return +answer;
}
