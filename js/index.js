
window.onload = function () { 
 
    if(sessionStorage.getItem("userdata") == undefined) 
    {
        window.location.href = "Login.html" ;       
    }else 
    {
        document.getElementById("username").innerText =  JSON.parse(sessionStorage.getItem("userdata")).email ;
        
    }    
}

//logout button implementation 
function logout() {
    sessionStorage.removeItem("userdata");   
    return true;
}







