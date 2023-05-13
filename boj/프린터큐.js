const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .split("\n");

for (let i = 0; i < input[0]; i++) {
  let [_, index] = input[i * 2 + 1].split(" ");
  const print = input[i * 2 + 2].split(" ");

  //우선순위용 배열
  const priorityArr = [...print].sort((a, b) => b - a);

  //print에는 index를 기록해둔다
  print.forEach((el, idx) => (print[idx] = [el, idx]));

  //프린터를 큐처럼 사용하기 위한 index요소
  let printIndex = 0;

  //우선순위 처리를 위한 index요소
  let priorityIndex = 0;

  //스스로 빠져나올 때까지 무한 반복
  while (true) {
    //일단 프린터의 printindex 위치에 문서를 뽑아 [우선순위와, 처음위치]를 저장한다.
    let [priority, idx] = print[printIndex];

    //만약 우선도가 정렬해둔 priorityArr의 현재 우선처리해야할 문서라면
    if (priority == priorityArr[priorityIndex]) {
      //처리했다치고, 다음 걸로 넘어간다
      priorityIndex++;
      //만약 처리된 문서의 처음위치가 지정한 문서의 인덱스와 일치한다면
      if (idx == index) {
        //해당 문서의 우선순위(priorityIndex)번째임을 알리고 while문을 빠져나온다
        console.log(priorityIndex);
        break;
      }
    } else {
      //만약 우선순위가 다르다면, 나중에 처리해야할 문서이므로 print 맨 뒤로 같은 내용을 보낸다
      //shift, push를 이용해도 괜찮지만 이편이 메모리는 조금 더 소모할 지언정, 처리속도는 더 빠를거라고 생각한다.
      print.push([priority, idx]);
    }

    //그뒤 다음 문서로 넘어간다
    printIndex++;
  }
}
