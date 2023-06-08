const byte = 8;
const limit = 128;

const solution = (param0) => {
  let memory = "";
  //데이터 타입에 따라 매개변수가 달라진다
  const dataSize = {
    BOOL: () => assignData(1),
    SHORT: () => assignData(2),
    FLOAT: () => assignData(4),
    INT: () => assignData(8),
    LONG: () => {
      assignData(8);
      assignData(8);
    },
  };

  //메모리에 데이터 할당하는 내부함수
  const assignData = (dataSize) => {
    //데이터 패딩 작업
    while (memory.length % dataSize !== 0) {
      memory += ".";
    }

    //데이터 할당 작업
    for (let i = 0; i < dataSize; i++) {
      memory += "#";
    }
  };

  //실제 실행되는 메인 함수
  const main = () => {
    //param0에 담긴 데이터 타입에 따라 할당
    for (const data of param0) {
      dataSize[data]();
    }

    //만약 메모리의 일부가 비면 "."으로 채워준다
    while (memory.length % byte !== 0) {
      memory += ".";
    }

    //만약 메모리 크기가 한계를 넘어서면 HALT 반환
    if (memory.length > limit) return "HALT";
    //byte 단위로 쪼갠 뒤 ","를 붙여서 문자열로 만들어 반환
    const regex = new RegExp(`[#|.]{1,${byte}}`, "g");
    return memory.match(regex).join(",");
  };

  return main();
};

console.log(solution(["INT", "INT", "BOOL", "SHORT", "LONG"]));
console.log(solution(["INT", "SHORT", "FLOAT", "INT", "BOOL"]));
console.log(solution(["FLOAT", "SHORT", "BOOL", "BOOL", "BOOL", "INT"]));
console.log(
  solution([
    "BOOL",
    "LONG",
    "SHORT",
    "LONG",
    "BOOL",
    "LONG",
    "BOOL",
    "LONG",
    "SHORT",
    "LONG",
    "LONG",
  ])
);

console.log(solution(["BOOL", "BOOL", "SHORT", "SHORT"]));
