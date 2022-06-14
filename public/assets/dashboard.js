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
        cardhading.innerHTML = element.name;

        let hr = document.createElement("hr");

        cardHeader.append(cardhading);
        cardHeader.append(hr)
        card.append(cardHeader);

        //cardhading.setAttribute("text")

        tasks.append(card);
    });
})();








