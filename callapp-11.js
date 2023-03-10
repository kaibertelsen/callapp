function makebodystring(fieldnames,fieldvalues){
    // lag bodystrin for apicall
    let bodystring="{";
    for (let i = 0; i < fieldnames.length; i++) {
      //for hver enhet i fieldnames
        if(Array.isArray(fieldvalues[i])){
         //om det er et arrayfelt
         let subitem = "";
         var subitemarray = fieldvalues[i];
         for (let i = 0; i < subitemarray.length; i++) {
             //loope gjennom alle subitem
             subitem = subitem+'"'+subitemarray[i]+'"'+',';
         }
         subitem = subitem.slice(0, -1)
    
       bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+"["+subitem+"]"+",";
       }else if(fieldvalues[i]=="true"){
      //om det er et booleanfelt
            bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+true+",";
       }else if (fieldvalues[i]=="false"){
        //om det er et booleanfelt
        bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+false+",";
       }else{
         // vanlig tekstfelt
        bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+'"'+fieldvalues[i]+'"'+",";
       }
           }
        //fjerner siste ","	   
    bodystring = bodystring.slice(0, -1)
    bodystring = bodystring+"}";
    console.log(bodystring);
    return (bodystring);
    }


function sendtoapi(sid,arrayfieldname,arrayfieldvalue){
    let bodystring = makebodystring(arrayfieldname,arrayfieldvalue);
	//kallet på api webflow funksjonen 
    callapi(baseId,collectionId,deviceid,bodystring,"PATCH","webflow",sid);

}

function creatsendoapi(cid,arrayfieldname,arrayfieldvalue){
    let bodystring = makebodystring(arrayfieldname,arrayfieldvalue);
	//kallet på api webflow funksjonen 
    callapi(baseId,cid,"",bodystring,"POST","webflow","102");
   

}

//test for API mot CMS Navn
//callapi("","63c66ea078517bf506285585","63d931790092cd0e36678ea8","","GET","webflow","600");
