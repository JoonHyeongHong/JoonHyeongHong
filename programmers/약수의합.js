//정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

function solution(n) {
    // 정수 n의 약수를 저장해둘 배열
    const answer = []

    //약수를 구할 때는 약수의 제곱근부터 시작해서, 1로 내려가는 것이 효과적이라고 한다.
    for(let i=Math.floor(Math.sqrt(n));i>=1;i--){
        //만약 약수라면
        if(n % i === 0){
            //이 때 제곱근이면 i만을, 그게 아니라면 i와 n/i를 answer에 넣어준다.
            if(n / i === i) answer.push(i);
            else answer.push(i,n/i);
        }
    }

    //reduce를 이용해 배열의 합을 구했다.
    return answer.reduce((acc,cur)=>{acc+=cur; return acc},0);
}