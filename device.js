
loudsettings();

function loudsettings(){
$('#alerttitle').val("{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}");


// sjekke om det er user koblet til transmitter
//Navn og bilde
if(!"{{wf {&quot;path&quot;:&quot;user:name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}"==""){
var _img = document.getElementById('headerimage');
_img.src = "{{wf {&quot;path&quot;:&quot;user:image&quot;,&quot;type&quot;:&quot;ImageRef&quot;\} }}";
_img.srcset="{{wf {&quot;path&quot;:&quot;user:image&quot;,&quot;type&quot;:&quot;ImageRef&quot;\} }}";
document.getElementById("headertext").innerHTML="{{wf {&quot;path&quot;:&quot;user:name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";
}



//setselector("radgiver","");
}

function headerselect(elementid){
const element = document.getElementById(elementid);
//sett nytt bilde
var _img = document.getElementById('headerimage');
_img.src = element.dataset.image;
_img.srcset=element.dataset.image;
//sett nytt text
document.getElementById("headertext").innerHTML=element.dataset.name;
//sett variabelennavn
usernamedevice=element.dataset.name;
//skul liste
//document.getElementById("dropdownlist").style.display="none";
// send api
}

function transmitterselect(elementid){
//loader ny transmitter
//var collectionurl ="https://callapp-63bcc2.webflow.io/device/"
var currenturl = window.location.href;
var oldslug = "{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";
var collectionurl = currenturl.substring(0,currenturl.length-oldslug.length);

window.location.replace(collectionurl+elementid);
}






function deviceselect(elementid){
const element = document.getElementById(elementid);

//lukke og skule beskjed wrapper
if(elementid==selecteddevice){
inverthideshow(document.getElementById("beskjed"));
}else{
document.getElementById("beskjed").style.display = "Block";
selecteddevice=elementid;
}



unmarkelement("titlemaster");
unmarkelement("globalbuttonitem");
document.getElementById("text-110").value="";


if(element.dataset.status==="active"){
$('#todeviceid').val(element.dataset.deviceid);


unmarkelement("devicemaster");
markelement(element.parentElement.parentElement);
//$("#beskjed").prependTo(element.parentElement.parentElement.parentElement);
const beskjedelement = document.getElementById("beskjed");
const selectedelement = element.parentElement.parentElement;
selectedelement.parentNode.insertBefore(beskjedelement, selectedelement);
selectedelement.parentNode.insertBefore(beskjedelement, selectedelement.nextSibling);
}else if(element.dataset.status==="busy"){
unmarkelement("devicemaster");
document.getElementById("beskjed").style.display = "none";
//alert er busy
}else if(element.dataset.status==="off"){
unmarkelement("devicemaster");
document.getElementById("beskjed").style.display = "none";
//alert er busy
}
}
function callbuttonselect(elementid){
const buttonelement = document.getElementById(elementid);
const element = document.getElementById(buttonelement.dataset.infoelementid);
$('#todeviceid').val(element.dataset.deviceid);
	if (document.getElementById("text-110").value===""){
   var textvalue ="{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";
   //det er ikke text i feltet
			if(!usernamedevice==""){
  			textvalue = textvalue+"-"+usernamedevice ;
  			}
	$('#alerttitle').val(textvalue);
	$('#text').val(textvalue);
	}else{
	//det er text i feltet
	var textvalue = document.getElementById("text-110").value;
  var titletextvalue = document.getElementById("text-110").value;
  if(senddeviceid=="true"){
  textvalue = "{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }} - "+textvalue;
  	if(!usernamedevice==""){
  	textvalue = textvalue+"-"+usernamedevice;
  	}
  }
  
$('#alerttitle').val(textvalue);
$('#text').val(textvalue);
}
//send
$("#sendermaster").click();
//tøm verdier
document.getElementById("beskjed").style.display = "none";

unmarkelement("titlemaster");
unmarkelement("globalbuttonitem");
senddeviceid="true";

}


function textselect(elementid){
const element = document.getElementById(elementid);
document.getElementById("text-110").value = element.dataset.title;
unmarkelement("titlemaster");
unmarkelement("globalbuttonitem");
markelement(element.parentElement.parentElement);
senddeviceid=element.dataset.senderdevicename;



}

function globalbuttonselect(elementid){
const element = document.getElementById(elementid);

var deviceids = findallelement("active","recivers");
$('#text').val(element.dataset.title);
$('#todeviceid').val(deviceids);
$('#alerttitle').val(element.dataset.title);
unmarkelement("titlemaster");
unmarkelement("devicemaster");
unmarkelement("globalbuttonitem");
markelement(element.parentElement.parentElement);
$("#sendermaster").click();

}

function inverthideshow(element){
	if(element.style.display=="none"){
	//det er skult og må vises
	element.style.display="Block"
	}else{
  element.style.display="none"
  }
}


function markelement(element){
// marker valgt element
element.style.backgroundColor = "rgba(255, 255, 255, 0.5)";

}
function findallelement(status,classname){
var elements = document.getElementsByClassName(classname);
let devicestring = "";
			for(var x=0; x < elements.length; x++){
           if(elements[x].dataset.status==status){
           			if (!elements[x].dataset.deviceid==""){
           			devicestring = elements[x].dataset.deviceid+","+devicestring;
           			}
           }
        	}
          
          
          devicestring=devicestring.substring(0, devicestring.length - 1);
					return (devicestring);
}

function unmarkelement(classname){
        var elements = document.getElementsByClassName(classname);
        for(var x=0; x < elements.length; x++){
            elements[x].style.backgroundColor = "rgba(255, 255, 255, 0.0)";
        }
}

