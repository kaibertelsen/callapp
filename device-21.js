
function headerselect(elementid){
const element = document.getElementById(elementid);
//sett nytt bilde
var _img = document.getElementById('headerimage');
_img.src = element.dataset.image;
_img.srcset=element.dataset.image;
//sett nytt text
document.getElementById("firstnametext").innerHTML=element.dataset.firstname;
document.getElementById("lastnametext").innerHTML=element.dataset.lastname;
//sett variabelennavn
usernamedevice=element.dataset.name;
//skul liste
//document.getElementById("dropdownlist").style.display="none";
// send api

var arrayfieldname = [];
arrayfieldname.push("name");
arrayfieldname.push("user");


var arrayfieldvalue = [];
arrayfieldvalue.push(devicename);
arrayfieldvalue.push(element.dataset.webflowid);
sendtoapi(arrayfieldname,arrayfieldvalue);
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
todeviceid=element.dataset.deviceid;
tousername=element.dataset.deviceusername;
unmarkelement("devicemaster");
markelement(element.parentElement.parentElement);
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





function globalbuttonselect(elementid){
const element = document.getElementById(elementid);

var deviceids = findallelement("active","recivers");

var title="";
var text="";
var uname= "";
var dname="";
var tname="";

if (element.dataset.senddevicename=="true"){
dname=devicename+"-";
}

if (element.dataset.sendusername=="true"){
uname = "_Fra:"+usernamedevice;
}

title=dname+element.dataset.title;
text = dname+element.dataset.text+tname+uname;

document.getElementById("todeviceid").value = deviceids;
document.getElementById("alerttitle").value = title;
document.getElementById("text").value = text;

//unmarkelement("titlemaster");
//unmarkelement("devicemaster");
//unmarkelement("globalbuttonitem");
//markelement(element.parentElement.parentElement);

sendmaster();
alarmmarkelement(element.parentElement);
//generer element med beskjeden
makemessageelement("Alle",title,text,usernamedevice);



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

function alarmmarkelement(element){
	//element.style.display="Block";
	element.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
	setTimeout(function(){alarmmarkeroff(element)},5000);
	}

function alarmmarkeroff(element){
	element.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
	}



function makemessageelement(to,title,message,from){
	var arrayfieldname = [];
	arrayfieldname.push("name");
	arrayfieldname.push("title");
	arrayfieldname.push("text");
	
	var arrayfieldvalue = [];
	arrayfieldvalue.push(devicename);
	arrayfieldvalue.push(title);
	arrayfieldvalue.push(message);
	
	creatsendoapi("63c66ea078517bf506285585",arrayfieldname,arrayfieldvalue);
	}