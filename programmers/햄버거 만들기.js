/* 
햄버거 가게에서 일을 하는 상수는 햄버거를 포장하는 일을 합니다. 함께 일을 하는 다른 직원들이 햄버거에 들어갈 재료를 조리해 주면 조리된 순서대로 상수의 앞에 아래서부터 위로 쌓이게 되고, 상수는 순서에 맞게 쌓여서 완성된 햄버거를 따로 옮겨 포장을 하게 됩니다. 상수가 일하는 가게는 정해진 순서(아래서부터, 빵 – 야채 – 고기 - 빵)로 쌓인 햄버거만 포장을 합니다. 상수는 손이 굉장히 빠르기 때문에 상수가 포장하는 동안 속 재료가 추가적으로 들어오는 일은 없으며, 재료의 높이는 무시하여 재료가 높이 쌓여서 일이 힘들어지는 경우는 없습니다.

예를 들어, 상수의 앞에 쌓이는 재료의 순서가 [야채, 빵, 빵, 야채, 고기, 빵, 야채, 고기, 빵]일 때, 상수는 여섯 번째 재료가 쌓였을 때, 세 번째 재료부터 여섯 번째 재료를 이용하여 햄버거를 포장하고, 아홉 번째 재료가 쌓였을 때, 두 번째 재료와 일곱 번째 재료부터 아홉 번째 재료를 이용하여 햄버거를 포장합니다. 즉, 2개의 햄버거를 포장하게 됩니다.

상수에게 전해지는 재료의 정보를 나타내는 정수 배열 ingredient가 주어졌을 때, 상수가 포장하는 햄버거의 개수를 return 하도록 solution 함수를 완성하시오.
*/

/*
정규 표현식으로 해결해보려했지만 시간초과가 났다.
function solution(ingredient) {
    
    
    //결국 ingredient에 있는 재료의 순서대로 햄버거를 만들 수 있다.
    //빵 = 1 , 야채 = 2, 고기 = 3
    //즉 ingrediet를 문자열로 바꾼 뒤, 1231이라는 숫자를 없애는 것을 반복하면 된다

    let ingredientToString = ingredient.join("");
    
    while(ingredientToString.includes('1231')){
        ingredientToString = ingredientToString.replace('1231', '');
    }
    
    
    // 그렇게 ( 원래 재료의 수 - 남은 재료의 수 )를 4로 나누면 , 포장된 햄버거의 수를 구할 수 있다
    return Math.floor(( ingredient.length - ingredientToString.length ) / 4)
}*/

function solution(ingredient) {
  let cnt = 0;

  //햄버거용 스택
  const stack = [];

  for (let i of ingredient) {
    //스택에 해당 재료를 담는다
    stack.push(i);

    //그 뒤 stack의 뒤에서 4번째까지의 문자열이 1231이라면,
    //햄버거가 되기 때문에 뺴주고, 햄버거 포장 횟수를 1 증가시켜준다.
    if (stack.slice(-4).join("") === "1231") {
      stack.splice(-4);
      cnt++;
    }
  }

  //그렇게 늘어난 포장 횟수를 반환해준다.
  return cnt;
}
