const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Chequeo que userData tenga contenido en localstorage;
let checkUser = function () {
  let infoUser = JSON.parse(localStorage.getItem('userData'));
  if (!infoUser) {
    alert('No estas logueado');
    window.location.href = ('./login.html');
  } else {
    //Agrego un enlace para acceder al perfil 'userName'
    let userName = infoUser.user.userName;
    let perfil = document.getElementById('perfil');

    perfil.innerHTML = '<div class="dropdown"><a class="btn btn-secondary dropdown-toggle" href="my-profile.html" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">'
      + userName + '</a><ul class="dropdown-menu" aria-labelledby="dropdownMenuLink"><li><a class="dropdown-item" href="cart.html">Mi carrito</a></li><li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li><li><a class="dropdown-item" href="login.html">Cerrar sesión</a></li><li><button onclick="switchTheme()" class="btn rounded-fill " id="btnSwitchTheme">Cambiar tema<i class="bx bxs-moon" id="dt-icon"></i></i></button></li></ul></div>'

  }



};
checkUser();

//Deslogueo
let logout = function () {
  localStorage.removeItem('userData');
  alert('Somos tus unicos amigos!!');
  window.location.href = './login.html';
}

//Cambiar a modo oscuro

const darkTheme = () => {
  document.querySelector('body').setAttribute('data-bs-theme', 'dark');
  document.querySelector('#dt-icon').setAttribute('class', 'bx bxs-sun')
  localStorage.setItem('theme', 'dark');
}

const lightTheme = () => {
  document.querySelector('body').setAttribute('data-bs-theme', 'light');
  document.querySelector('#dt-icon').setAttribute('class', 'bx bxs-moon');
  localStorage.setItem('theme', 'light');
}

const switchTheme = () => {
  document.querySelector('body').getAttribute('data-bs-theme') === 'light' ?
    darkTheme() : lightTheme();
}

if (localStorage.getItem('theme') === 'dark') {
  darkTheme();
} else {
  lightTheme()
}


/*

*/