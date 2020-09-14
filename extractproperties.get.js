var documents = new Array();
var LIMIT_ALLOWED = 2147483647;
var extra_properties = {};
var typesearchpath = "";
var aspectsearchpath = "";
var title = "";


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
    title = args.type;
    typesearchpath = "PATH:\"/app:company_home//*\" +TYPE:\""+args.type+"\""+extra_properties_search_string
    documents = search.luceneSearch(typesearchpath,"*",false,LIMIT_ALLOWED );
}

if(args.aspect!="undefined" && args.aspect!=null){
   title = args.aspect;
    aspectsearchpath = "PATH:\"/app:company_home//*\" +ASPECT:\""+args.aspect+"\""+extra_properties_search_string
    documents = search.luceneSearch(aspectsearchpath,"*",false,LIMIT_ALLOWED);

}

var documentInfo= new Array();
var document_keys = new Array()
var document_length = documents.length;
for (i = 0; i < document_length; i++) {
    var docProperties= new doc(documents[i])
    documentInfo.push(docProperties);
}

model.documentkeys = document_keys.map(getKeyObject)
model.whitepapers = documentInfo;
model.aspectsearchpath  = aspectsearchpath;
model.typesearchpath = typesearchpath;
model.size = document_length
model.title = title
function doc(document){
 this.docProperties = new Array()
  for(key in document.properties){
        this.docProperties.push(new property_doc(key,document.properties[key]))
   }
}

function getKeyObject(key){
    return new key_object(key)
}



function property_doc(key,value){
    // this.mapped = {}
    this.key = JSON.stringify(key)!="undefined"?JSON.stringify(key).replace(/\"/g," "):JSON.stringify(key)
  this.value = (typeof JSON.stringify(value))=="undefined"?JSON.stringify(value):JSON.stringify(value).replace(/\"/g," ")
    // mapp key to value
    // this.mapped[this.key] = this.value

    // add key to
    if (document_keys.indexOf(this.key)==-1) {
        document_keys.push(this.key)
    }
}

function key_object(key){
    this.key = key
}