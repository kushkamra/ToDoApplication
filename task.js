
let addTaskinput = document.getElementById("addTaskinput");
let addTaskbtn = document.getElementById("addTaskbtn");

window.onload =  function() 
{
     
    var addTaskinput = document.getElementById("addTaskinput");
    var addTaskbtn = document.getElementById("addTaskbtn");     
    
    addTaskbtn
    
}


addTaskbtn.addEventListener("click", function(){
    addtaskinputval = addTaskinput.value;
    if(addtaskinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webtask);
        }
        taskObj.push({'task_name':addtaskinputval, 'completeStatus':false ,'date': '2020-02-20'});
		// console.log(taskObj, 'Ashendra');
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
    //showtask();
})
