const cartBodyContainer = document.getElementById('bodyCart');
let arraysubtotal = [];
let arrayindice = [];
let arraytotal = [];
function setProductID(id) {
    localStorage.setItem('selectedProductID', id);
    window.location.href = 'product-info.html';
}

function createCartItem(article, indice) {
    const body = document.createElement('tr');
    body.innerHTML = `<td class="col-2">
        <img class="img-fluid" src=${article.image} alt="producto" onclick="setProductID(${article.id})">
    </td>
    <td onclick="setProductID(${article.id})"> ${article.name} </td> 
    <td>${article.currency} ${article.unitCost}</td>
    <td>
        <div class="cantidad w-25">
            <input type="number" class="amount" name="amount" min="1" max="100" id="num-cant-prod-${indice}"/>
        </div>
    </td>
    <td id="subtotal-${indice}">${article.currency} ${article.unitCost} </td>
    <td><button class="btn btn-primary" onclick="removeItem(${indice})">ELIMINAR</button></td>`;
    return body;
}

//funcion para eliminar el artículo y actualiza el almacenamiento local 
function removeItem(index) {
    const cart = checkCart();
    if (cart !== null && index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        clearCartUI();
        showCart();
    }
}

//clearCartUI limpia la interfaz de usuario antes de volver a mostrar el carrito actualizado.
function clearCartUI() {
    while (cartBodyContainer.firstChild) {
        cartBodyContainer.removeChild(cartBodyContainer.firstChild);
    }
}

//Muestra los articulos del carrito.
//Checkea que el carrito no devuelva null.
/* Recorre cada articulo y crea una fila 
para cada articulo. */
function showCart() {
    const cart = checkCart();
    if (cart !== null) {
        let largo = cart.length;
        for (let i = 0; i < largo; i++) {
            arrayindice.push(i);
            arraysubtotal.push(cart[i].unitCost);
            arraytotal.push(0);
            const cartItem = createCartItem(cart[i], i);
            cartBodyContainer.appendChild(cartItem); //agrega la fila al contenedor.
        };
    }
    let largo = arrayindice.length;
    for (let i = 0; i < largo; i++) {
        let btn = document.getElementById(`num-cant-prod-${i}`);
        btn.addEventListener("input", () => {
            let tb = document.getElementById(`subtotal-${i}`);
            let p = document.getElementById("total_txt")

            let cantidad = arraysubtotal[i] * (btn.value);
            arraytotal[i] = cantidad;
            let total = 0;
            arraytotal.forEach(element => {
                total +=element;
            });
            p.textContent = `USD ${total}`;
            tb.textContent = `USD ${cantidad}`;
        });
    }
}
//calcula el total sumando el costo unitario de todos los productos en el carrito 
function updateTotal() {
    const cart = checkCart();
    if (cart !== null) {
        let total = 0;
        cart.forEach(item => {
            total += item.unitCost;
        });
        const totalElement = document.getElementById('total_txt');
        totalElement.textContent = `USD ${total}`;
    }
}

//Muestro el carrito luego de que cargue el DOM.
document.addEventListener('DOMContentLoaded', function () {
    showCart();
    updateTotal()
});
