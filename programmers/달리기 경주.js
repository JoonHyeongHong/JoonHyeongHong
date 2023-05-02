/*
얀에서는 매년 달리기 경주가 열립니다. 해설진들은 선수들이 자기 바로 앞의 선수를 추월할 때 추월한 선수의 이름을 부릅니다. 예를 들어 1등부터 3등까지 "mumu", "soe", "poe" 선수들이 순서대로 달리고 있을 때, 해설진이 "soe"선수를 불렀다면 2등인 "soe" 선수가 1등인 "mumu" 선수를 추월했다는 것입니다. 즉 "soe" 선수가 1등, "mumu" 선수가 2등으로 바뀝니다.

선수들의 이름이 1등부터 현재 등수 순서대로 담긴 문자열 배열 players와 해설진이 부른 이름을 담은 문자열 배열 callings가 매개변수로 주어질 때, 경주가 끝났을 때 선수들의 이름을 1등부터 등수 순서대로 배열에 담아 return 하는 solution 함수를 완성해주세요.
*/

function solution(players, callings) {
  //선수들의 등수 정보를 객체로 받는 용도
  const playerInfo = {};
  players.forEach((player, idx) => {
    playerInfo[player] = idx;
  });

  //해설진이 이름을 부를 때마다, 등수가 바뀐다.
  //해당 이름을 키값으로 가진, 등수를 idx에 저장
  //등수 순서대로 저장되있는 players 배열에 [idx-1] 번째 선수가, 앞에 있는 선수가 된다.
  //두 선수의 배열 내 위치와, 객체의 등수를 바꿔주면 된다. (tmp = A , A = B, B = tmp)
  callings.forEach((calledName) => {
    let idx = playerInfo[calledName];
    let frontPlayerName = players[idx - 1];

    players[idx] = players[idx - 1];
    players[idx - 1] = calledName;

    playerInfo[calledName] = idx - 1;
    playerInfo[frontPlayerName] = idx;
  });

  return players;
}
