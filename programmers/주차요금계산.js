function solution(fees, records) {
  const [defaultTime, defaultPay, perTime, payPerTime] = fees;

  const parkingPlace = {};
  const lastTime = 23 * 60 + 59;
  records.forEach((value) => {
    const [time, carNumber, history] = value.split(" ");
    const splittedTime = time.split(":").map(Number);
    const timeToMinute = splittedTime[0] * 60 + splittedTime[1];
    if (history === "IN") {
      if (parkingPlace[carNumber]) {
        parkingPlace[carNumber].push([timeToMinute, lastTime]);
      } else {
        parkingPlace[carNumber] = [[timeToMinute, lastTime]];
      }
    } else if (history === "OUT") {
      parkingPlace[carNumber][parkingPlace[carNumber].length - 1][1] =
        timeToMinute;
    }
  });

  const totalPay = [];
  for (const [key, value] of Object.entries(parkingPlace)) {
    let totalTime = 0;
    value.forEach((inOut) => {
      const [In, Out] = inOut;
      totalTime += Out - In;
    });
    totalPay.push([
      Math.max(
        defaultPay +
          Math.ceil((totalTime - defaultTime) / perTime) * payPerTime,
        defaultPay
      ),
      key,
    ]);
  }

  return totalPay.sort((a, b) => a[1] - b[1]).map((el) => el[0]);
}
