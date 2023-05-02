/* 사진들을 보며 추억에 젖어 있던 루는 사진별로 추억 점수를 매길려고 합니다. 
사진 속에 나오는 인물의 그리움 점수를 모두 합산한 값이 해당 사진의 추억 점수가 됩니다. 
예를 들어 사진 속 인물의 이름이 ["may", "kein", "kain"]이고 각 인물의 그리움 점수가 [5점, 10점, 1점]일 때 
해당 사진의 추억 점수는 16(5 + 10 + 1)점이 됩니다. 
다른 사진 속 인물의 이름이 ["kali", "mari", "don", "tony"]이고 
["kali", "mari", "don"]의 그리움 점수가 각각 [11점, 1점, 55점]]이고, 
"tony"는 그리움 점수가 없을 때, 
이 사진의 추억 점수는 3명의 그리움 점수를 합한 67(11 + 1 + 55)점입니다.

 그리워하는 사람의 이름을 담은 문자열 배열 name, 
 각 사람별 그리움 점수를 담은 정수 배열 yearning, 
 각 사진에 찍힌 인물의 이름을 담은 이차원 문자열 배열 photo가 매개변수로 주어질 때, 
 사진들의 추억 점수를 photo에 주어진 순서대로 배열에 담아 return하는 solution 함수를 완성해주세요.
*/
function solution(name, yearning, photo) {
  // 결과를 저장할 배열 result
  let result = [];

  // name 배열에 담긴 이름을 key로 가지고, yearning배열에 담긴 그리움 점수를 value로 가진 객체를 만듭니다.
  // 두 배열의 길이는 일치하기 때문에, 어느 배열의 length를 해도 상관없습니다.
  // 후에 있을 yearning 내 점수를 구할 떄 indexOf() 함수를 사용하는 걸 방지하기 위함 입니다.
  const dict = {};
  for (let i = 0; i < name.length; i++) {
    dict[name[i]] = yearning[i];
  }

  //사진 수 만큼 반복해줍니다.
  //사진 속에 그리움 점수을 합산하기 위한 변수 yearningScore을 선언합니다.
  //사진 속에 인물들 수 만큼 반복해줍니다.
  //만약 dict 내에 해당 이름을 key로 가진 값이 없다면, undefined가 나올 것입니다.
  for (let i = 0; i < photo.length; i++) {
    let yearningScore = 0;
    for (let j = 0; j < photo[i].length; j++) {
      let score = dict[photo[i][j]];
      console.log(score);
      if (score !== undefined) yearningScore += score;
    }
    result.push(yearningScore);
  }

  return result;
}
