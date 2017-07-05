function fixContains(a, b) {
    try {
        while ((b = b.parentNode)){
            if (b === a){
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}
//判断节点包含关系,方法名fixContains(aNode, bNode);