( async function() {

    if(localStorage.getItem("user") === null){
        window.location = "../index.html";
    }

   

    const res = await list();
    const tasks = document.querySelector(".tasks");
    res.forEach(element => {
        
        let card = document.createElement("div");
        card.setAttribute("class", "card")
        
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
       

        card.append(cardHeader);
        card.append(cardBody)

        tasks.append(card);
    });

    const btn = document.querySelector(".card-edit-btn");
    btn.addEventListener('click', () => {
        alert("click => ");
    });

})();








