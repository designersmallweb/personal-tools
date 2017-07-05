function clone1(o1,o2){
    for(var key in o2){
        if(typeof o2[key] == 'object'){
            o1[key] = {};
            clone(o1[key],o2[key])
        }else{
            o1[key] = o2[key];
        }
    }
}

function clone2(o){
    var temp = {};
    for(var key in o){
        if(typeof o[key] == 'object'){
            temp[key] = clone(o[key]);
        }else{
            temp[key] = o[key];
        }
    }
    return temp;
}