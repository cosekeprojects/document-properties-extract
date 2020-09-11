var documents = new Array();

var extra_properties = {};
var typesearchpath = "";
var aspectsearchpath = "";


var extra_properties_search_string ="";

for (var key in args) {

    if (key!="aspect" && key!="type") {
        extra_properties[key] = args[key]
    }

}

if (extra_properties.length!=0) {
    for (var key in extra_properties) {
        var value = extra_properties[key]
        var key_split = key.split(":")
        var query_term = " +@"+key_split[0]+"\\:"+key_split[1]+":\""+value+"\""
        extra_properties_search_string += query_term
    }
}

if(args.type!="undefined" && args.type!=null){
    typesearchpath = "PATH:\"/app:company_home//*\" +TYPE:\""+args.type+"\""+extra_properties_search_string
    documents = search.luceneSearch(typesearchpath);
}

if(args.aspect!="undefined" && args.aspect!=null){

    aspectsearchpath = "PATH:\"/app:company_home//*\" +ASPECT:\""+args.aspect+"\""+extra_properties_search_string
    documents = search.luceneSearch(aspectsearchpath,null,false,Number.MAX_SAFE_INTEGER);

}

//if (documents == null || documents .length == 0) {
    //status.code = 200;
    //status.message = "No documents found";
   // status.redirect = true;
//} else {

   var documentInfo= new Array();
   for (i = 0; i < documents.length; i++) {
        var docProperties= new doc(documents[i])
        documentInfo.push(docProperties);
    }
    model.whitepapers = documentInfo;
    model.aspectsearchpath  = aspectsearchpath;
    model.typesearchpath = typesearchpath;
//}

function doc(document){
 this.docProperties = new Array()
  for(key in document.properties){
        this.docProperties.push(new property_doc(key,document.properties[key]))
   }
}

function property_doc(key,value){
this.key = JSON.stringify(key)!="undefined"?JSON.stringify(key).replace(/\"/g," "):JSON.stringify(key)
this.value = (typeof JSON.stringify(value))=="undefined"?JSON.stringify(value):JSON.stringify(value).replace(/\"/g," ")
}