
//Header dropdown
document.getElementById("headerdropdownbutton").onclick = function(event) {
	// åpner dropdown header
	const elementwrapper = document.getElementById("dropdownlistheader");
	clickdr2++;
		   if (clickdr2==1) {
		 //første click
		  elementwrapper.style.display = "Block";
		 }else if (clickdr2==2){
		 //andre click
		  elementwrapper.style.display = "none";
		  clickdr2=0;
			 }
	
	}

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
usernamedevice=element.dataset.firstname;
//sett variabelbrukerid
userid=element.dataset.webflowid;

// send api
var arrayfieldname = [];
arrayfieldname.push("name");
arrayfieldname.push("user");
var arrayfieldvalue = [];
arrayfieldvalue.push(devicename);
arrayfieldvalue.push(element.dataset.webflowid);
sendtoapi("100",arrayfieldname,arrayfieldvalue);

//skjul dorpdown liste
document.getElementById("dropdownlistheader").style.display="none";
clickdr2=0

//Sjekke om dette er en dummy bruker type "ledig"
if(element.dataset.firstname=="Ledig"){
//er device i status i bruk?
var statusdevice = document.getElementById("statustext").innerHTML;
if(statusdevice=="Er i bruk"){
//da skal den skifte til Brukt
// sett status on device
statusselect("ma-sprites");
}

}
}


//Status Dropdown
document.getElementById("statusdropdownbutton").onclick = function(event) {
	// åpner dropdown select status
		   const elementwrapper = document.getElementById("dropdownlistwrapper");
				clickdr1++;
		   if (clickdr1==1) {
		 //første click
		  elementwrapper.style.display = "Block";
		 }else if (clickdr1==2){
		 //andre click
		  elementwrapper.style.display = "none";
		  clickdr1=0;
			 }
	
}

function statusselect(elementid){
		const element = document.getElementById(elementid);
		//sett nytt text
		const textelement=document.getElementById("statustext");
		textelement.innerHTML=element.dataset.name;
		const colorselect = textelement.parentElement.getElementsByClassName("statuscolor")[0];
		colorselect.style.backgroundColor = element.dataset.color;
		
		var arrayfieldname = [];
		arrayfieldname.push("name");
		arrayfieldname.push("devicestatus");
		
		var arrayfieldvalue = [];
		arrayfieldvalue.push(devicename);
		arrayfieldvalue.push(element.dataset.webflowid);
		sendtoapi("200",arrayfieldname,arrayfieldvalue);
		//Skjule dropdownliste
		document.getElementById("dropdownlistwrapper").style.display = "none";
		clickdr1=0
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

var deviceids = "";
var title="";
var text="";
var uname= "";
var dname="";
var tname="";
var todevice = "";

if (element.dataset.sendtoall=="true"){
	deviceids = findallelement("active","recivers");
	todevice = "all";
}else{
//send device user tlf device
deviceids = userdeviceid;
todevice = userdevicewebflowid;
}

if (element.dataset.senddevicename=="true"){
dname=devicename+"\n";
}

if (element.dataset.senddeviceusername=="true"){
uname = "_Fra:"+usernamedevice;
}

if (!element.dataset.changestatus==""){
	// sett status on device
	statusselect(element.dataset.changestatus);
	}

title=dname+element.dataset.title;
text = dname+element.dataset.text+tname+uname;

document.getElementById("todeviceid").value = deviceids;
document.getElementById("alerttitle").value = title;
document.getElementById("text").value = text;
sendmaster();
alarmmarkelement(element.parentElement);
//generer element med beskjeden
makemessageelement(todevice,userid,deviceid,userid,element.dataset.title,element.dataset.text);
}

//Underbutton select
function textselect(elementid){
	const element = document.getElementById(elementid);
	var title="";
	var text="";
	var uname= "";
	var dname="";
	var tname="";
	
	if (element.dataset.senddevicename=="true"){
	dname=devicename+" ";
	}
	
	if (element.dataset.sendusername=="true"){
	uname = "_Fra:"+usernamedevice;
	}
	
	if (element.dataset.sendtoname=="true"){
	tname = "("+tousername+")-";
	}
	
	if (!element.dataset.changestatus==""){
	// sett status on device
	statusselect(element.dataset.changestatus);
	}
	
	title=dname+element.dataset.title;
	text = dname+element.dataset.text+tname+uname;
	
	document.getElementById("todeviceid").value = todeviceid;
	document.getElementById("alerttitle").value = title;
	document.getElementById("text").value = text;
	
	unmarkelement("titlemaster");
	unmarkelement("globalbuttonitem");
	markelement(element.parentElement.parentElement);
	
	sendmaster();
	alarmmarkelement(document.getElementById(selecteddevice));
	//genererer labletext
	//generer label text message
	makelabeltextmessage(selecteddevice,dname,element.dataset.text);
	
	const elementdevice = document.getElementById(selecteddevice);
	//generer element med beskjeden
	makemessageelement(elementdevice.dataset.webflow,elementdevice.dataset.userwebflowid,deviceid,userid,dname,element.dataset.text);
	}

