/*

수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

*/

function solution(answers) {

    //수포자들이 서로 문제를 찍는 순서를 저장한 배열
    const personWhoGiveUpMath = [[1,2,3,4,5],[2,1,2,3,2,4,2,5],[3,3,1,1,2,2,4,4,5,5]]
    
    //[수포자들의 번호, 수포자들이 정답을 맞힌 횟수]를 저장한 배열
    const score = [[1,0],[2,0],[3,0]]
    
    //문제의 길이만큼, 정답과 찍은 답을 비교해야하므로 answers의 길이만큼 반복
    for(let i = 0 ; i < answers.length ; i++){
        const answer = answers[i];

        //매 정답마다 수포자들은 3명이므로 3번 반복한다.
        for(let j = 0 ; j < personWhoGiveUpMath.length ; j++){

            //채점전 답 = (현재 문제의 번호 % 찍는 순서의 길이)마다 (j+1)번째 수포자의 찍는 답
            const answerBeforeScoring = personWhoGiveUpMath[j][i % (personWhoGiveUpMath[j].length)]

            //답을 비교해서 맞았다면, 해당 수포자의 점수를 올린다
            if(answer === answerBeforeScoring){
                score[j][1]++;
            }
        }
    }
    
    //이후 필터를 이용해 score의 각 원소의 [1]번째 인덱스의 값(=점수) 중 최대값을 구해서, 해당 값이 최대값인 경우에만 남긴 뒤
    //다시 map을 이용해 해당 배열의 어떤 수포자가 있는지 반환해준디.
    return score.filter((el)=> el[1] === Math.max(...score.map(el=>el[1]))).map(el=>el[0]);
}