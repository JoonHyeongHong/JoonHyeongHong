/*
행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다. 
2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, solution을 완성해주세요.
*/


/*
정석적인 방법
function solution(arr1, arr2) {
    
    //더해진 행렬의 값을 저장할 배열 answer
    const answer = [];
    
    //행의 길이만큼 반복
    for(let i = 0 ; i < arr1.length; i++){

        //열을 저장할 배열 row
        const row = [];

        //열의 길이만큼 반복
        for(let j = 0 ; j < arr1[0].length; j++){
            //해당 위치의 값끼리 더한 뒤 row에 저장
            row.push(arr1[i][j] + arr2[i][j]);
        }
        //이후 해당 열을 answer에 저장
        answer.push(row);
    }
    
    return answer;
}
*/


//map을 사용해서 간략화
function solution(arr1, arr2) {
    return arr1.map((row,idx1)=> row.map((el,idx2)=>el+arr2[idx1][idx2]));

    /*
        ex) [[1,2],[2,3]] , [[3,4],[5,6]] 일 경우
        map을 통해 [1,2] 와 [2,3]으로 구분
        다시 [1,2].map을 함으로 써 1,2 로 구분
        1 + 해당 원소와 같은 위치에 있는 arr2의 원소를 더해준다
        이걸 2에도 적용하면, [1,2].map 은 [1+3,2+4]의 값을 반환할 것이고
        다른 row에도 적용하면, [2,3].map은 [2+5,3+6]의 값을 반환할 것이다
        그렇게 되면 arr1.map()은 결국 [[1+3,2+4],[2+5,3+6]]인 [[4,6],[7,9]]를 반환할 것이다.
    */
}