
// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

var modal = document.getElementById("myModal");

function saveUser() {
    
    try {
        debugger;
       
      
        if( !validateFormData()) 
        {
            return false ;   
        }

        if(validateEmail(email)) 
        {

            var users = JSON.parse(localStorage.getItem("users")) || [];

          //  var imgresut =  getImagedata();
            let user =  {
           
                firstName :  document.getElementById("firstName").value, 
                lastName : document.getElementById("lastName").value,
                email :  document.getElementById("email").value.toLowerCase(),
                password : Base64.encode(document.getElementById("password").value),
                gender : document.getElementById("gender").value,
                address : document.getElementById("address").value , 
                image :  document.getElementById("profileImage").src,
                toDoList : []
               
            } 
            users.push(user);   
            localStorage.setItem("users",JSON.stringify(users));
            alert("Registration done succesfully.");
            return true;
        }else 
        {
           document.getElementById("emailmsg").style.display = 'block';
           document.getElementById("emailmsg").innerText = 'User already registered with this email, kindly use difrent email.';
           return false; 
        }
        
    } catch (error) {
        
        console.log(error);
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

function validateFormData() {
    let email =  document.forms.regForm.email.value; 
    let firstname =  document.forms.regForm.firstName.value; 
    let lastname =  document.forms.regForm.lastName.value;
    let password = document.forms.regForm.password.value;
    let confirmpassword = document.forms.regForm.confirmPassword.value;
     let result =  true ; 

    if(email == undefined || email == "") 
    {
       result =  false;
       document.getElementById("emailmsg").style.display = "block";
    
    }
    if(firstname == undefined || firstname == "") 
    {
       result =  false;
       document.getElementById("firstnamemsg").style.display = "block";
     
    }
    if(lastname == undefined || lastname == "") 
    {
       result =  false;
       document.getElementById("lastnamemsg").style.display = "block";
     
    }

    if(password == undefined || password == "") 
    {
       result =  false;
       document.getElementById("passwordmsg").style.display = "block";
     
    }
    if(confirmpassword == undefined || confirmpassword == "") 
    {
       result =  false;
       document.getElementById("confirmpasswordmsg").style.display = "block";
     
    }
    return result; 


}

function validateEmail(emailId) 
{
    let result =  true;
    if(emailId != undefined) 
    {
        let userList =  JSON.parse( localStorage.getItem("users"));
                
        if(userList != null) {
          var userdata =  userList.find( a  => a.email ==  emailId.toLowerCase());
          if(userdata != null) {
            result = false;; 
          }
        }
       
    }
    else 
    {
        document.getElementById("emailmsg").style.display = 'block';
        document.getElementById("emailmsg").innerText = 'User already registered with this email, kindly use difrent email.';       
    }
    return result ; 
}