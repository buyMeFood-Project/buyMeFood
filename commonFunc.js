// 맛집 검색결과 데이터 리스트 리턴
export function searchStore(keyword, storeList) {
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

// 선택한 맛집의 상세정보 리턴
export function getStoreInfo(storeName, storeList){
    let start = 0, end = storeList.length-1;
    while(start <= end){
        let lStore = storeList[start];
        let rStore = storeList[end];
        if(lStore.storeName === storeName){
            return lStore;
        }
        else if(rStore.storeName === storeName){
            return rStore;
        }
        start++;
        end--;
    }
    return null;
}

// 유저정보 중복체크 기능
export function isUserInfoExist(targetType, targetInfo, userList){
    var start = 0, end = userList.length-1;    
    while(start <= end){
        var lUser = userList[start];
        var rUser = userList[end];

        switch(targetType){
            case "userName":
                if(lUser.username ===  targetInfo || rUser.username === targetInfo){
                    return false;
                }
            case "userId":
                if(lUser.userid === targetInfo || rUser.userid === targetInfo){
                    return false;
                }
        }
        start++;
        end--;
    }
    return true;
}

// 유저정보 일치 여부 확인기능
export function isUserInfoMatch(targetType, targetInfo, userList){
    var start = 0, end = userList.length-1;    
    while(start <= end){
        var lUser = userList[start];
        var rUser = userList[end];
        switch(targetType){
            case "userId":
                if(lUser.userid === targetInfo || rUser.userid === targetInfo){
                    return true;
                }
            case "userPw":
                if(lUser.password === targetInfo || rUser.password === targetInfo){
                    return true;
                }
        }
        start++;
        end--;
    }
    return false;
}

// 현재 로그인한 계정의 정보 리턴
export function getCurrUserInfo(username, userList){
    var start = 0, end = userList.length-1;    
    while(start <= end){
        var lUser = userList[start];
        var rUser = userList[end];
        if(lUser.username === username){
            return lUser;
        }
        else if(rUser.username === username){
            return rUser;
        }
        start++;
        end--;
    }
    return null;
}

// 게시글을 구별하기 위한 고유 토큰 생성
export function generateToken(length) {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

// 게시글 토큰을 활용해 게시글 리턴
export function returnPost(postToken, postList){
    var start = 0, end = postList.length-1;    
    while(start <= end){
        var lPost = postList[start];
        var rPost = postList[end];
        if(lPost.postToken === postToken){
            return lPost;
        }
        else if(rPost.postToken === postToken){
            return rPost;
        }
        start++;
        end--;
    }
    return null;
}

// 마지막 방문시간과 현재 방문 시간 비교하여 1분 초과 시 자동로그아웃
$(window).on('load', function(){
    if(localStorage.getItem('lastVisit') && localStorage.getItem('currUser')){
        var lastVisit = parseInt(localStorage.getItem('lastVisit'), 10);
        var currVisit = parseInt(new Date().getTime());
        if((currVisit - lastVisit) / (1000 * 60) >= 5){
            localStorage.removeItem('lastVisit');
            localStorage.removeItem('currUser');
        }
    }
});

//로그인 상태에서 브라우저 종료 시 방문시간 기록
$(window).on('unload', function() {
    if(localStorage.getItem('currUser')){
        localStorage.setItem('lastVisit', new Date().getTime());
    }
});
