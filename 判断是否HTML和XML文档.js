var isXML = function(doc) {
    return doc.createElement("p").nodeName !== doc.createElement("P").nodeName;
};
//是否是XML文档，方法名isXML();
/*var isHTML = function(doc) {
    return doc.createElement("p").nodeName === doc.createElement("P").nodeName;
};*/
//是否是HTML文档，方法名isHTML();