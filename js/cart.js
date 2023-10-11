const cartBodyContainer = document.getElementById('bodyCart');

function createCartItem(article) {
    const body = document.createElement('tr');
    body.innerHTML = `<td class="col-2">
        <img class="img-fluid" src="/img/car1.jpg" alt="producto">
    </td>
    <td><a class="titleLink" href="/product-info.html">${article.name}</a></td>
    <td>${article.currency} ${article.unitCost}</td>
    <td>
        <div class="cantidad w-25">
            <input type="number" class="amount" name="amount" min="1" max="100" />
        </div>
    </td>
    <td>${article.currency} 34.000</td>
    <td><button class="btn btn-primary">ELIMINAR</button></td>`;

    return body;
}

//Muestra los articulos del carrito.
//Checkea que el carrito no devuelva null.
/* Recorre cada articulo y crea una fila 
para cada articulo. */
function showCart() {
    const cart = checkCart();
    if (cart !== null) {
        console.log(cart);
        cart.forEach((article) => {
            const cartItem = createCartItem(article);
            cartBodyContainer.appendChild(cartItem); //agrega la fila al contenedor.
        });
    }
}

//Muestro el carrito luego de que cargue el DOM.
document.addEventListener('DOMContentLoaded', function () {

    showCart();

});
