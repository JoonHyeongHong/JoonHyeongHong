function solution(users, emoticons) {
  let answer = [0, 0];

  // 1.플러스 서비스 가입자 늘리기.
  // 2.판매액 늘리기.
  // n명에게 m개를 할인판매.
  //사용자들은 일정비율 이상할인 이모티콘 모두 구매
  //구매비용의 합이 일정 가격 이상이 되다면, 이모티콘 구매 대신 플러스 서비스 가입

  //1.사용자수 만큼 반복
  //2.이모티콘 수 * 할인율만큼 반복
  //3.백트랙킹 이용

  const discount = [40, 30, 20, 10];
  const emoticonDiscount = new Array(emoticons.length).fill(0);

  const getPlusUsersandSell = (emoticonDiscount) => {
    let serviceUsers = 0;
    let sell = 0;
    users.forEach((user) => {
      let totalPrice = 0;
      emoticons.forEach((emoticon, idx) => {
        if (user[0] <= discount[emoticonDiscount[idx]]) {
          totalPrice +=
            (emoticon * (100 - discount[emoticonDiscount[idx]])) / 100;
        }
      });
      if (user[1] <= totalPrice) {
        serviceUsers++;
      } else {
        sell += totalPrice;
      }
    });
    return [serviceUsers, sell];
  };
  const getAnswer = (index, emoticonDiscount) => {
    if (index === emoticons.length) {
      let [plusServiceUsers, sell] = getPlusUsersandSell(emoticonDiscount);

      if (plusServiceUsers > answer[0]) {
        answer[0] = plusServiceUsers;
        answer[1] = sell;
      } else if (plusServiceUsers === answer[0]) {
        answer[1] = Math.max(sell, answer[1]);
      }

      return 0;
    }

    for (let i = 0; i < discount.length; i++) {
      const newEmoticonDiscount = [...emoticonDiscount];
      newEmoticonDiscount[index] = i;
      getAnswer(index + 1, newEmoticonDiscount);
    }
  };

  getAnswer(0, emoticonDiscount);

  return answer;
}
