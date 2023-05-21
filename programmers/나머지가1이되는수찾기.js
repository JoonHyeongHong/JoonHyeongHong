/*
자연수 n이 매개변수로 주어집니다. n을 x로 나눈 나머지가 1이 되도록 하는 가장 작은 자연수 x를 return 하도록 solution 함수를 완성해주세요. 답이 항상 존재함은 증명될 수 있습니다.
*/


function solution(n) {

    //에라토스테네스의 체
    const sosu = new Array(n).fill(true).fill(false,0,2);
    for (let i = 2 ; i*i <=n; i++){
        if(sosu[i]){
            for(let j = i * i ; j <= n ; j+=i){
                sosu[j] = false;
            }
        }
    }
    
    // 만약 해당 수가 홀수면, 2가 제일 작은 수
    let x = 2;
    if(n % x === 1) return 2;
    else {

        //나머지가 1이 되는 가장 작은 수를 찾을 경우, 해당 수는 소수만 해당되므로
        //소수인지 여부를 확인후, 나눴을 떄 1이 되면 해당 수를 x에 넣고 반복문을 끝내면 된다.
        for(let i = 3 ; i < n ; i++){
            if(!sosu[i]) continue;
            if(n % i === 1) {
                x = i;
                break;
            }
        }
    }
    
    return x;
}