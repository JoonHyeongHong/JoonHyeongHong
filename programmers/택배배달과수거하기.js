function solution(cap, n, deliveries, pickups) {
    deliveries.reverse();
    pickups.reverse();

    let deliveriesCount = 0;
    let pickupsCount = 0;
    let distance = 0;
    
    for(let i = 0 ; i < n; i++){
        deliveriesCount += deliveries[i];
        pickupsCount += pickups[i];
        
        while(deliveriesCount > 0 || pickupsCount > 0){
            deliveriesCount -= cap;
            pickupsCount -= cap;
            distance += (n-i) * 2;
        }
    
    }
    return distance;
}