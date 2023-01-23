
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

