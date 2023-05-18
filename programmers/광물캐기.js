/*
마인은 곡괭이로 광산에서 광석을 캐려고 합니다. 마인은 다이아몬드 곡괭이, 철 곡괭이, 돌 곡괭이를 각각 0개에서 5개까지 가지고 있으며, 곡괭이로 광물을 캘 때는 피로도가 소모됩니다. 각 곡괭이로 광물을 캘 때의 피로도는 아래 표와 같습니다.

image

예를 들어, 철 곡괭이는 다이아몬드를 캘 때 피로도 5가 소모되며, 철과 돌을 캘때는 피로도가 1씩 소모됩니다. 각 곡괭이는 종류에 상관없이 광물 5개를 캔 후에는 더 이상 사용할 수 없습니다.

마인은 다음과 같은 규칙을 지키면서 최소한의 피로도로 광물을 캐려고 합니다.

사용할 수 있는 곡괭이중 아무거나 하나를 선택해 광물을 캡니다.
한 번 사용하기 시작한 곡괭이는 사용할 수 없을 때까지 사용합니다.
광물은 주어진 순서대로만 캘 수 있습니다.
광산에 있는 모든 광물을 캐거나, 더 사용할 곡괭이가 없을 때까지 광물을 캡니다.
즉, 곡괭이를 하나 선택해서 광물 5개를 연속으로 캐고, 다음 곡괭이를 선택해서 광물 5개를 연속으로 캐는 과정을 반복하며, 더 사용할 곡괭이가 없거나 광산에 있는 모든 광물을 캘 때까지 과정을 반복하면 됩니다.

마인이 갖고 있는 곡괭이의 개수를 나타내는 정수 배열 picks와 광물들의 순서를 나타내는 문자열 배열 minerals가 매개변수로 주어질 때, 마인이 작업을 끝내기까지 필요한 최소한의 피로도를 return 하는 solution 함수를 완성해주세요.
*/

function solution(picks, minerals) {
  //각 곡괭이별로 광물을 캤을 때 생기는 피로도
  //전역변수보다는 내부함수로 사용하도록 함
  const diamond = { diamond: 1, iron: 1, stone: 1 };
  const iron = { diamond: 5, iron: 1, stone: 1 };
  const stone = { diamond: 25, iron: 5, stone: 1 };

  //광물 캐는 함수(남은 광물들, 남은 다이아곡괭이, 철곡괭이, 돌곡괭이)
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

  //현재 광물과 [곡괭이 갯수를 저장한 배열]
  return digging(minerals, ...picks);
}
