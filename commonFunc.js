export function searchFunction(keyword) {
    let storeList = JSON.parse(localStorage.getItem('storeData'));
    let addedStore = []
    let displayList = []
    let start = 0, end = storeList.length-1;
    while(start <= end){
        let lStore = storeList[start];
        let rStore = storeList[end];

        if(!addedStore.includes(lStore.storeName)){
            if(lStore.menu.includes(keyword) || lStore.storeName.includes(keyword)){
                displayList.push(lStore);
                addedStore.push(lStore.storeName);
            }
        }
        if(!addedStore.includes(rStore.storeName)){
            if(rStore.menu.includes(keyword) || rStore.storeName.includes(keyword)){
                displayList.push(rStore);
                addedStore.push(rStore.storeName);
            }
        }
        start++;
        end--;
    }
    return displayList;
}