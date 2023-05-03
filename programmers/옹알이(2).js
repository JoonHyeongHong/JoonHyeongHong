/*
머쓱이는 태어난 지 11개월 된 조카를 돌보고 있습니다. 조카는 아직 "aya", "ye", "woo", "ma" 네 가지 발음과 네 가지 발음을 조합해서 만들 수 있는 발음밖에 하지 못하고 연속해서 같은 발음을 하는 것을 어려워합니다. 문자열 배열 babbling이 매개변수로 주어질 때, 머쓱이의 조카가 발음할 수 있는 단어의 개수를 return하도록 solution 함수를 완성해주세요.
*/

/*
정규표현식(실퍠)
function solution(babbling){
    //발음할 수 있는 단어의 개수를 저장할 변수 cnt;
    let cnt = 0;

    for (const babble of babbling){
        //정규표현식을 통해 제거해보려 했지만,
        const str = babble.replace(/aya|ye|woo|ma/, "");

        //연속되는 발음을 거를 수 없었다.
        if(str === "") {
            cnt++; 
        }
    }

    return cnt;
}
*/

function solution(babbling) {
  //발음할 수 있는 단어의 개수를 저장할 변수 cnt;
  let cnt = 0;

  //발음할 수 있는 네가지 발음을 객체화
  const dict = ["aya", "ye", "woo", "ma"].reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {});

  for (let babble of babbling) {
    let str = "";
    const stack = [];
    for (let key in dict) {
      dict[key] = true;
    }

    //각 원소별 문자마다 하나씩 stack에 집어넣는다.
    for (const word of babble) {
      stack.push(word);

      //이 때 stack의 길이가 네가지 발음중 최대길이인 3 이하라면,
      if (stack.length <= 3) {
        str = stack.slice(0, stack.length).join("");
        stack.splice(0, stack.length);

        //네가지 발음 중 하나이고, 해당 단어를 발음할 수 있다면(즉 true라면)
        if (dict[str]) {
          //연속해서 사용할 수 없도록 전부 true화 한 뒤, 해당 발음만 false로 바꿔줌
          Object.keys(dict).forEach((key) => {
            dict[key] = true;
          });
          dict[str] = false;
          //그 뒤 str 초기화
          str = "";
        } else {
          //해당 발음이 없다면 다시 스택에 집어넣는다
          stack.push(...str);
        }
        //길이를 초과하면 발음할 수 없는 것이기 떄문에 break 해준다
      } else break;
    }

    console.log(stack);
    //이랬을 떄 스택에 남은 단어가 없다는 것은, 전부 발음할 수 있다는 것이므로 cnt를 증가시켜준다.
    if (!stack.length) {
      cnt++;
    }
  }

  return cnt;
}
