( async function() {

    if(localStorage.getItem("user") === null){
        window.location = "../index.html";
    }

    const colors = [
        "#2EC76D"
    ];

    const statusArr = await listStatus();
    const res = await list();

    //console.log(statusArr);
    const tasks = document.querySelector(".tasks");
    res.forEach(element => {
        let random = Math.random(colors.length -1);

        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.style.borderBottom = `4px solid ${colors.at(random)}`;
        
        let cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");
        
        let cardhading = document.createElement("h2");
        cardhading.innerText = element.name;

        let cardEditBtn = document.createElement("button");
        cardEditBtn.setAttribute("class","card-edit-btn");
        cardEditBtn.setAttribute("id",`btn-${element.id}`);
        //cardEditBtn.setAttribute("value", element.id)

        let hr = document.createElement("hr");

        cardHeader.append(cardhading);
        cardHeader.append(cardEditBtn);
        cardHeader.append(hr)

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class","card-body");

        let cardBodyTitle = document.createElement("p");
        cardBodyTitle.setAttribute("class","card-body-title");
        cardBodyTitle.innerText = "Descripción";

        let cardBodyMessage = document.createElement("p");
        cardBodyMessage.setAttribute("class","card-body-message");
        cardBodyMessage.innerText = element.description;
        
        cardBody.append(cardBodyTitle);
        cardBody.append(cardBodyMessage);

        // create div item
        let cardFooter = document.createElement("div");
        cardFooter.setAttribute("class","card-footer");

        let select = document.createElement("select");
        select.setAttribute("class",".select2")
        select.setAttribute("name", "status");
        select.setAttribute("data-id",`${element.id}`);

        let option = document.createElement("option");
        option.setAttribute("value", ""); 
        option.innerText = "";
        select.append(option);

        statusArr.forEach(el => {
            let option1 = document.createElement("option");
            option1.setAttribute("value", el.id);        
            option1.innerText = el.name;
            if(el.id === element.status_id) {
                option1.setAttribute("selected","true") 
            }
            select.append(option1);
        });        
          
        cardFooter.append(select);
        let btnDelete = document.createElement("button");
        btnDelete.innerText = "Eliminar";
        btnDelete.setAttribute("value", element.id); 
        btnDelete.setAttribute("class", "delete"); 
        cardFooter.append(btnDelete)

        card.append(cardHeader);
        card.append(cardBody);
        card.append(hr);
        card.append(cardFooter);

        tasks.append(card);
    });

    const addBtn = document.querySelector("#add-task");
    const modal = document.querySelector("#modal");
    const btnCancel = document.querySelector(".close-modal");
    const span = document.querySelector(".close");
    const body = document.querySelector("body");
    const modalTitle = document.querySelector("h2.modal-title")
    const form = document.querySelector("#formtask");
    const taskname = document.getElementById("taskname");
    const taskDescription = document.getElementById("tasdecrip");
    const nameCounter =  document.querySelector(".namecounter");
    const descriptCounter =  document.querySelector(".descripcounter");
    const btn = document.querySelector(".card-edit-btn");
    const inputHidden = document.querySelector("#idtask");
    const btnDelete = document.querySelector(".delete");
    const select = document.querySelector(".select2");

    // Edit task 
    btn.addEventListener('click', async (e) => {
        modal.setAttribute("data-action","edit");
        let indice = e.target.id.indexOf("-");
        let id = e.target.id.substring(indice + 1,e.target.id.length);
        inputHidden.value = id;
        let task = await getTask(id);
        taskname.value = task.name;
        taskDescription.value = task.description;
        modalTitle.innerText = "Editar Tarea";
        modal.style.display = "block";
        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    });

    // create task
    addBtn.addEventListener("click", () => {
        modal.setAttribute("data-action","add")
        modalTitle.innerText = "Adicionar Tarea";
        modal.style.display = "block";
        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    });

    btnCancel.addEventListener("click", () => {
        modal.setAttribute("data-action","");
        errorName.innerText = "";
        errorDescrip.innerText = "";
        nameCounter.innerText = "0/150";
        descriptCounter.innerText = "0/150";
        form.reset();
        modal.style.display = "none";
        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    });

    span.addEventListener("click", () => {
        modal.setAttribute("data-action","");
        errorName.innerText = "";
        errorDescrip.innerText = "";
        nameCounter.innerText = "0/150";
        descriptCounter.innerText = "0/150";
        form.reset();
        modal.style.display = "none";
        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    });

    // delete task
    btnDelete.addEventListener("click", async () => {
        var result = confirm("Estas seguro de eliminar esta tarea!");
            if (result == true) {
                let response = await deleteTask(btnDelete.value);  
                if(response !== false) {
                showAlert("La tarea ha sido eliminada satisfactoriamente");
                location.reload();
            }
        } 
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        btnText.style.color = "#2EC76D";
        button.classList.add("button--loading");
        console.log(button.attributes)

        let attrData = modal.getAttribute('data-action');
        if(attrData === "add")
        {
            let response = await addTask(taskname.value,taskDescription.value);  
            if(response !== false) {
                modal.setAttribute("data-action","")
                errorName.innerHTML = "";
                errorDescrip.innerText = "";
                modal.style.display = "none";
                body.style.position = "inherit";
                body.style.height = "auto";
                body.style.overflow = "visible";

                form.reset();

                showAlert("La tarea ha sido adicionada satisfactoriamente");

                location.reload();
            }
        }
        else {
            let response = await updateTask(inputHidden.value, taskname.value,taskDescription.value);  
            alert(response);
            if(response !== false) {
                modal.setAttribute("data-action","")
                errorName.innerText = "";
                errorDescrip.innerText = "";
                modal.style.display = "none";
                body.style.position = "inherit";
                body.style.height = "auto";
                body.style.overflow = "visible";

                form.reset();

                showAlert("La tarea ha sido editada satisfactoriamente");

                location.reload();
            }
        }
    });

    taskname.addEventListener("keyup", () => {
        errorName.innerText = "";
        let maxLength = 150;
        let strLength = taskname.value.length;
        if(strLength > maxLength){
            nameCounter.innerText = strLength+'/'+maxLength;
        }
        else{
            nameCounter.innerText = strLength+'/'+maxLength;
        }
    });

    taskDescription.addEventListener("keyup", () => {
        errorDescrip.innerText = "";
        let maxLength = 150;
        let strLength = taskDescription.value.length;
        if(strLength > maxLength){
            descriptCounter.innerText = strLength+'/'+maxLength;
        }
        else{
            descriptCounter.innerText = strLength+'/'+maxLength;
        }
    });

    //Assign Status to Task
    // select.addEventListener("change", async (e) => {
    //     console.log(e.target);
    // });

})();










