(function() {

   if(localStorage.getItem("user") !== null){
    window.location = "pages/dashboard.html";
   }

   const form = document.querySelector("form");
   const email =  document.querySelector("[type='email']");
   const password = document.querySelector("[type='password']");
   const errorEmail =  document.querySelector("#errorEmail");
   const errorPassword =  document.querySelector("#errorPassword");
   const button = document.querySelector(".button");

   form.addEventListener("submit", (e) => {
    e.preventDefault();
    button.classList.add("button--loading");
    if(validate(email.value, password.value)){
        login(email.value, password.value);
    } 
    else {
        button.classList.remove("button--loading");
    }    
   });

   const validate = (email, password) => {
    var response = true;
    const emailExp = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
    if(email === undefined) {
        response = false;
        errorEmail.removeAttribute("hidden")
    }
    else if(email === null) {
        response = false;
        errorEmail.removeAttribute("hidden")
    }
    else if( email === '') {
        response = false;
        errorEmail.removeAttribute("hidden")
    }
    else if(! emailExp.test(email)) {
        response = false;
        errorEmail.removeAttribute("hidden", false)
        errorEmail.innerHTML = "El campo email no contiene un correo eléctronico válido";
    }              

    if(password.length <= 0){
        errorPassword.removeAttribute("hidden", false)
        response = false;
    }
    return response;
   }

   email.addEventListener("keyup", () => {
    errorEmail.setAttribute("hidden", true)
   });

   password.addEventListener("keyup", () => {
    errorPassword.setAttribute("hidden", true)
   });

})();










