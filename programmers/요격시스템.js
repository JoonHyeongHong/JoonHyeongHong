/*

A 나라가 B 나라를 침공하였습니다. B 나라의 대부분의 전략 자원은 아이기스 군사 기지에 집중되어 있기 때문에 A 나라는 B 나라의 아이기스 군사 기지에 융단폭격을 가했습니다.
A 나라의 공격에 대항하여 아이기스 군사 기지에서는 무수히 쏟아지는 폭격 미사일들을 요격하려고 합니다. 이곳에는 백발백중을 자랑하는 요격 시스템이 있지만 운용 비용이 상당하기 때문에 미사일을 최소로 사용해서 모든 폭격 미사일을 요격하려 합니다.
A 나라와 B 나라가 싸우고 있는 이 세계는 2 차원 공간으로 이루어져 있습니다. A 나라가 발사한 폭격 미사일은 x 축에 평행한 직선 형태의 모양이며 개구간을 나타내는 정수 쌍 (s, e) 형태로 표현됩니다. B 나라는 특정 x 좌표에서 y 축에 수평이 되도록 미사일을 발사하며, 발사된 미사일은 해당 x 좌표에 걸쳐있는 모든 폭격 미사일을 관통하여 한 번에 요격할 수 있습니다. 단, 개구간 (s, e)로 표현되는 폭격 미사일은 s와 e에서 발사하는 요격 미사일로는 요격할 수 없습니다. 요격 미사일은 실수인 x 좌표에서도 발사할 수 있습니다.
각 폭격 미사일의 x 좌표 범위 목록 targets이 매개변수로 주어질 때, 모든 폭격 미사일을 요격하기 위해 필요한 요격 미사일 수의 최솟값을 return 하도록 solution 함수를 완성해 주세요.

*/

function solution(targets) {
  // 개수를 세기위한 변수
  let answer = 0;

  //타겟 정렬
  targets.sort((a, b) => {
    //만약 start가 같다면, left값으로 오름차순 정렬
    if (a[1] == b[1]) {
      return a[0] - b[0];
    }
    // 다르다면 end값으로 오름차순 정렬
    return a[1] - b[1];
  });

  //요격할 라인 초기화
  let cut = -1;

  //타겟 수 만큼 반복
  for (let i = 0; i < targets.length; i++) {
    let [start, end] = targets[i];

    //start가 cut보다 작은 경우 : right 기준으로 targets 배열을 정렬하였기에, end는 cut보다 클 수 밖에 없다.
    //start가 cut랑 같은 경우 : 시작점 또는 끝점으로 요격할 수 없으므로, 현재 cut 보다 큰 위치에서 요격을 해야한다. cut + 1과 동시에, 최대수치인 end로 변경
    //start가 cut보다 큰 경우 : targets의 첫 원소거나, 이후에 start가 cut보다 큰 경우이기 때문에 cut과 같은 경우랑 동일
    if (start >= cut) {
      answer++;
      cut = end;
    }
  }

  return answer;
}

/*
혼자서 노력해본 결과
... 조건식으로 해보려했으나, 예외가 있는지 테스트 케이스 일부를 통과하지 못했다
function solution(targets) {
    const map = [];
      
    targets.sort((a,b)=>(a[1]-a[0])-(b[1]-b[0]))
    for (let i = 0; i < targets.length; i++) {
      let [start, end] = targets[i];
      if (!map.length) map.push([start + 0.1, end -0.1]);
      else {
        let isPushed = false;
        for (let j = 0; j < map.length; j++) {
          let [mapStart, mapEnd] = map[j];
            //범위 안에 있는 경우
          if (mapStart < start && end < mapEnd){
              map[j] = [start + 0.1, end - 0.1];
              isPushed = true;
              break;
              //범위에 겹치긴 하나, 끝 부분이 더 작은 값인 경우
          } else if (start < mapStart && end < mapEnd && mapStart < end){
              map[j][1] = end - 0.1;
              isPushed = true;
              break;
              //범위에 겹치긴 하나, 시작 부분이 더 큰 값인 경우
          } else if (mapStart < start && mapEnd < end && start < mapEnd){
              map[j][0] = start + 0.1;
              isPushed = true;
              break;
              //범위가 완전히 큰 경우 (1)
          } else if (start < mapStart && mapEnd < end){
              isPushed = true;
              break;
          } 
        }
        if (!isPushed) map.push([start + 0.1, end - 0.1]);
      }
    }
      
      console.log(map);
    return map.length;
  }
*/

solution([
  [4, 5],
  [4, 8],
  [10, 14],
  [11, 13],
  [5, 12],
  [3, 7],
  [1, 4],
]);
