/*
정수로 이루어진 배열 numbers가 있습니다. 배열 의 각 원소들에 대해 자신보다 뒤에 있는 숫자 중에서 자신보다 크면서 가장 가까이 있는 수를 뒷 큰수라고 합니다.
정수 배열 numbers가 매개변수로 주어질 때, 모든 원소에 대한 뒷 큰수들을 차례로 담은 배열을 return 하도록 solution 함수를 완성해주세요. 단, 뒷 큰수가 존재하지 않는 원소는 -1을 담습니다.
*/

function solution(numbers) {
  const stack = [];

  //역순으로 하는 것이 더 쉽다고 생각
  return numbers
    .reverse()
    .map((number) => {
      //stack이 비어있다 = 맨 뒷 수
      if (!stack.length) {
        //stack에 담아주고 -1을 반환해준다. >> 현재 상태 [-1]
        stack.push(number);
        return -1;
      }

      //stack 역시 맨 위에서부터 시작
      for (let i = stack.length - 1; i >= 0; i--) {
        //해당 수가 stack[i]보다 작으면, 뒷 큰수가 된다
        if (number < stack[i]) {
          //따라서 일단 해당 수를 stack에 넣고, 뒷 큰수가 되어준 stack을 반환해준다. [-1,...,stack[i]];
          stack.push(number);
          return stack[i];
        } else {
          //여기가 제일 핵심인게
          //문제에서 뒤에 있는 큰 수의 핵심은 가장 가까운 것이 핵심이다.
          //[3,5,4] 이런 식으로 되어있다고 가정한다면,
          //사실 3의 다음 큰수는 4이기 때문에 stack을 전부 뒤져서라도 4를 찾게 되지만
          //가까운 큰 수이기만 하면 되서, 4보다 큰 5가 있는 이상, 그 다음의 수들은 필요가 없어지기 떄문에 버리면 된다
          stack.pop();
        }
      }

      //만약 모든 stack을 다 뒤져봤음에도, 큰 수가 없다면
      //해당 수가 앞에 있는 수들의 뒷 큰수가 되던, 아니던 현재 상황과 비슷할 것이다
      //그렇게 비어진 stack에 해당 수를 넣고, 뒷 큰수가 없으니 -1을 반환해준다
      stack.push(number);
      return -1;
    })
    .reverse();
}
