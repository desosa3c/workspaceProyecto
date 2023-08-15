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
    perfil.innerHTML = '<a class="nav-link" href="my-profile.html">' + userName + '<i class="bx bx-user"></i></a>';
  }
};
checkUser();

//Deslogueo
let logout = function () {
  localStorage.removeItem('userData');
  alert('Somos tus unicos amigos!!');
  window.location.href = './login.html';
}




/*

*/