const cartBodyContainer = document.getElementById('bodyCart');
let arraysubtotal = [];
let arrayindice = [];
let arraytotal = [];
let envio_porcentaje = 0;
function setProductID(id) {
    localStorage.setItem('selectedProductID', id);
    window.location.href = 'product-info.html';
}

function createCartItem(article, indice, dollarCost) {
    const body = document.createElement('tr');

    body.innerHTML = `<td class="col-2">
        <img class="img-fluid" src=${article.image} alt="producto" onclick="setProductID(${article.id})">
    </td>
    <td onclick="setProductID(${article.id})"> ${article.name} </td> 
    <td>USD ${dollarCost}</td>
    <td>
        <div class="cantidad w-25">
            <input type="number" class="amount" name="amount" value="${article.count}" min="1" max="100" id="num-cant-prod-${indice}"/>
        </div>
    </td>
    <td id="subtotal-${indice}">USD ${dollarCost * article.count} </td>
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
        let dollarCost;
        for (let i = 0; i < largo; i++) {
            if (cart[i].currency === "UYU") {
                dollarCost = cart[i].unitCost / 40;
            } else {
                dollarCost = cart[i].unitCost;
            };
            arrayindice.push(i);
            console.log(dollarCost);
            arraysubtotal.push(dollarCost);
            arraytotal.push(dollarCost);
            const cartItem = createCartItem(cart[i], i, dollarCost);
            cartBodyContainer.appendChild(cartItem); //agrega la fila al contenedor.
        };
        console.log(arraysubtotal);
    }
    let largo = arrayindice.length;

    for (let i = 0; i < largo; i++) {
        let btn = document.getElementById(`num-cant-prod-${i}`);
        console.log(i);
        btn.addEventListener("input", () => {
            let tb = document.getElementById(`subtotal-${i}`);
            let p = document.getElementById("total_txt_2")

            let costo_envioElement = document.getElementById('costo_envio');
            let totalElement = document.getElementById('total_txt');

            let cantidad = arraysubtotal[i] * (btn.value);
            arraytotal[i] = cantidad;
            let total = 0;
            console.log(arraytotal);
            arraytotal.forEach(element => {
                total += element;
            });

            let costo_envio = total * envio_porcentaje;
            let totalyenvio = costo_envio + total;
            p.textContent = `${cart[i].currency} ${total}`;
            tb.textContent = `${cart[i].currency} ${cantidad}`;

            totalElement.textContent = `USD ${totalyenvio}`;
            costo_envioElement.textContent = `USD ${costo_envio}`;

        });
    }
}
//calcula el total sumando el costo unitario de todos los productos en el carrito 
function updateTotal() {
    const cart = checkCart();
    if (cart !== null) {
        let total = 0;
        let dollarCost;
        cart.forEach(item => {
            let i = 0;
            if (item.currency === "UYU") {
                dollarCost = item.unitCost / 40;
            } else {
                dollarCost = item.unitCost;
            };
            while (dollarCost != arraysubtotal[i]) {
                i++;
            }
            if (i < arraysubtotal.length) {
                let btn = document.getElementById(`num-cant-prod-${i}`);
                total += dollarCost * btn.value;
            } else {
                total += dollarCost;
            }
            console.log(total);
        });
        if (envio_porcentaje !== 0) {
            let totalsinenvioElement = document.getElementById('total_txt_2');
            let costo_envioElement = document.getElementById('costo_envio');
            let totalElement = document.getElementById('total_txt');
            let costo_envio = total * envio_porcentaje;
            console.log(costo_envio);
            let totalyenvio = costo_envio + total;

            totalElement.textContent = `USD ${totalyenvio}`;
            costo_envioElement.textContent = `USD ${costo_envio}`;
            totalsinenvioElement.textContent = `USD ${total}`;
        }
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
    const modalPagoLabel = document.getElementById("modalPagoLabel");
    let formaDePagoSeleccionada = "";

    envioPremium.addEventListener("input", () => {
        envio_porcentaje = 0.15;
        updateTotal();
    });

    envioExpress.addEventListener("input", () => {
        envio_porcentaje = 0.07;
        updateTotal();
    });

    envioStandard.addEventListener("input", () => {
        envio_porcentaje = 0.05;
        updateTotal();
    });

    function mostrarCamposFormaPago() {
        if (tarjetaCredito.checked) {
            datosTarjeta.style.display = "block";
            datosTransferencia.style.display = "none";
            fechaVencimiento.style.display = "block";
            formaDePagoSeleccionada = "tarjeta";
        } else if (transferenciaBancaria.checked) {
            datosTarjeta.style.display = "none";
            datosTransferencia.style.display = "block";
            fechaVencimiento.style.display = "none";
            formaDePagoSeleccionada = "transferencia";
        }
    }

    tarjetaCredito.addEventListener("change", mostrarCamposFormaPago);
    transferenciaBancaria.addEventListener("change", mostrarCamposFormaPago);
    botonGuardar.addEventListener("click", function () {
        let validacionCorrecta = true;
        if (formaDePagoSeleccionada === "tarjeta") {
            const numeroTarjeta = document.getElementById("numeroTarjeta");
            const errorMensaje = document.getElementById("errorRequisitoNum");
            if (numeroTarjeta.value === "" || numeroTarjeta.value.length < 19 || !/^[0-9-]+$/.test(numeroTarjeta.value)) {
                numeroTarjeta.classList.add("error");
                errorMensaje.style.display = "block";
                validacionCorrecta = false;
            } else {
                numeroTarjeta.classList.remove("error");
                errorMensaje.style.display = "none";
            }
        } else if (formaDePagoSeleccionada === "transferencia") {
            const numeroCuenta = document.getElementById("numeroCuenta");
            const errorRequisitoCuenta = document.getElementById("errorRequisitoCuenta");
            if (numeroCuenta.value === "" || !/^\d+$/.test(numeroCuenta.value) || numeroCuenta.value.length < 20) {
                numeroCuenta.classList.add("error");
                errorRequisitoCuenta.style.display = "block";
                validacionCorrecta = false;
            } else {
                numeroCuenta.classList.remove("error");
                errorRequisitoCuenta.style.display = "none";
            }
        }

        // actualiza el texto solo si todas las validaciones son correctas
        if (validacionCorrecta) {
            if (formaDePagoSeleccionada === "tarjeta") {
                console.log("Se seleccionó la forma de pago: Tarjeta de Crédito");
                modalPagoLabel.textContent = "Tarjeta de Crédito";
                const cerrar = document.getElementById("Cerrar")
                cerrar.click()
                appendAlert('Método de pago seleccionado aprobado', 'success')
            } else if (formaDePagoSeleccionada === "transferencia") {
                console.log("Se seleccionó la forma de pago: Transferencia Bancaria");
                modalPagoLabel.textContent = "Transferencia Bancaria";
                const cerrar = document.getElementById("Cerrar")
                cerrar.click()
                appendAlert('Método de pago seleccionado aprobado', 'success')
            }
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


//validaciones para comprar
function validarTipoEnvio() {
    const premium = document.getElementById("envioPremium").checked;
    const express = document.getElementById("envioExpress").checked;
    const standard = document.getElementById("envioStandard").checked;
    const texto = document.getElementById("textoTipoEnvio")

    if ((premium && !express && !standard) || (!premium && express && !standard) || (!premium && !express && standard)) {
        texto.innerHTML = " ";
        return true;
    } else { texto.classList.add("text-danger") }
}
function validarDatosEnvio() {
    var direccion = document.getElementById('direccion').value;
    var esquina = document.getElementById('esquina').value;
    var barrio = document.getElementById('barrio').value;

    if (direccion === '' || esquina === '' || barrio === '') {
        const error = document.getElementById("validacionDatos")
        error.classList.add("was-validated");
        return false
    } else {
        return true
    }
}

function validarTipoCompra() {
    const modal = document.getElementById("modalPagoLabel")
    if (modal.textContent.trim() === "Seleccionar Forma de Pago") {
        appendAlert('Debe seleccionar una forma de pago.', 'danger')
        return false
    } else {
        return true
    }
}

function validarCantidad() {
    const cart = checkCart();
    if (cart !== null) {
        for (let i = 0; i < cart.length; i++) {
            let btn = document.getElementById(`num-cant-prod-${i}`);
            if (btn.value <= 0) {
                appendAlert('No es posible completar su compra, revise su carrito.', 'danger')
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

//estilos d las alertas 
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
function appendAlert(message, type) {
    const wrapper = document.createElement('div');
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type} alert-dismissible`;
    alertElement.role = 'alert';

    alertElement.innerHTML = [
        `<div>${message}</div>`,
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    ].join('');

    wrapper.appendChild(alertElement);
    alertPlaceholder.appendChild(wrapper);

    // Configurar un temporizador para eliminar automáticamente la alerta
    setTimeout(() => {
        alertPlaceholder.removeChild(wrapper);
    }, 3000);
}

//validacion final con la confirmacion de compra 
function validarCompra() {
    validarTipoEnvio()
    validarDatosEnvio()
    validarCantidad()
    validarDatosEnvio()
    validarTipoCompra()

    const carritoVacio = document.getElementById('bodyCart').childElementCount === 0;
    
    if (validarTipoEnvio() && validarDatosEnvio() && validarTipoCompra() && validarCantidad()) {
        appendAlert('¡Has comprado con éxito!', 'success')
    } else {
        appendAlert('Compra invalida, rellene todos los campos. ', 'danger')
    } if (carritoVacio) {
        appendAlert('El carrito de compras está vacío. Agrega al menos un artículo antes de confirmar la compra.', 'danger');
    }
}
