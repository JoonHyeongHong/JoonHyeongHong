/*
수많은 마라톤 선수들이 마라톤에 참여하였습니다. 
단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.
*/

function solution(participant, completion) {
  //완주자 명단을 객체로 만든다.
  const obj = completion.reduce((acc, cur) => {
    //만약 이미 존재한다면 +1을 해주고, 숫자 1로 초기화해준다.
    acc[cur] = acc[cur] >= 1 ? acc[cur] + 1 : 1;
    return acc;
  }, {});

  //그 뒤 참가자 명단을 반복해서
  // obj에 해당 이름이 없거나, 완주자 수보다 참가자 수가 많으면 해당 이름을 가진 사람이 완주하지 못한 것이므로
  // 해당 name을 return해준다
  for (let name of participant) {
    if (obj[name] === undefined || --obj[name] < 0) return name;
  }
}
