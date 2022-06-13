const APIURL = "https://tasks-crud.academlo.com/api";

const headers = {
    'Content-Type': 'application/json',
    'Origin':'http://localhost:3000',
}

const login = (email,password)  => {
    const button = document.querySelector(".button");
    fetch(APIURL+"/auth/login", {
        method: 'POST', 
        body: JSON.stringify({ email, password}),
        headers,
    }).then(res => res.text())
    .catch(error => {
        console.log(error);
        button.classList.remove("button--loading");
    })
    .then(response => {
        button.classList.remove("button--loading");
        saveStorage(response)
    });
}

const getUser = () => {
    console.log("getUser")
    fetch(APIURL+"/user", {
        method: 'GET', 
        headers,
    }).then(response => response.json())
      .catch(error => console.log("Error", error))
      .then(result => console.log("User =>",result));
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
    localStorage.setItem("token", response);
    getUser();
}

const saveUserStorage = (response) => {
    localStorage.setItem("user", response);
    window.location = "page/dashboard.html"
}

const showAlert = (msj) => {
    alert(msj);
}

console.log("Token ====>",localStorage.getItem("token"))
if(localStorage.getItem("token") !== null) {
    window.fetch = async (...args) => {
        let [resource, config ] = args;
        let token = localStorage.getItem("token");
        config.headers.Authorization = 'Bearer Token '+token;
        return resource;
    };
}