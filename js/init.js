const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
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

    //1
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

//Gestion del carrito
function checkCart() {
  let cart = [];

  //Verifica si hay informacion en el localStorage(cart);
  /* Si no hay info. Trae un carrito con el ID de usuario proporcionado 
  en la letra del proyecto. Y se guarda en el localStorage.*/
  if (localStorage.getItem('cart') === null) {
    getJSONData(CART_INFO_URL)
      .then(response => {
        if (response.status === 'ok') {
          cart = response.data.articles;
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      });

    /* Si ya hay datos en el localStorage, 
    se obtienen y se parsean de nuevo a un array. */
  } else {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  return cart;
}


checkCart();


//addToCart
async function addToCart(articleID, categoryID) {
  articleID = parseInt(articleID);
  let cart = checkCart();
  let cartProduct = cart.find(p => (p.id === articleID));
  if (cartProduct) {//Si el producto existe

    cart = cart.map(article => {
      if (article.id === articleID) {
        article.count++;
      }
      return article;
    })

  } else {
    const response = await getJSONData(PRODUCTS_URL + categoryID + '.json');
    const product = response.data.products.find(p => (p.id === articleID));
    if (product) {
      const newArticle = {
        count: 1,
        currency: product.currency,
        id: product.id,
        image: product.image,
        name: product.name,
        unitCost: product.cost,
      }

      newArticle.count = 1;
      cart.push(newArticle);

    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));

}

//Notificacion addToCart
//const toastLiveExample = document.getElementById('liveToast');
//const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
let toastCounter = 0;
function addToast(article) {
  const toastContainer = document.getElementById('toastContainer');
  toastContainer.innerHTML += `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="toast-${toastCounter}">
        <div class="toast-header ">
            <i class='bx bx-cart-add'></i>
            <strong class="me-auto">Agregado al carrito</strong>
            <small class="text-body-secondary">just now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
         </div>
         <div class="toast-body row">
          <div class="col-3">
            <img class="w-100" src="${article.images[0]}" alt="${article.name}" />
          </div>
          
          <div class="col-8 d-flex justify-content-between">
            <p>${article.name}</p>
            <p>${article.currency} ${article.cost}</p>
          </div>
          <div class="col-12 totalPrice">
            

        </div>
  </div>
    `;
  console.log(article);
  const toastBody = document.getElementById(`toast-${toastCounter}`);
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastBody);
  toastBootstrap.show();
  toastCounter++;
}




