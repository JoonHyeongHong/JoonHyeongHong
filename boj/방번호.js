/*
다솜이는 은진이의 옆집에 새로 이사왔다. 다솜이는 자기 방 번호를 예쁜 플라스틱 숫자로 문에 붙이려고 한다.

다솜이의 옆집에서는 플라스틱 숫자를 한 세트로 판다. 한 세트에는 0번부터 9번까지 숫자가 하나씩 들어있다. 다솜이의 방 번호가 주어졌을 때, 필요한 세트의 개수의 최솟값을 출력하시오. (6은 9를 뒤집어서 이용할 수 있고, 9는 6을 뒤집어서 이용할 수 있다.)
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const roomNumber = input[0].split("").map(Number);
let plasticSetCnt = 1;
const plasticNumber = Array.from({ length: 10 }, (_, idx) => 1);
while (roomNumber.length) {
  const pop = roomNumber.pop();
  if (plasticNumber[pop] > 0) {
    plasticNumber[pop]--;
    continue;
  }

  if (pop === 6 && plasticNumber[9] > 0) {
    plasticNumber[9]--;
    continue;
  } else if (pop === 9 && plasticNumber[6] > 0) {
    plasticNumber[6]--;
    continue;
  }

  if (plasticNumber[pop] === 0) {
    plasticSetCnt++;
    plasticNumber.forEach((_, idx) => (plasticNumber[idx] += 1));
    plasticNumber[pop]--;
  }
}

console.log(plasticSetCnt);
