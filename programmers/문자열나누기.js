/* 문자열 s가 입력되었을 때 다음 규칙을 따라서 이 문자열을 여러 문자열로 분해하려고 합니다.

먼저 첫 글자를 읽습니다. 이 글자를 x라고 합시다.
이제 이 문자열을 왼쪽에서 오른쪽으로 읽어나가면서, x와 x가 아닌 다른 글자들이 나온 횟수를 각각 셉니다. 처음으로 두 횟수가 같아지는 순간 멈추고, 지금까지 읽은 문자열을 분리합니다.
s에서 분리한 문자열을 빼고 남은 부분에 대해서 이 과정을 반복합니다. 남은 부분이 없다면 종료합니다.
만약 두 횟수가 다른 상태에서 더 이상 읽을 글자가 없다면, 역시 지금까지 읽은 문자열을 분리하고, 종료합니다.
문자열 s가 매개변수로 주어질 때, 위 과정과 같이 문자열들로 분해하고, 분해한 문자열의 개수를 return 하는 함수 solution을 완성하세요.*/

function solution(s) {
  // 분해한 문자열을 담을 배열 answer 입니다.
  const answer = [];

  //첫 글자를 읽습니다. 이 글자를 x라고 합니다.
  let x = s[0];

  // 왼쪽에서 오른쪽으로 읽어가면서, x가 나올 횟수, x가 아닌 다른 글자가 나올 횟수를 저장할 변수 xCount와 diffCount를 선언합니다.
  // 그리고 분리한 문자열이 시작할 위치를 알기 위해 position 변수 또한 선언해줍니다.
  let xCount, diffCount, position;

  //각각 0을 집어넣어줍니다.
  xCount = diffCount = position = 0;

  //s의 원소별로 해당 코드블록을 적용시킵니다
  for (let i = 0; i < s.length; i++) {
    //만약 해당 원소가 x와 같은 지 비교해서 맞으면 xCount를, 아니면 diffCount를 1회 증가시킵니다.
    //이 때 대소문자 구분을 없애기 위해 toLowerCase()를 적용시킵니다.
    if (s[i].toLowerCase() === x.toLowerCase()) {
      xCount++;
    } else {
      diffCount++;
    }
    //그렇게 횟수를 증가시킨 뒤, 처음으로 두 횟수가 같아지는 순간
    if (xCount === diffCount) {
      //지금까지 읽은 문자열을 분리시킵니다.
      //처음 position은 0이기 떄문에, 0에서부터 두 횟수를 더한 값(=분리한 문자열의 길이)만큼 substring을 통해 나눠서 part 변수에 저장합니다.
      //그렇게 분리된 문자열을 result에 넣어줍니다.
      const part = s.substring(position, position + xCount + diffCount);
      answer.push(part);

      //그리고 position은 해당 문자열의 길이만큼 이동해줍니다.
      position += xCount + diffCount;

      //그렇게 분리한 후, 다시 첫 글자를 읽습니다.
      x = s[i + 1];
      xCount = diffCount = 0;
    }
  }
  //그렇게 마지막까지 문자열을 분리해낸 뒤에도, 횟수가 달라(=즉 분리된 후 나머지들이 존재)한다면
  //해당 부분들까지 분리해서, result에 넣어줍니다.
  if (xCount !== diffCount) {
    const part = s.substring(position);
    answer.push(part);
  }

  //그 뒤 분리된 문자열이 담긴 배열의 길이(=즉 문자열의 개수)를 반환해줍니다.
  return answer.length;
}

/*
조금 더 간략한 코드 버전
이 버전에서는 굳이 분리한 문자열을 저장하지 않습니다.
function solution(s) {

    // 분해한 문자열의 개수를 return할 answer 입니다.
    let answer = 0

    //첫 글자를 읽습니다. 이 글자를 x라고 합니다.
    let x = s[0]

    // 왼쪽에서 오른쪽으로 읽어가면서, x가 나올 횟수, x가 아닌 다른 글자가 나올 횟수를 저장할 변수 xCount와 diffCount를 선언합니다.
    let xCount, diffCount;

    //각각 0을 집어넣어줍니다.
    xCount = diffCount = 0;

    //s의 원소별로 해당 코드블록을 적용시킵니다
    for (let i = 0; i < s.length; i++) {
        //만약 해당 원소가 x와 같은 지 비교해서 맞으면 xCount를, 아니면 diffCount를 1회 증가시킵니다.
        //이 때 대소문자 구분을 없애기 위해 toLowerCase()를 적용시킵니다.
        if (s[i].toLowerCase() === x.toLowerCase()) {
            xCount++;
        } else {
            diffCount++;
        }
        
        //그렇게 횟수를 증가시킨 뒤, 처음으로 두 횟수가 같아지는 순간
        //answer의 값을 1 증가시키고, x의 값을 다음 문자로 옮깁니다.
        //그 뒤 x와 같거나 달랐던 횟수를 초기화 해줍니다.
        if (xCount === diffCount) {
            answer++;
            x = s[i + 1]
            xCount = diffCount = 0
        }
    }
    //그렇게 마지막까지 진행했음에도 불구하고, 두 횟수의 값이 일치하지 않는다면
    //분리할 문자열이 남아있는 것이기 때문에 개수를 1 증가시켜줍니다.
    if (xCount !== diffCount) {
        answer++;
    }

    //그 뒤 answer를 반환해줍니다.
    return answer;
}*/
