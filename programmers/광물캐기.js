function solution(picks, minerals) {
  //각 곡괭이별로 광물을 캤을 때 생기는 피로도
  //전역변수보다는 내부함수로 사용하도록 함
  const diamond = { diamond: 1, iron: 1, stone: 1 };
  const iron = { diamond: 5, iron: 1, stone: 1 };
  const stone = { diamond: 25, iron: 5, stone: 1 };

  //광물 캐는 함수(남은 광물들, 남은 다이아곡괭이,철곡괭이,돌곡괭이)
  //위 세가지 객체 값을 사용하기 위해 내부함수로 선언했다.
  function digging(minerals, diamondCnt, ironCnt, stoneCnt) {
    //미네랄이 없거나, 곡괭이가 없다면 0을 리턴해준다
    if (!minerals.length) return 0;
    if (diamondCnt + ironCnt + stoneCnt === 0) return 0;

    //남은 미네랄을 꺼내기 위해 배열을 복사함
    let restMineral = [...minerals];

    //각각 해당 곡괭이를 선택했을 때 생기는 피로도를 저장한 변수
    let diaFatigue = 0;
    let ironFatigue = 0;
    let stoneFatigue = 0;

    //최대 5번 광물을 캘 수 있고, 광물이 없으면 그만둔다
    for (let i = 0; i < 5; i++) {
      if (restMineral.length === 0) break;
      const mineral = restMineral.shift();

      //곡괭이 여부에 따라 점수 계산
      diaFatigue += diamondCnt ? diamond[mineral] : 0;
      ironFatigue += ironCnt ? iron[mineral] : 0;
      stoneFatigue += stoneCnt ? stone[mineral] : 0;
    }

    //지금 광물을 해당 곡괭이로 캤다는 가정하에, 재귀함수 실행
    //재귀함수의 return을 통해 피로도 누적값을 얻을 수 있다.
    if (diamondCnt > 0)
      diaFatigue += digging(restMineral, diamondCnt - 1, ironCnt, stoneCnt);
    if (ironCnt > 0)
      ironFatigue += digging(restMineral, diamondCnt, ironCnt - 1, stoneCnt);
    if (stoneCnt > 0)
      stoneFatigue += digging(restMineral, diamondCnt, ironCnt, stoneCnt - 1);

    // 곡괭이에 대한 피로도가 없다는 말은, 해당 곡괭이를 쓰지 않았으므로 0이다.
    // 따라서 최소값을 구할 때 방해되므로 일부러 MAX_SAFE_INTEGER 부여
    if (!diaFatigue) diaFatigue = Number.MAX_SAFE_INTEGER;
    if (!ironFatigue) ironFatigue = Number.MAX_SAFE_INTEGER;
    if (!stoneFatigue) stoneFatigue = Number.MAX_SAFE_INTEGER;

    // 세 곡괭이 중 피로도 소모가 가장 적은 피로도를 반환한다 (재귀함수로 누적됨)
    return Math.min(diaFatigue, ironFatigue, stoneFatigue);
  }

  return digging(minerals, picks[0], picks[1], picks[2]);
}
