const cartBodyContainer = document.getElementById('bodyCart');

function setProductID(id) {
    localStorage.setItem('selectedProductID', id);
    window.location.href = 'product-info.html';
    console.log(id);
  }
  
function createCartItem(article) {
    const body = document.createElement('tr');
    body.innerHTML = `<td class="col-2">
        <img class="img-fluid" src=${article.image} alt="producto" onclick="setProductID(${article.id})">
    </td>
    <td onclick="setProductID(${article.id})"> ${article.name} </td> 
    <td>${article.currency} ${article.unitCost}</td>
    <td>
        <div class="cantidad w-25">
            <input type="number" class="amount" name="amount" min="1" max="100" />
        </div>
    </td>
    <td>${article.currency} ${article.unitCost} </td>
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
