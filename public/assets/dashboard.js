( async function() {

    if(localStorage.getItem("user") === null){
        window.location = "../index.html";
    }

    const colors = [
        "#2EC76D"
    ];

    const statusArr = await listStatus();
    const res = await list();

    console.log(statusArr);

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
        cardEditBtn.setAttribute("value", element.id)

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

        // crate select item
        let status = statusArr.find(x => x.id === element.status_id);
        if(status){
            let select = document.createElement("select");
            select.setAttribute("name", "status");
    
            // crete option item
            let option = document.createElement("option");
            option.setAttribute("value", element.status_id);        
            option.innerText = status.name;
    
            select.append(option);
            cardFooter.append(hr)
            cardFooter.append(select)
        }    
       
        card.append(cardHeader);
        card.append(cardBody);
        card.append(cardFooter);

        tasks.append(card);
    });

    const addBtn = document.querySelector("#add-task");
    const modal = document.querySelector("#modal");
    const span = document.querySelector(".close");
    const body = document.querySelector("body");
    const modalTitle = document.querySelector("h2.modal-title")

    // Edit task 
    const btn = document.querySelector(".card-edit-btn");
    btn.addEventListener('click', () => {
        modalTitle.innerText = "Editar Tarea";
        modal.style.display = "block";
        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    });

    // create task
    addBtn.addEventListener("click", () => {
        modalTitle.innerText = "Adicionar Tarea";
        modal.style.display = "block";
        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    });

    span.addEventListener("click", () => {
        modal.style.display = "none";
        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    });

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }

})();










