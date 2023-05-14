/*
주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다. 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.
*/

//에라토스테네스의 체를 미리 선언해둠
let limit = 1000 * 3;

let sosu = new Array(limit + 1).fill(true).fill(false, 0, 2);
for (let i = 2; i * i <= limit; i++) {
  if (sosu[i]) {
    for (let j = i * i; j <= limit; j += i) {
      sosu[j] = false;
    }
  }
}

function solution(nums) {
  //소수가 되는 경우 세는 변수 cnt
  let cnt = 0;

  //각 nums의 원소는 1000을 넘지 않고, 총 3개의 수를 더해야하기 때문에 3000까지이다.

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        let number = nums[i] + nums[j] + nums[k];
        if (sosu[number]) cnt++;
      }
    }
  }

  return cnt;
}

/*
두번 풀었다
//소수 확인 함수
function checkPrime(number) {

    //짝수는 무조건 소수가 아니므로 3에서 2씩 더해 홀수만으로 나눠 나머지가 0인지 계속 확인한다
    for (let i = 3; i <= Math.sqrt(number); i+=2) {
        if (number % i === 0) return false;
    }

    //한번이라도 나누어떨어지면 false 아니면 소수이다
    return true;
}

function solution(nums) {
    //소수가 되는 경우 세는 변수 cnt
    let cnt = 0;
    
    for(let i = 0 ; i < nums.length - 2; i++){
        for(let j = i + 1 ; j < nums.length - 1 ; j++){
            for(let k = j + 1 ; k < nums.length ; k++){

                //세 수를 더한 값
                let target = nums[i] + nums[j] + nums[k];

                //target이 홀수고, 소수인지 여부를 확인함
                if(target % 2 !== 0 && checkPrime(target)) {
                    cnt++;
                }
            }
        }
    }
    
    
    
    return cnt;
}


*/
