showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
let addtaskdateinput =  document.getElementById("addtaskdateinput");
let addtaskReminderDateInput = document.getElementById("addtaskReminderDateInput");
let IsError =  false;
addtaskbtn.addEventListener("click", function(){
    debugger;
    addtaskinputval = addtaskinput.value;
    addtaskdateinputval =  addtaskdateinput.value;
    addtaskcategoryinputval =  document.querySelectorAll('input[name="task_category"]:checked');
    addtaskIsreminderval =   document.querySelector('input[name="task_reminder"]:checked').value || "No";
    addtaskIspublicval =  document.querySelector('input[name="task_isPublic"]:checked').value || "No";
    addtaskReminderDateInputVal = "";
     if(addtaskIsreminderval.trim() == "Yes") 
     {
        addtaskReminderDateInputVal = addtaskReminderDateInput.value;
     }
   
     var aIds = [];
     for(var x = 0, l = addtaskcategoryinputval.length; x < l;  x++)
     {
         aIds.push(addtaskcategoryinputval[x].value);
     }
     var str = aIds.join(', ');
     
     if(validateTaskInput()){
        if(addtaskinputval.trim()!=0)
        {
          
            var users = JSON.parse(localStorage.getItem("users"));
            var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email));
            var webtaskObj =  users.find( a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email)).toDoList
           // let addtaskcategoryinput = 
           // console.log('tests: ' + userIndex);
            if(webtaskObj.length == 0){
                taskObj = [];
            }
            else{
                taskObj = webtaskObj;
            }
             
             
            if(isTaskNameAvalaible(taskObj,addtaskinputval.trim())) 
            {
                taskObj.push({'task_name':addtaskinputval, 'completeStatus':false ,
                'task_date' :addtaskdateinputval,'task_cat' : str ,
                'task_reminder' : addtaskIsreminderval , 'task_reminder_date':addtaskReminderDateInputVal , 'task_isPublic' : addtaskIspublicval });
                // console.log(taskObj, 'Kushal');
               
                 for (keys in users[userIndex]) {
                    if(keys == 'toDoList'){
                       
                        users[userIndex].toDoList = taskObj;
                    }
                } 
               // console.log(users);  
               localStorage.setItem("users", JSON.stringify(users));
               addtaskinput.value = '';
               addtaskdateinput.value = '';
               document.getElementById("tasknameError").style.display= "none";
               refreshCategorySelection();
               setDefaultValueInElements() 
            }
            else 
            {
                document.getElementById("tasknameError").style.display= "block";
            }
        }
    }
    showtask();
})

function setDefaultValueInElements() 
{
     document.getElementById("reminderYes").checked =  false ; 
     document.getElementById("reminderNo").checked =  true ; 
     document.getElementById("publicYes").checked =  false ; 
     document.getElementById("publicNo").checked =  true ;  
    addtaskReminderDateInput.style.display = "none";
    addtaskReminderDateInput.value = "";
    document.getElementById("reminderDatedv").style.display = "none";
}

function validateTaskInput() {
     let result =  true; 

     let  addtaskinputval = addtaskinput.value; 
     if(addtaskinputval == "" || addtaskinputval ==  undefined) 
     { 
         document.getElementById("tasknameError").style.display= "block"; 
         document.getElementById("tasknameError").innerText= "Task name required"; 
         result = false; 
     }
     else 
     {
         document.getElementById("tasknameError").style.display= "none"; 
     }
 


     let addtaskcategoryinputval =  document.querySelector('input[name="task_category"]:checked');
      if(addtaskcategoryinputval== null || addtaskcategoryinputval.length == 0 ) 
      {
        document.getElementById("taskCategoryError").style.display= "block"; 
        result = false; 
      }else 
      {
        document.getElementById("taskCategoryError").style.display= "none"; 
      }


    let addtaskdateinputval =  addtaskdateinput.value;
    if(addtaskdateinputval == "") 
    { 
        document.getElementById("taskDateError").style.display= "block"; 
        result = false; 
    }
    else 
    {
        document.getElementById("taskDateError").style.display= "none"; 
    }

    var selectedText = addtaskdateinputval 
    var selectedDate = new Date(selectedText);
    var now = new Date();
    if (selectedDate < now) {
        document.getElementById("taskDateError").style.display= "block"; 
        document.getElementById("taskDateError").innerText = "Selected task date should not be Past Date"
        result = false; 
    }
    else
    {
        document.getElementById("taskDateError").style.display= "none"; 
    }


      return result;
}
function isTaskNameAvalaible(taskobject,name) {
   
    var  taskIndex =  taskobject.findIndex(a => a.task_name == name);   
    if(taskIndex >= 0 ) 
    {
        return false;
    }
    else 
    {
        return true;
    }
    
}

