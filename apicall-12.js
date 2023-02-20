
async function callapi(baseId,collectionId,itemId,bodystring,type,db,fid){
    // fra memberstack
    let token = "";
    if (MemberStack.getToken()){
      token = MemberStack.getToken();
    }else if (localStorage.getItem('keymemberlokal')){
      token = localStorage.getItem('keymemberlokal');
    }else{
      //mangler token
      sessionStorage.setItem('needinlogg',window.location.href);
      window.location.replace("https://callapp.no/organization/"+orgslug);
           }
    
   // let token = useryek;
    //PATCH
    if(type == "PATCH"){
        if(db=="webflow"){
        //webflow
        let response2 = await fetch(`https://webflow-woad.vercel.app/api/item?collectionId=${collectionId}&itemId=${itemId}&token=${token}`, {
         method: "PATCH",
         body: bodystring,
         headers: {
        'Content-Type': 'application/json'
        }
        });
        let data2 = await response2.json();
        apireturn (data2,fid);
        }else if(db=="airtable"){
        //airtable
        let response = await fetch(`https://expoapi-zeta.vercel.app/api/row?baseId=${baseId}&tableId=${collectionId}&rowId=${itemId}&token=${token}`, {
          method: "PATCH",
          body:bodystring,
            headers: {
             'Content-Type': 'application/json'
            }
            
        });
        let data = await response.json();
        apireturn (data,fid);
       }
    //POST
    }else if (type=="POST"){
       if(db=="webflow"){
       //webflow
       let response = await fetch(`https://webflow-woad.vercel.app/api/item?collectionId=${collectionId}&token=${token}`, {
          method: "POST",
          body: bodystring,
          headers: {
             "content-type": "application/json"
          }
        });
        
        let data = await response.json();
        apireturnnew (collectionId,data,fid);
        
       }else if(db=="airtable"){
       //airtable
       let response = await fetch(`https://expoapi-zeta.vercel.app/api/row?baseId=${baseId}&tableId=${collectionId}&token=${token}`, {
       method: "POST",
       body:bodystring,
       headers: {
       'Content-Type': 'application/json'
        }
       });
       let data = await response.json();
       apireturn (data,fid);
         }
    }else if (type=="GET"){
      //GET item data
      if(db=="webflow"){
      let response = await fetch(`https://webflow-woad.vercel.app/api/item?collectionId=${collectionId}&itemId=${itemId}&token=${token}`);
      let data = await response.json();
      apireturnnew (data,fid);
      }
    }
    
    }
    

    function apireturnnew (cId,data,fid){
      //retur fra opprettelsen av webflow item
      let bodystring = makeupdatebodystring(data);
      callapi("",cId,data._id,bodystring,"PATCH","webflow",fid);
    }

    function makeupdatebodystring(data){
      // lag bodystrin for å oppdatere webflowid
      let bodystring="{"+'"name"'+":"+'"'+data.name+'"'+","+'"webflowid"'+":"+'"'+data._id+'"'+"}";
      return (bodystring);
      }
