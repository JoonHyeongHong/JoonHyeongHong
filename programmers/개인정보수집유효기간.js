/* 
고객의 약관 동의를 얻어서 수집된 1~n번으로 분류되는 개인정보 n개가 있습니다. 약관 종류는 여러 가지 있으며 각 약관마다 개인정보 보관 유효기간이 정해져 있습니다. 당신은 각 개인정보가 어떤 약관으로 수집됐는지 알고 있습니다. 수집된 개인정보는 유효기간 전까지만 보관 가능하며, 유효기간이 지났다면 반드시 파기해야 합니다.

예를 들어, A라는 약관의 유효기간이 12 달이고, 2021년 1월 5일에 수집된 개인정보가 A약관으로 수집되었다면 해당 개인정보는 2022년 1월 4일까지 보관 가능하며 2022년 1월 5일부터 파기해야 할 개인정보입니다.
당신은 오늘 날짜로 파기해야 할 개인정보 번호들을 구하려 합니다.

모든 달은 28일까지 있다고 가정합니다.
*/

function solution(today, terms, privacies) {
  // 유효기간이 지난 번호를 담을 배열 answer
  const answer = [];

  // 각 약관별로 유효기간을 저장한 객체 termsDict
  const termsDict = terms.reduce((acc, cur) => {
    let term = cur.split(" ");
    acc[term[0]] = +term[1];
    return acc;
  }, {});

  // 오늘 날짜를 각 연,달,일로 쪼개서 숫자화
  const [todayYears, todayMonths, todayDays] = today.split(".").map(Number);

  //한 달이 28일 고정이기 때문에 모든 단위를 일로 통합
  const todayToDays = todayYears * 12 * 28 + todayMonths * 28 + todayDays;

  //마찬가지로 각 약관별로 진행
  privacies.forEach((privacy, idx) => {
    //약관은 "날짜 약관"으로 구성되어있어 " "을 기준으로 나눔
    const [date, term] = privacy.split(" ");

    //마찬가지로 해당 날짜를 연,달,일로 나누고 단위를 일로 통합
    //그 과정에서 각 약관별 유효기간을 계산해준다
    const [years, months, days] = date.split(".").map(Number);
    const privacyToDays =
      years * 12 * 28 + (months + termsDict[term]) * 28 + days - 1;

    //단위가 일로 통합된 지금, 오늘보다 일 수가 적다면 유효기간이 지난 것이기 때문에 answer에 해당 약관의 번호(1번부터 시작)을 저장한다.
    if (todayToDays > privacyToDays) answer.push(idx + 1);
  });

  return answer;
}
