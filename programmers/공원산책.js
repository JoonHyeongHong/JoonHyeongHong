function solution(park, routes) {
  //좌표별 방향 설정을 위한 객체입니다.
  const directions = { E: [0, 1], W: [0, -1], S: [1, 0], N: [-1, 0] };

  //처음 좌표는 0,0 입니다.
  let [x, y] = [0, 0];

  //park의 세로 길이만큼 반복합니다. 이 때 문자열(가로) 내에 "S"가 존재하면, 해당 위치를 시작지점으로 합니다.
  for (let i = 0; i < park.length; i++) {
    if (park[i].includes("S")) {
      [x, y] = [i, park[i].indexOf("S")];
      break;
    }
  }

  //명령 별로 반복합니다.
  //명령은 "방향 칸수"로 구성되기 때문에, split(" ") 함수로 나눠줍니다.
  //그 뒤, 현재 위치를 기준으로 이동하기 위해 [nx,ny] = [x,y]를 해줍니다.
  //이동한 횟수를 세기 위한 cnt 변수를 선언해줍니다.

  //cnt가 칸수만큼 전진하지 않았다면 계속 반복합니다.
  //현재 위치 = [현재 x좌표 + 해당 방향일 때 이동] + [현재 y좌표 + 해당 방향일 때 이동] 입니다.
  // 이 때 만약 지도 밖으로 나가게 되어 park[nx] 와 park[nx][ny]가 undefined가 되는 경우 break를 해줍니다.
  // 마찬가지로 전진한 위치인 park[nx][ny] = "X", 즉 장애물이 있다면 전진핳 수 없으니 break를 해줍니다.
  // 그렇지 않다면 이동한 횟수를 세기 위한 변수인 cnt의 값을 1 증가시켜줍니다.

  //그렇게 전부 전진하여 cnt와 n의 값이 같아진다면, 현재 위치를 이동한 위치로 바꿔줍니다.
  //여기서 n은 현재 문자열이기 때문에 +n으로 해줍니다.
  for (let route of routes) {
    const [op, n] = route.split(" ");
    let [nx, ny] = [x, y];
    let cnt = 0;
    while (cnt < n) {
      [nx, ny] = [nx + directions[op][0], ny + directions[op][1]];
      if (!park[nx] || !park[nx][ny] || park[nx][ny] === "X") break;
      cnt++;
    }
    if (cnt === +n) [x, y] = [nx, ny];
  }
  return [x, y];
}
