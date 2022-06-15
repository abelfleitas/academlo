const APIURL = "https://tasks-crud.academlo.com/api";

const button = document.querySelector(".button");

const login = (email,password)  => {
    axios.post(`${APIURL}/auth/login`, {email, password})
      .then(function (response) {
        saveStorage(response.data)
      })
      .catch(function (error) {
        showAlert(error.message);
        button.classList.remove("button--loading");
      });
}

const getUser = () => {
    const token = localStorage.getItem('token');
    axios.get(`${APIURL}/user`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(function (response) {
        button.classList.remove("button--loading");
        saveUserStorage(response.data)
      })
      .catch(function (error) {
        showAlert(error.message);
        button.classList.remove("button--loading");
      });
}


const list = async () => {
  let taskArray = [];
  const token = localStorage.getItem('token');
  await axios.get(`${APIURL}/tasks`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(function (response) {
      taskArray = response.data;
    })
    .catch(function (error) {
      showAlert(error.message);
    });
    return taskArray;
}

const listStatus = async () => {
  let statusArray = [];
  const token = localStorage.getItem('token');
  await axios.get(`${APIURL}/status`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(function (response) {
      statusArray = response.data;
    })
    .catch(function (error) {
      showAlert(error.message);
    });
    return statusArray;
}

const saveStorage = (response) => {
    localStorage.setItem("token", response);
    getUser();
}

const saveUserStorage = (response) => {
    localStorage.setItem("user", response);
    window.location = "../pages/dashboard.html"
}

const showAlert = (msj) => {
    alert(msj);
}

