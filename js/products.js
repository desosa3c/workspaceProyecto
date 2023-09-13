const catID = localStorage.getItem('catID');
const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
const productContainer = document.getElementById("productContainer");
const ORDER_ASC = "asc";
const ORDER_DESC = "desc";
const ORDER_BY_PROD_REL = "Rel.";
let currentProductsArray = [];
let currentSortCriteria = "asc";
let minPrice = undefined;
let maxPrice = undefined;
//agregar un onclick='setproducts(${product.ID})'
function productCard(p) {
  const card = document.createElement("div");
  card.className = "col-md-4"
  card.innerHTML = `
    <div class="card mb-4 shadow-sm custom-card cursor-active"  >
      <img
        class="bd-placeholder-img card-img-top"
        src="${p.image}"
        alt="${p.name}"
      />
      <h3 class="m-3">${p.name}</h3>
      <div class="card-body">
        <p class="card-text">
          ${p.description}<br>
          Precio: ${p.currency} ${p.cost}<br>
          Unidades vendidas: ${p.soldCount}
        </p>
      </div>
    </div>
    `;
  return card;
}

function sortProducts(array) {
  let result = [];
  if (currentSortCriteria === ORDER_ASC) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) { return -1; }
      if (a.cost > b.cost) { return 1; }
      return 0;
    });
  } else if (currentSortCriteria === ORDER_DESC) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) { return -1; }
      if (a.cost < b.cost) { return 1; }
      return 0;
    });
  } else if (currentSortCriteria === ORDER_BY_PROD_REL) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) { return -1; }
      if (aCount < bCount) { return 1; }
      return 0;
    });
  }

  return result;
}

function showProductsList(arrayproduct) {
  productContainer.innerHTML = "";
  arrayproduct.forEach(element => {
    let pCard = productCard(element);

    pCard.addEventListener('click', function () {
      setProductID(element.id);
    });

    productContainer.appendChild(pCard);
  });
  console.log(arrayproduct);
}

function sortAndShowProducts(criteria, array) {
  currentSortCriteria = criteria;


  showProductsList(sortProducts(array));
}

function filterAndShowProducts() {
  let filteredArray = currentProductsArray.filter(product => {
    if ((minPrice === undefined || minPrice === "" || parseInt(minPrice) <= product.cost) &&
      (maxPrice === undefined || maxPrice === "" || parseInt(maxPrice) >= product.cost)) {
      return true;
    }
    return false;
  });

  sortAndShowProducts(currentSortCriteria, filteredArray);
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(productsUrl)
    .then(function (response) {
      if (response.status === "ok") {
        currentProductsArray = response.data.products;
        showProductsList(currentProductsArray);
      }
    });

  document.getElementById("filterPrice").addEventListener("click", function () {
    minPrice = document.getElementById("rangeFilterPriceMin").value;
    maxPrice = document.getElementById("rangeFilterPriceMax").value;
    filterAndShowProducts();
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    filterAndShowProducts();
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC, currentProductsArray);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC, currentProductsArray);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_REL, currentProductsArray);
  });

});

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(productsUrl).then(function (response) {
    if (response.status === "ok") {
      currentProductsArray = response.data.products;
      showProductsList(currentProductsArray);
    }
  });

  // Obtén el elemento de búsqueda por su ID
  const searchInput = document.getElementById("searchInput");

  // Agrega un evento input al campo de búsqueda
  searchInput.addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const filteredArray = currentProductsArray.filter((product) => {
      // Filtra productos por título y descripción
      const title = product.name.toLowerCase();
      const description = product.description.toLowerCase();
      return title.includes(searchText) || description.includes(searchText);
    });

    // Muestra la lista filtrada
    showProductsList(filteredArray);
  });



});

