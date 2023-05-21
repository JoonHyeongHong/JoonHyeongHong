/*
두 정수 X, Y의 임의의 자리에서 공통으로 나타나는 정수 k(0 ≤ k ≤ 9)들을 이용하여 만들 수 있는 가장 큰 정수를 두 수의 짝꿍이라 합니다(단, 공통으로 나타나는 정수 중 서로 짝지을 수 있는 숫자만 사용합니다). X, Y의 짝꿍이 존재하지 않으면, 짝꿍은 -1입니다. X, Y의 짝꿍이 0으로만 구성되어 있다면, 짝꿍은 0입니다.

예를 들어, X = 3403이고 Y = 13203이라면, X와 Y의 짝꿍은 X와 Y에서 공통으로 나타나는 3, 0, 3으로 만들 수 있는 가장 큰 정수인 330입니다. 다른 예시로 X = 5525이고 Y = 1255이면 X와 Y의 짝꿍은 X와 Y에서 공통으로 나타나는 2, 5, 5로 만들 수 있는 가장 큰 정수인 552입니다(X에는 5가 3개, Y에는 5가 2개 나타나므로 남는 5 한 개는 짝 지을 수 없습니다.)
두 정수 X, Y가 주어졌을 때, X, Y의 짝꿍을 return하는 solution 함수를 완성해주세요.
*/

function solution(X,Y){

    //배열이 아닌 문자열로 저장해야합니다
    let answer = ""

    //각 문자열이 가진 숫자들을 세기 위해 만든 배열
    const xArr = new Array(10).fill(0);
    const yArr = new Array(10).fill(0);
    
    //각 문자열을 하나씩 반복해서 xArr, yArr에 해당 수 (만약 1이면 1번 index)에 수를 1 증가
    X.split('').forEach(el=> xArr[el]++);
    Y.split('').forEach(el=> yArr[el]++);
    
    // 그 뒤 xArr을 반복해서(yArr을 해도 상관은 없다)
    xArr.forEach((x,idx)=>{
        //0부터 시작, x는 해당 수가 X에서 몇 번 있었는지, idx는 해당 수이다.

        //만약 xArr[idx]와 yArr[idx] 두 배열의 idx번이 0이 아니라면
        if(x && yArr[idx]){
            //둘 중 작은 수만큼 반복해서 answer에 넣어준다
            answer += String(idx).repeat(Math.min(x,yArr[idx]));
        }
    });
    
    //만약 answer가 여전히 빈칸이면 return -1
    if(answer === "") return '-1';
    //'0'이거나 '00'이거나 그 이상이더라도 Number로 바꾸면 0이 된다
    if(+answer === 0) return '0';
    // 그렇게 만들어진 answer라는 문자열을 배열로 만들고, 뒤집고 다시 문자열로 만들면 완성
    return [...answer].reverse().join('');
}