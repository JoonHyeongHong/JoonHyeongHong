/*
호텔을 운영 중인 코니는 최소한의 객실만을 사용하여 예약 손님들을 받으려고 합니다. 한 번 사용한 객실은 퇴실 시간을 기준으로 10분간 청소를 하고 다음 손님들이 사용할 수 있습니다.
예약 시각이 문자열 형태로 담긴 2차원 배열 book_time이 매개변수로 주어질 때, 코니에게 필요한 최소 객실의 수를 return 하는 solution 함수를 완성해주세요.
*/

function solution(book_time) {
  //방의 상태를 표현한 배열
  const room = [];

  //문자열인 원소를 ( 시간 * 24 + 분 ) 을 통해 단위를 분으로 통합시킨 이차원 배열을 만듬.
  const timeTable = book_time
    .map((book) => {
      const time = book.map((time) => {
        let [hh, mm] = time.split(":").map(Number);
        return hh * 60 + mm;
      });
      return time;
    })
    .sort((a, b) => a[0] - b[0]);
  //이후 시작시간이 제일 빠른 쪽으로 정렬

  for (const time of timeTable) {
    //사용할 수 있는 방이 있는 지 여부를 알기 위한 변수 isBooked
    let isBooked = false;

    // 대실 시작 시간, 대실 종료 시간
    let [startTime, endTime] = time;

    // 방을 순서대로 확인해서, 대실이 종료되고 청소까지 끝난 방이 있는 지를 확인한다
    for (let i = 0; i < room.length; i++) {
      //만약 대실 시작 시간보다 일찍 끝났다면, 해당 방을 예약한다.
      if (room[i] <= startTime) {
        room[i] = endTime + 10;
        isBooked = true;
        break;
      }
    }

    //만약 사용할 수 있는 방이 없으면, 새로운 방을 추가해준다
    if (!isBooked) room.push(endTime + 10);

    //이후 다시 시작시간별로 정렬
    room.sort((a, b) => a - b);
  }

  return room.length;
}

/*
chatGPT가 최적화해준 코드
특정 부분을 함수화 했다.

for...of 문보다는 for 문을 사용하는 것이 더 효율적입니다.
let 보다는 const를 사용하는 것이 좋습니다.
timeTable을 생성하는 부분을 함수로 분리하면 코드를 더 깔끔하게 만들 수 있습니다.

function convertTimeToMinutes(time) {
  let [hh, mm] = time.split(':').map(Number);
  return hh * 60 + mm;
}

function createTimeTable(book_time) {
  return book_time.map(book => book.map(convertTimeToMinutes))
                  .sort((a, b) => a[0] - b[0]);
}

function solution(book_time) {
  const room = [];
  const timeTable = createTimeTable(book_time);

  for (let i = 0; i < timeTable.length; i++) {
    const [startTime, endTime] = timeTable[i];
    let isBooked = false;

    for (let j = 0; j < room.length; j++) {
      if (room[j] + 10 <= startTime) {
        room[j] = endTime;
        isBooked = true;
        break;
      }
    }

    if (!isBooked) {
      room.push(endTime);
    }

    room.sort((a, b) => a - b);
  }

  return room.length;
}

*/
