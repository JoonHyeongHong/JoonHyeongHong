/*

메리는 여름을 맞아 무인도로 여행을 가기 위해 지도를 보고 있습니다. 지도에는 바다와 무인도들에 대한 정보가 표시돼 있습니다. 지도는 1 x 1크기의 사각형들로 이루어진 직사각형 격자 형태이며, 격자의 각 칸에는 'X' 또는 1에서 9 사이의 자연수가 적혀있습니다. 지도의 'X'는 바다를 나타내며, 숫자는 무인도를 나타냅니다. 이때, 상, 하, 좌, 우로 연결되는 땅들은 하나의 무인도를 이룹니다. 지도의 각 칸에 적힌 숫자는 식량을 나타내는데, 상, 하, 좌, 우로 연결되는 칸에 적힌 숫자를 모두 합한 값은 해당 무인도에서 최대 며칠동안 머물 수 있는지를 나타냅니다. 어떤 섬으로 놀러 갈지 못 정한 메리는 우선 각 섬에서 최대 며칠씩 머물 수 있는지 알아본 후 놀러갈 섬을 결정하려 합니다.

지도를 나타내는 문자열 배열 maps가 매개변수로 주어질 때, 각 섬에서 최대 며칠씩 머무를 수 있는지 배열에 오름차순으로 담아 return 하는 solution 함수를 완성해주세요. 만약 지낼 수 있는 무인도가 없다면 -1을 배열에 담아 return 해주세요.

*/

function solution(maps) {
  //답 저장용
  const answer = [];
  //문자열인걸 배열로 바꾼 newMaps
  const newMaps = maps.map((el) => el.split(""));
  //"X"를 저장한 변수
  const sea = "X";

  //dfs에서 사용할 좌표이동용 배열
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  //내부변수 newMaps와 dx,dy를 사용하기 위해 내부함수로 선언한 dfs
  const dfs = (x, y) => {
    //dfs를 통해 넓이의 합계를 구할 것이기 때문에, 합을 저장할 변수
    let sum = +newMaps[x][y];
    //visited 효과를 주기위해서 "X"를 부여함
    newMaps[x][y] = sea;

    //네 방향으로 이동함
    for (let i = 0; i < 4; i++) {
      //이동 좌표 계산
      const nx = x + dx[i];
      const ny = y + dy[i];

      //만약 이동한 좌표가 지도를 빠져나가면 안되기 때문에 체크
      if (0 <= nx && nx < newMaps.length && 0 <= ny && ny < newMaps[0].length) {
        //그 뒤 해당 좌표가 바다거나, 이미 한 번 도착했던 곳이라면
        if (newMaps[nx][ny] !== sea) {
          //해당 좌표에서 계속 dfs를 이어가고, 그렇게 구한 합계를 sum에 더한다
          sum += dfs(nx, ny);
        }
      }
    }
    // 재귀를 통해 해당 섬의 넓이를 모두 구한 sum 반환
    return sum;
  };

  //맵의 처음부터 끝까지 돌기 위해 이중 반복문
  for (let i = 0; i < newMaps.length; i++) {
    for (let j = 0; j < newMaps[0].length; j++) {
      //만약 해당 좌표가 섬이 아니라 넓이를 가졌다면,
      if (newMaps[i][j] !== sea) {
        //answer에 dfs하여 넓이를 구한 값을 저장한다
        answer.push(dfs(i, j));
      }
    }
  }

  //answer 오름차순 정렬
  answer.sort((a, b) => a - b);

  //answer에 내용물이 있다면 asnwer를 반환하고, 아니면 [-1]
  return answer.length ? answer : [-1];
}
