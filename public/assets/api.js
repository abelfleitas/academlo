const APIURL = "https://tasks-crud.academlo.com/api";

const headers = {
    'Content-Type': 'application/json',
    'Origin':'http://localhost',
    'Access-Control-Allow-Origin': '*'
}

const login = (email,password)  => {
    const button = document.querySelector(".button");
    fetch(APIURL+"/auth/login", {
        method: 'POST', 
        body: JSON.stringify({ email, password}),
        headers,
    })
    .then(res => res.text())
    .catch(error => {
        button.classList.remove("button--loading");
        console.log(error);
        showAlert(error);
    })
    .then(response => {
        button.classList.remove("button--loading");
        saveStorage(response);
    })
}

const getUser = (token) => {
    headers.Authorization = 'Bearer '+token;
    fetch(APIURL+"/user", {
        method: 'GET', 
        headers,
    })
    .then(res => res.json())
    .catch(error => showAlert(error))
    .then(response => saveStorage(response))
}

const add = (data) => {
    fetch(APIURL, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers,
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

const remove = (id) => {
    fetch(APIURL+"/tasks/"+id, {
        method: 'DELETE', 
        headers,
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}


const update = (id,name, description) => {
    fetch(APIURL+"/tasks/"+id, {
        method: 'PUT', 
        body: JSON.stringify({name,description}),
        headers,
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}


const list = () => {
    fetch(APIURL+"/tasks", {
        method: 'GET', 
        headers,
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

const read = (id) => {
    fetch(APIURL+"/tasks/"+id, {
        method: 'GET', 
        headers,
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

const setStatus = (id,status) => {
    fetch(APIURL+"/tasks/"+id+"/status/"+status, {
        method: 'GET', 
        headers,
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
};

const saveStorage = (response) => {
    console.log("TTTken=> "+response)
    if(localStorage.getItem("token") !== 'Credenciales incorrectas') {
        localStorage.setItem("token", response);
        getUser(response);
    }
}

const saveUserStorage = (response) => {
    localStorage.setItem("user", response);
    window.location = "../page/dashboard.html"
}

const showAlert = (msj) => {
    alert(msj);
}

console.log("Token ====>", localStorage.getItem("token"))
