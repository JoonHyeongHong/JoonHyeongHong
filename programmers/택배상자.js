function solution(order) {
  var answer = 0;

  const stack = [1];
  let count = 0;

  //트럭입니다.
  let box = 2;
  for (const truck of order) {
    if (box !== truck) {
      while (stack[stack.length - 1] !== truck) {
        stack.push(box++);
        if (box > order.length) break;
      }
    }
    if (box === truck) {
      count++;
      box++;
    } else if (stack[stack.length - 1] === truck) {
      stack.pop();
      count++;
    }
  }

  return count;
}