//Direkte trykk på callbutton	
function callbuttonselect(elementid){
		const buttonelement = document.getElementById(elementid);
		const element = document.getElementById(buttonelement.dataset.infoelementid);
		tousername=element.dataset.deviceusername;
		var uname= "Fra:"+usernamedevice;
		var title=devicename;
		var text=uname;
		$('#todeviceid').val(element.dataset.deviceid);
		$('#alerttitle').val(title);
		$('#text').val(text);
		
		//generer label text message
		makelabeltextmessage(buttonelement.dataset.infoelementid,title,text);
		
		//generer element med beskjeden
		makemessageelement(element.dataset.webflow,element.dataset.userwebflowid,deviceid,userid,title,text);
		
		//send
		sendmaster();
		alarmmarkelement(element);
		
		}

// Lagrer alarmelement i CMS og designer et element instant
function makesendelementlogg(data){
			const wrapper = document.getElementById("logelementwrapper");
			const copyobject = document.getElementById("copynode");
			const clone = copyobject.cloneNode(true);
			wrapper.appendChild(clone);
			clone.style.display='block';
			wrapper.insertBefore(clone, wrapper.children[0]);
			
			//sette inn riktige verdier i alarmfeltet
			const time = clone.getElementsByClassName("time")[0];
			var d = new Date(); // for now
			timetext = d.getHours()+":"+d.getMinutes();
			time.innerHTML = timetext;
			//
			if (data.toall){
			const toname = clone.getElementsByClassName("toname")[0];
			toname.innerHTML = "Alle";
			}else{
			const toname = clone.getElementsByClassName("toname")[0];
			toname.innerHTML = tousername;
			}
			//
			const title = clone.getElementsByClassName("title")[0];
			title.innerHTML = data.title;
			//
			const textmessage = clone.getElementsByClassName("textmessage")[0];
			textmessage.innerHTML = data.tekst;
			//
			const fromname = clone.getElementsByClassName("fromname")[0];
			fromname.innerHTML = usernamedevice;
			}
			




	//Lager siste melding tekst på device knapp
function makelabeltextmessage(elementid,title,message){
const titleelement = document.getElementById(elementid+"-tl");
const textelement = document.getElementById(elementid+"-lm");
textelement.parentElement.style.display="Block";
titleelement.innerHTML=title;
textelement.innerHTML=message;
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
element.style.backgroundColor = "rgba(255, 69, 70, 0.5)";

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
	element.style.backgroundColor = "rgba(86, 55, 179, 1.0)";
	element.style.color = "rgba(255, 255, 255, 1.0)";
	setTimeout(function(){alarmmarkeroff(element)},5000);
	}

function alarmmarkeroff(element){
	element.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
	element.style.color = "rgba(0, 0, 0, 1.0)";
	}



function makemessageelement(resivedeviceid,resiveuserid,senderdeviceid,senderuserid,title,message){
	
	var arrayfieldname = [];
	var arrayfieldvalue = [];

	arrayfieldname.push("name");
	arrayfieldvalue.push(devicename);

	arrayfieldname.push("title");
	arrayfieldvalue.push(title);

	arrayfieldname.push("tekst");
	arrayfieldvalue.push(message);

	arrayfieldname.push("senderdevice");
	arrayfieldvalue.push(senderdeviceid);

	arrayfieldname.push("senderuser");
	arrayfieldvalue.push(senderuserid);

	

if (resivedeviceid=="all"){
	//skal sendes til alle opplistede enheter
	arrayfieldname.push("toall");
	arrayfieldvalue.push("true");
}else{
	arrayfieldname.push("reciveruser");
	arrayfieldvalue.push(resiveuserid);

	arrayfieldname.push("reciverdevice");
	arrayfieldvalue.push(resivedeviceid);
	
	arrayfieldname.push("toall");
	arrayfieldvalue.push("false");

}

	arrayfieldname.push("status");
	arrayfieldvalue.push("open");

	
	
	creatsendoapi("63c66ea078517bf506285585",arrayfieldname,arrayfieldvalue);
	}