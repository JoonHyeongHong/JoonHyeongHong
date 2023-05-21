/*
신입사원 무지는 게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템을 개발하려 합니다. 무지가 개발하려는 시스템은 다음과 같습니다.

각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.
유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.
다음은 전체 유저 목록이 ["muzi", "frodo", "apeach", "neo"]이고, k = 2(즉, 2번 이상 신고당하면 이용 정지)인 경우의 예시입니다.
*/

function solution(id_list, report, k) {

    // idList[id]= [신고자 명단,메일 받은 횟수]
    const idList = id_list.reduce((acc,cur)=>{
        acc[cur] = [[],0];
        return acc;
    },{})
    
   
    // 신고만큼 반복
    for(const singo of report){

        //신고 보낸사람, 받는 사람 구분
        let [send,receive] = singo.split(" ");

        //만약 신고받는 사람의 idList에 신고자명단에 신고 보낸 사람이 명단에 없다면 추가
        if(!idList[receive][0].includes(send)) {
            idList[receive][0].push(send); 
        }   
    }
    
    //아이디마다 반복
    for(const id of id_list){
        //만약 해당 아이디의 신고자 명단의 길이가 k 이상 일 때 (즉 게시판 이용 정지 시)
        if(idList[id][0].length >= k){

            //신고자 명단에 있는 id에 메일을 보냄으로, 메일 받은 횟수를 증가시켜준다
            for(const singoja of idList[id][0]){
                idList[singoja][1]++;
            }
        }
    }
    
    //이후 idList의 values 값의 배열 [[신고자 명단,메일 받은 횟수],...]을 map을 통해 메일 받은 횟수만 남김
    return Object.values(idList).map(el=>el[1]);
}