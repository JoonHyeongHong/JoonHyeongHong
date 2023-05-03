function solution(plans) {
  //끝낸 과제를 순서대로 나열하기 위한 배열 answer
  const answer = [];

  //시간 계산을 더 편하게 하기 위해 시간 * 60 + 분을 통해 시간단위를 분으로 통합함
  //그 뒤 시간 순으로 정렬
  const timeTable = plans
    .map((el) => {
      let [hh, mm] = el[1].split(":").map(Number);
      let time = hh * 60 + mm;
      return [el[0], time, Number(el[2])];
    })
    .sort((a, b) => a[1] - b[1]);

  //남은 과제를 저장해두기 위한 stack
  const stack = [];

  //각 계획 별로 반복
  timeTable.forEach((plan, idx) => {
    //이름, 과제 시작시간, 과제에 걸리는 시간
    let [name, startTime, playTime] = plan;

    //만약 다음 인덱스가 존재한다면, 즉 다음 과제 시작시간을 고려해야하는 경우
    if (timeTable.length !== idx + 1) {
      //다음 과제 시작시간
      let nextTime = timeTable[idx + 1][1];
      let finishTime = startTime + playTime;

      //만약 현재 과제를 끝마치지 못할 경우
      if (finishTime > nextTime) {
        //수행하던 과제의 남는 시간을 구하여, stack에 저장
        stack.push([name, finishTime - nextTime]);
      } else if (finishTime === nextTime) {
        //시간 안에 맞춰 과제를 끝맞친 경우, 과제를 해결하였으므로 answer에 저장 후 다음 과제를 수행하면 된다
        answer.push(name);
      } else {
        // 끝맞쳤음에도 시간이 남는 경우, 일단 과제를 해결하였으므로 answer에 저장
        answer.push(name);

        //이후 밀린 과제가 남아있다면,
        if (stack.length) {
          //시간이 허락하는 한 밀린 과제를 전부 수행할 수 있으므로, while문
          while (stack.length) {
            //과제 시작시간은, 방금 수행한 과제의 시작시간 + 수행 시간
            startTime = startTime + playTime;

            //그 뒤 밀린 과제와 해당 과제의 수행시간을 stack에서 꺼낸다.
            //끝나는 시간 계산
            [name, playTime] = stack.pop();
            finishTime = startTime + playTime;
            //마찬가지로 다음 과제까지 남은 시간동안 과제를 해결할 수 있는 지 없는지 조건문을 돌린다
            if (finishTime > nextTime) {
              //만약 남은 시간동안 풀지 못한 경우
              //남은 시간만큼을 stack에 저장하고, 순서대로 찾아오는 과제를 해결하기 위해 while문을 빠져나간다
              let timeRemaining = finishTime - nextTime;
              stack.push([name, timeRemaining]);
              break;
            } else if (playTime + startTime === nextTime) {
              //딱 알맞게 수행한 경우, stack에 넣지 않고 answer에 넣은 뒤 while문을 빠져나간다
              answer.push(name);
              break;
            } else {
              //해결하고도 시간이 남았으므로, answer에 넣은 뒤 다음 while문을 반복한다.
              answer.push(name);
            }
          }
        }
      }
    } else {
      //다음 과제 시간이 없는 경우, 여유를 가지고 해결할 수 있다
      answer.push(name);
    }
  });

  //만약 다음 과제까지 다 끝냈음에도, 여전히 stack이 남아있다면 stack에서 하나씩 꺼내 해결하면 된다.
  //이 때는 시간 계산을 할 필요가 없으므로, 순서대로 해결하면 된다.
  if (stack) {
    while (stack.length) {
      let [name, _] = stack.pop();
      answer.push(name);
    }
  }

  return answer;
}
