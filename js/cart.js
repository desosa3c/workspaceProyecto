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
            <input type="number" class="amount" name="amount" value="${article.count}" min="1" max="100" id="num-cant-prod-${indice}"/>
        </div>
    </td>
    <td id="subtotal-${indice}">${article.currency} ${article.unitCost * article.count} </td>
    <td><button class="btn btn-primary" onclick="removeItem(${indice})">ELIMINAR</button></td>`;
    return body;
}

//funcion para eliminar el artículo y actualiza el almacenamiento local 
function removeItem(index) {
    const cart = checkCart();
    if (cart !== null && index >= 0 && index < cart.length) {
        cart.splice(index, 1)[0];
        localStorage.setItem('cart', JSON.stringify(cart));
        clearCartUI();
        showCart();
        updateTotal();
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
    console.log(cart);
    if (cart !== null) {
        let largo = cart.length;
        arrayindice = [];
        arraysubtotal = [];
        arraytotal = [];
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
        console.log(i);
        btn.addEventListener("input", () => {
            let tb = document.getElementById(`subtotal-${i}`);
            let p = document.getElementById("total_txt")

            let cantidad = arraysubtotal[i] * (btn.value);
            arraytotal[i] = cantidad;
            let total = 0;
            arraytotal.forEach(element => {
                total += element;
            });
            p.textContent = `${cart[i].currency} ${total}`;
            tb.textContent = `${cart[i].currency} ${cantidad}`;
        });
    }
}
//calcula el total sumando el costo unitario de todos los productos en el carrito 
function updateTotal() {
    const cart = checkCart();
    if (cart !== null) {
        let total = 0;
        let currency = "USD";
        cart.forEach(item => {
            let i = 0;
            while (item.unitCost != arraysubtotal[i]) {
                i++;
            }
            if (i < arraysubtotal.length) {
                let btn = document.getElementById(`num-cant-prod-${i}`);
                total += item.unitCost * btn.value;
            } else {
                total += item.unitCost;
            }
            console.log(total);
            currency = item.currency;
        });
        const totalElement = document.getElementById('total_txt');
        totalElement.textContent = `${currency} ${total}`;
    }
}

//Modal de forma de pago
document.addEventListener("DOMContentLoaded", function () {
    const tarjetaCredito = document.getElementById("tarjetaCredito");
    const transferenciaBancaria = document.getElementById("transferenciaBancaria");
    const datosTarjeta = document.getElementById("datosTarjeta");
    const datosTransferencia = document.getElementById("datosTransferencia");
    const fechaVencimiento = document.getElementById("fechaVencimiento");
    const botonGuardar = document.querySelector("#modalPago .btn-primary");
    const modalPagoLabel = document.getElementById("modalPagoLabel"); // Cambia el ID a modalPagoLabel


    function mostrarCamposFormaPago() {
        if (tarjetaCredito.checked) {
            datosTarjeta.style.display = "block";
            datosTransferencia.style.display = "none";
            fechaVencimiento.style.display = "block";
            formaDePagoSeleccionada = "tarjeta"; // Actualiza la variable          
        } else if (transferenciaBancaria.checked) {
            datosTarjeta.style.display = "none";
            datosTransferencia.style.display = "block";
            fechaVencimiento.style.display = "none";
            formaDePagoSeleccionada = "transferencia"; // Actualiza la variable
        }
    }

    tarjetaCredito.addEventListener("change", mostrarCamposFormaPago);
    transferenciaBancaria.addEventListener("change", mostrarCamposFormaPago);
    botonGuardar.addEventListener("click", function () {
        if (formaDePagoSeleccionada === "tarjeta") {
            console.log("Se seleccionó la forma de pago: Tarjeta de Crédito");
            modalPagoLabel.textContent = "Tarjeta de Crédito"; // Actualiza el texto
        } else if (formaDePagoSeleccionada === "transferencia") {
            console.log("Se seleccionó la forma de pago: Transferencia Bancaria");
            modalPagoLabel.textContent = "Transferencia Bancaria"; // Actualiza el texto
        }
    });


});

$('#modalPago').on('shown.bs.modal', function () {
    // Al cambiar la opción de forma de pago
    $('input[name="formaPago"]').change(function () {
        const formaPago = this.value;
        const datosTarjeta = document.getElementById("datosTarjeta");
        const datosTransferencia = document.getElementById("datosTransferencia");

        if (formaPago === "tarjeta") {
            datosTarjeta.style.display = "block";
            datosTransferencia.style.display = "none";
        } else if (formaPago === "transferencia") {
            datosTarjeta.style.display = "none";
            datosTransferencia.style.display = "block";
        }
    });

});

// Al hacer clic en el botón "Guardar" dentro del modal de forma de pago
$('#modalPago').on('click', '.btn-primary', function () {
    const formaPago = document.querySelector('input[name="formaPago"]:checked');


    if (formaPago) {
        const formaPagoSeleccionada = formaPago.value;
        if (formaPagoSeleccionada === "tarjeta") {
            const numeroTarjeta = document.getElementById("numeroTarjeta");
            const codigoTarjeta = document.getElementById("codigoTarjeta");
            const errorFecha = document.getElementById("errorFecha")
            const errorMensaje = document.getElementById("errorRequisitoNum");
            const errorMensajeCod = document.getElementById("errorRequisitoCod");
            const errorMensajeCuenta = document.getElementById("errorRequisitoCuenta")

            //Marca en rojo los campos vacíos
            if (numeroTarjeta.value === "" || numeroTarjeta.value.length < 19 || !/^[0-9-]+$/.test(numeroTarjeta.value)) {
                numeroTarjeta.classList.add("error");
                errorMensaje.style.display = "block";
                return;
            } else {
                numeroTarjeta.classList.remove("error");
                errorMensaje.style.display = "none";

            }
            if (codigoTarjeta.value === "" || codigoTarjeta.value.length < 3 || !/^\d+$/.test(codigoTarjeta.value)) {
                codigoTarjeta.classList.add("error");
                errorMensajeCod.style.display = "block";
                return;
            } else {
                codigoTarjeta.classList.remove("error");
                errorMensajeCod.style.display = "none";
            }

             if (!inputFecha) {
                errorFecha.style.display = "block";
              } else {
                errorFecha.style.display = "none";
              }

        } else if (formaPagoSeleccionada === "transferencia") {
            const numeroCuenta = document.getElementById("numeroCuenta");

            if (numeroCuenta.value === "" || !/^\d+$/.test(numeroCuenta.value) || numeroCuenta.value.length < 20) {
                numeroCuenta.classList.add("error");
                errorRequisitoCuenta.style.display = "block";
                return;
            } else {
                numeroCuenta.classList.remove("error")
                errorRequisitoCuenta.style.display = "none";
            }
        }
    }
    $('#modalPago').modal('hide');
});


// Guión cada 4 digitos y limita la cantidad de caracteres
const numeroTarjeta = document.getElementById("numeroTarjeta");

numeroTarjeta.addEventListener("input", function () {

    let formattedValue = numeroTarjeta.value.replace(/-/g, "");
    if (formattedValue.length > 16) {
        formattedValue = formattedValue.slice(0, 16);
    }
    const groups = [];
    for (let i = 0; i < formattedValue.length; i += 4) {
        groups.push(formattedValue.slice(i, i + 4));
    }
    numeroTarjeta.value = groups.join('-');
});

//Muestro el carrito luego de que cargue el DOM.
document.addEventListener('DOMContentLoaded', function () {
    showCart();
    updateTotal();
});


//Limito la cantidad de numeros que se ingresan en los inputs de métodos de pago.
const inputSecurityCode = document.getElementById('codigoTarjeta');
inputSecurityCode.addEventListener('input', (e) => { limitLength(e, 4) });

function limitLength(e, length) {
    if (e.target.value.length > length) {
        e.target.value = e.target.value.slice(0, length);
    }

}
