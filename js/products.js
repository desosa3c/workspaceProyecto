const autosURL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const productContainer = document.getElementById("productContainer");

function productCard(p) {
    const card = document.createElement("div");
    card.className = "col-md-4"
    card.innerHTML = `
    <div class="card mb-4 shadow-sm custom-card cursor-active">
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

getJSONData(autosURL)
    .then(function (response) {
        if (response.status === "ok") {
            let products = response.data.products;
            products.forEach(element => {
                let pCard = productCard(element);
                productContainer.appendChild(pCard);
            });
        }
    });
