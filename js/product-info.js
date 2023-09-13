

//const productComentURL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;


function setProductID(id) {
    alert('ahoy');
    localStorage.setItem('selectedProductID', id);
    window.location.href = 'product-info.html';
}

function productCardInfo(p) {
    const card = document.createElement("div");
    card.className = "col-md-4"
    card.innerHTML = `
      <div class="card mb-4 shadow-sm custom-card cursor-active">
        <img
          class="bd-placeholder-img card-img-top"
          src="${p.images[0]}"
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

function showProductInfo(product) {
    containerInfo.innerHTML = "";
    let pCard = productCardInfo(product);
    containerInfo.appendChild(pCard);

}

document.addEventListener("DOMContentLoaded", function (e) {
    const productID = localStorage.getItem('selectedProductID');
    console.log(productID);
    const productInfoURL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    getJSONData(productInfoURL)
        .then(response => {
            console.log(response);
            if (response.status === "ok") {
                let product = response.data;
                showProductInfo(product);
            }
        })

});