
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
 var userdata =  JSON.parse(sessionStorage.getItem("userdata"));
window.onload = function loadUserData() {                  
        if(userdata != null)
        {               
            document.getElementById("firstName").value =   userdata.firstName; 
            document.getElementById("lastName").value =   userdata.lastName;
            document.getElementById("address").value =   userdata.address;
            document.getElementById("gender").selectedValue = userdata.gender;
            document.getElementById("email").value =   userdata.email;
            document.getElementById("output").src =  userdata.image;
        }
        else
        {
             alert("Session expired ,Please login to load data");
             window.location.href = "Login.html";
        }

}


loadImage = function() {
    debugger;
    var input = document.getElementById("profileImage");
    var imagereader = new FileReader();
    imagereader.readAsDataURL(input.files[0]);
    imagereader.onloadend = function(event) {
        var profileImage = document.getElementById("profileImage");
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(input.files[0]);
        profileImage.src = event.target.result;
       
    }
    
}

function updateUserData() {
    let result = false;
    try {
        debugger;
        if(userdata !=null) 
        {     
            let users =  JSON.parse(localStorage.getItem("users"));
            var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email));  
                for (keys in users[userIndex]) {
                    if(keys == "firstName") {
                         users[userIndex].firstName =  document.getElementById("firstName").value ;
                         continue;
                    }
                    if(keys == "lastName" ) {
                          users[userIndex].lastName =  document.getElementById("lastName").value; 
                          continue;
                    }
                    if (keys == "gender") {
                        users[userIndex].gender =  document.getElementById("gender").value;  
                        continue;
                    }
                    if(keys == "address") {
                        users[userIndex].address =  document.getElementById("address").value; 
                        continue; 
                    }
                    if(keys == "image") {

                        users[userIndex].image =  document.getElementById("output").src; 
                        continue; 
                    }
                } 

              
                localStorage.setItem("users", JSON.stringify(users));
                sessionStorage.setItem("userdata", JSON.stringify(users[userIndex]));
                result =  true;
        } else 
        {
              alert("Profile Update failed");
              result =  false;
        }
        

      } catch (error) {
         result = false;
         console.log(error);
     }
   return result;
}
