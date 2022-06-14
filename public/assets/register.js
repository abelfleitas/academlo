(function() {

    if(localStorage.getItem("user") !== null){
     window.location = "pages/dashboard.html";
    }
 
    var form = document.querySelector("form");
    let name =  document.querySelector("[name='name']");
    let email =  document.querySelector("[name='email']");
    let password = document.querySelector("[name='password']");
    let confirmPassword = document.querySelector("[name='confirmPassword']");

    let errorName = document.querySelector("#errorName");
    let errorEmail =  document.querySelector("#errorEmail");
    let errorPassword =  document.querySelector("#errorPassword");
    let errorConfirmPassword =  document.querySelector("#errorConfirmPassword");
 
    form.addEventListener("submit", (e) => {
     e.preventDefault();
     if(validate(name.value, email.value, password.value, confirmPassword.value)) {
        console.log("not implemented");
         form.reset();
     }    
    });
 
    const validate = (name, email, password, confirmPassword) => {
     var response = true;
     const emailExp = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
     if(name.length <= 0) {
        errorName.removeAttribute("hidden")
     }  

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
     if(confirmPassword.length <= 0){
        errorConfirmPassword.removeAttribute("hidden", false)
        response = false;
     }
     else if(!password.match(confirmPassword)) {
        errorConfirmPassword.innerHTML = "El campo contraseña no coincide con el campo confirmar contraseña";
        errorConfirmPassword.removeAttribute("hidden", false)
        response = false;
     }
     return response;
    }
 
    name.addEventListener("keyup", () => {
     errorName.setAttribute("hidden", true)
    });

    email.addEventListener("keyup", () => {
     errorEmail.setAttribute("hidden", true)
    });
 
    password.addEventListener("keyup", () => {
     errorPassword.setAttribute("hidden", true)
    });

    confirmPassword.addEventListener("keyup", () => {
     errorConfirmPassword.setAttribute("hidden", true)
    });
 
 })();
 
 
 
 
 
 
 
 
 
 
 