// showtask
function showtask(){
    let users = JSON.parse(localStorage.getItem("users")); 
    //debugger;
    let webtask = users.find( a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email)).toDoList
    //console.log(webtask);

    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = webtask;
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
            taskcompleteStatustext =  `<td style="color:green; font-weight: bold;">Completed</td>`
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
            taskcompleteStatustext =`<td style="color:red;font-weight: bold;">Pending</td>`
        }
        html += `<tr>
                    <td><input type="checkbox" value="${index}" name="task_checkbox" id="chkTask"/></td>
                    <td scope="row">${index+1}</td>
                    ${taskCompleteValue}
                    ${taskcompleteStatustext}
                    <td>${item.task_date}</td>
                    <td>${item.task_cat}</td>
                    <td><button type="button" style="cursor:pointer;" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" class="text-success" id=${index}><i class="fa fa-check-square-o"></i>Done</button></td>
                    <td><button type="button"  onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });
    addedtasklist.innerHTML = html;
}

// edittask
function edittask(index){

    debugger;
  
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskReminderRadioButton =  
    saveindex.value = index;

    let users = JSON.parse(localStorage.getItem("users")); 
    let taskObj = users.find( a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email)).toDoList
    var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email));
    addtaskinput.value = taskObj[index]['task_name'];
    addtaskdateinput.value = taskObj[index]['task_date'];

     let categoryValues  =  taskObj[index]['task_cat'];
     let categoryList = categoryValues.split(',');
     categoryWebCount  = document.querySelectorAll('input[name="task_category"]').length;
     refreshCategorySelection();
     categoryList.forEach((item) => {
       for(i=0 ; i < categoryWebCount ; i++) 
       {
              if(item.trim() ==  document.querySelectorAll('input[name="task_category"]')[i].value) 
              {
                document.querySelectorAll('input[name="task_category"]')[i].checked =  true;
              } 
       }
     });

     if(taskObj[index]['task_reminder'] == 'Yes') 
     {
         document.getElementById("reminderYes").checked =  true;
         addtaskReminderDateInput.value =  taskObj[index]['task_reminder_date'];
         document.getElementById("reminderDatedv").style.display = "block";
         
     }else 
     {
         document.getElementById("reminderNo").checked =  true;
         document.getElementById("reminderDatedv").style.display = "none";
         addtaskReminderDateInput.value = '';
     }
     
     if(taskObj[index]['task_isPublic'] == 'Yes') 
     {
         document.getElementById("publicYes").checked =  true;
     }else 
     {
         document.getElementById("publicNo").checked =  true;
     }
    
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
    event.stopPropagation();
}

function refreshCategorySelection() 
{
    let categoryWebCount  = document.querySelectorAll('input[name="task_category"]').length;
    for(i=0 ; i < categoryWebCount ; i++) 
    {
           if(document.querySelectorAll('input[name="task_category"]')[i].checked) 
           {
            document.querySelectorAll('input[name="task_category"]')[i].checked  =  false;
           }
    }
}
// savetask
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let saveindex = document.getElementById("saveindex").value;
    let users = JSON.parse(localStorage.getItem("users")); 
    let taskObj = users.find( a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email)).toDoList
    var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email));

    let addtaskcategoryinputval =  document.querySelectorAll('input[name="task_category"]:checked');
    let addtaskIsreminderval =   document.querySelector('input[name="task_reminder"]:checked').value || "No";
    let addtaskIspublicval =  document.querySelector('input[name="task_isPublic"]:checked').value || "No";
    let addtaskReminderDateInputVal = "";

     if(addtaskIsreminderval.trim() == "Yes") 
     {
        addtaskReminderDateInputVal = addtaskReminderDateInput.value;
     }
     let aIds = [];
     for(var x = 0, l = addtaskcategoryinputval.length; x < l;  x++)
     {
         aIds.push(addtaskcategoryinputval[x].value);
     }
     let str = aIds.join(', ');
    for (keys in taskObj[saveindex]) {
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = addtaskinput.value;
            taskObj[saveindex].task_cat =  str;
            taskObj[saveindex].task_date =  addtaskdateinput.value;
            taskObj[saveindex].task_reminder = addtaskIsreminderval ; 
            if(addtaskIsreminderval == "Yes") 
            {
                taskObj[saveindex].task_reminder_date = addtaskReminderDateInput.value;
            }
            else
            {
                taskObj[saveindex].task_reminder_date = '';
            }
            
            taskObj[saveindex].task_isPublic =  addtaskIspublicval;
        }
      }
    // taskObj[saveindex] = {'task_name':addtaskinput.value, 'completeStatus':false} ;
  //  taskObj[saveindex][task_name] = addtaskinput.value;
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    for (keys in users[userIndex]) {
        if(keys == 'toDoList'){
            users[userIndex].toDoList = taskObj;
        }
    } 
   // console.log(users);  
    localStorage.setItem("users", JSON.stringify(users));
    addtaskinput.value='';
    refreshCategorySelection();
    setDefaultValueInElements();
    showtask();
})


//Done Task 
let addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click", function(e){
        debugger;
        let users = JSON.parse(localStorage.getItem("users")); 
        let taskObj = users.find( a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email)).toDoList
        var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email));

        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");
        
        
        // let taskValue = taskObj[mytargetid]['task_name'];
        
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
           
            for (keys in taskObj[mytargetid]) {
                if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
                    taskObj[mytargetid].completeStatus = false;
                  
                }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
                    taskObj[mytargetid].completeStatus = true;
                  
                }
              }
       
    for (keys in users[userIndex]) {
        if(keys == 'toDoList'){
            users[userIndex].toDoList = taskObj;
        }
    } 
   // console.log(users);  
    localStorage.setItem("users", JSON.stringify(users));
    showtask();
    }
})

    // deleteitem
function deleteitem(index){

    var choice = confirm("Are you sure you want to delete this item ?");

    if (choice) { 
        let users = JSON.parse(localStorage.getItem("users")); 
        let webtask = users.find( a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email)).toDoList
        var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email));
        webtask.splice(index, 1);
       
        for (keys in users[userIndex]) {
            if(keys == 'toDoList'){
                users[userIndex].toDoList = webtask;
            }
        } 
       // console.log(users);  
        localStorage.setItem("users", JSON.stringify(users));
        showtask();
    } 
}

// Delete Selected items
let deleteSelected =  document.getElementById("deletedSelectedbtn");
deleteSelected.addEventListener("click",function(){
    event.preventDefault(); 
    debugger;
    var choice = confirm(this.getAttribute('data-confirm')); 
    if(choice) 
    {
       
        var grid = document.getElementById("addedtasklist");
        //Reference the CheckBoxes in Table.
        var checkBoxes = grid.getElementsByTagName("INPUT");
        //Loop through the CheckBoxes.
        let users = JSON.parse(localStorage.getItem("users")); 
        let webtask = users.find( a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email)).toDoList
        var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email));

        for (var i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                //console.log("Index Id : - " + checkBoxes[i].value);
                webtask.splice(checkBoxes[i].value, 1);
            }
        }

        for (keys in users[userIndex]) {
            if(keys == 'toDoList'){
                users[userIndex].toDoList = webtask;
            }
        } 
       // console.log(users);  
        localStorage.setItem("users", JSON.stringify(users));
        showtask();
 
      
     
    }
});

// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    
    event.preventDefault(); 
   
    var choice = confirm(this.getAttribute('data-confirm'));

      if (choice) {
        let savetaskbtn = document.getElementById("savetaskbtn");
        let addtaskbtn = document.getElementById("addtaskbtn");
        let users = JSON.parse(localStorage.getItem("users")); 
        let webtask = users.find( a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email)).toDoList
        var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("userdata")).email));
    
        for (keys in users[userIndex]) {
            if(keys == 'toDoList'){
                users[userIndex].toDoList = [];
            }
        } 
        savetaskbtn.style.display="none";
        addtaskbtn.style.display="block";
        localStorage.setItem("users", JSON.stringify(users));
        showtask();
      }   
})

//Search by name
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[2].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})

//Search by Status
document.getElementsByName('status').forEach(function(e) {
    e.addEventListener("click", function() {
         debugger;
             let trlist = document.querySelectorAll("tr");
            Array.from(trlist).forEach(function(item){
                let completedstatustext = item.getElementsByTagName("td")[3].innerText;
                //console.log(completedstatustext);
                let re = new RegExp(e.value, 'gi');
                if(completedstatustext.match(re)){
                    item.style.display="table-row";
                }
                else{
                    item.style.display="none";
                }  
            })
    });
});

// Search by category
document.getElementsByName('category').forEach(function(e) {
    e.addEventListener("click", function() {
         debugger;
             let trlist = document.querySelectorAll("tr");
            Array.from(trlist).forEach(function(item){
                let categorytext = item.getElementsByTagName("td")[5].innerText;
                //console.log(completedstatustext);
                let re = new RegExp(e.value, 'gi');
                if(categorytext.match(re)){
                    item.style.display="table-row";
                }
                else{
                    item.style.display="none";
                }  
            })
    });
});

function IsReminderYes() {
    debugger;
      if(document.getElementById("reminderYes").checked ) 
      {
        document.getElementById("reminderDatedv").style.display = "block";  
      }else 
      {
          document.getElementById("reminderDatedv").style.display = "none";
      }
    
}
function IsReminderNo() {
    debugger;
      if(document.getElementById("reminderNo").checked ) 
      {
        document.getElementById("reminderDatedv").style.display = "none";  
      }else 
      {
          document.getElementById("reminderDatedv").style.display = "block";
      }
    
}



         
           














