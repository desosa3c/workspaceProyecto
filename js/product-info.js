const comentariosContainer = document.getElementById("containerComments");
//1
function generarEstrellas(puntuacion) {
  const maxPuntuacion = 5;
  const estrellaLlena = `<span class="fa fa-star checked"></span>`;
  const estrellaVacia = `<span class="fa fa-star"></span>`;
  let estrellasLlenas = estrellaLlena.repeat(puntuacion);
  let estrellasVacias = estrellaVacia.repeat(maxPuntuacion - puntuacion);
  return estrellasLlenas + estrellasVacias;
};

//2
function setProductID(id) {
  localStorage.setItem('selectedProductID', id);
  window.location.href = 'product-info.html';
}

function productCardInfo(p, rl) {
  const card = document.createElement("div");
  card.className = "row mt-5"

  let imagesHTML = ''

  //Se agrega el carrusel de imagenes
  //Los detalles del producto, titulo, precio y descripcion [div id="productInfo"]
  card.innerHTML = `
  <div class="col-sm-12 col-lg-7">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${p.images[0]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${p.images[1]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${p.images[2]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${p.images[3]}" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden" >Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
    </div>
  </div>
  <div id="productInfo" class="col-sm-12 col-lg-5">
    
      <p>Categorias: <a class="linkProductInfo" href="categories.html">${p.category}</a></p>
      <h2 style="font-size: 6vh">${p.name}</h2>
      <p>${p.soldCount} vendidos</p>
      <p style="font-size: 2vh"> ${p.description}</p><br>
      
      <h3 style="font-size: 4vh">${p.currency} ${p.cost}</h3>
      <button type="button" class="btn btn-primary">Comprar <i class='bx bx-right-arrow-alt'></i></button>
      <button type="button" class="btn btn-outline-primary">Agregar al carro<i class='bx bx-cart-add'></i></button>
      <button type="button" class="btn btn-outline-danger"><i class='bx bxs-heart'  ></i></button>
      <br>
      <br>
      
      
    </div>
  </div>
  </div>
  <div class="col-md-6"id= "relatedProductsDiv">
        <h5 class="h5" >Productos similares:</h5>
        
         ${Array.isArray(rl) && rl.length > 0
          ? (() => {
         let productListHTML = '';
         rl.forEach((product) => {
          productListHTML += `
          <div id="relatedProduct">
          ${product.name}
          <br>
          <img src="${product.image}" alt="${product.name}" width="250">
          </div>
         `;
          });
          return productListHTML;
          })()
          : 'No hay productos similares'}
        </div>`
  /*
  .color1 { #295264 };
  .color2 { #fad9a6 };
  .color3 { #bd2f28 };
  .color4 { #89373d };
  .color5 { #142433 };

  */

  return card;
}

//3
function showProductInfo(product, related) {
  containerInfo.innerHTML = "";
  let pCard = productCardInfo(product, related);
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
        let relatedProducts = product.relatedProducts;
        console.log(relatedProducts)
        showProductInfo(product, relatedProducts);
        this.title = product.name
      }
    })
  const productCommentURL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;


  //4
  function productComments(comment) {
    const card = document.createElement("div");
    card.className = "col-md-6"
    card.innerHTML = `
              <div class="card-body">
                <p>
                @${comment.user}
                 - ${comment.dateTime}
                <br>
                ${generarEstrellas(comment.score)}
                <br>
                Comentario: <br> ${comment.description}</p>
              </div>
            `;
    return card;
  }

  fetch(productCommentURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar los comentarios: ${response.status}`);
      }
      return response.json();
    })
    .then(comments => {
      const commentsContainer = document.getElementById('containerComments');
      comments.forEach(comment => {
        const commentElement = productComments(comment);
        commentsContainer.appendChild(commentElement);
      });
    })
    .catch(error => {
      console.error(error);
    });

  //5
  function handleStarClick(score) {
    // Agrega la clase "checked" a la estrella seleccionada y a las anteriores
    stars.forEach((s, index) => {
      if (index < score) {
        s.classList.add("checked");
      } else {
        s.classList.remove("checked");
      }
    });
  }
  //6
  function agregarcomentario(punt, coment) {
    let infoUser = JSON.parse(localStorage.getItem('userData'));
    let userName = infoUser.user.userName;

    const comentarioDiv = document.createElement('div');
    comentarioDiv.className = "col-md-6"
    comentarioDiv.innerHTML = `
                  <div class="card-body">
                    <p>
                    @${userName}
                     - ${new Date().toLocaleString()}
                    <br>
                    ${generarEstrellas(punt)}
                    <br>
                    Comentario:<br> ${coment}</p>
                  </div>
                `;

    comentariosContainer.appendChild(comentarioDiv);
    document.getElementById('Comentario').value = '';
    handleStarClick(0);
  };
  //7
  const stars = document.querySelectorAll(".fa-star");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const score = parseInt(star.getAttribute("data-score"));
      handleStarClick(score);
    });
  });

  function cantidadestrellas() {
    let count = 0;
    stars.forEach((star) => {
      if (star.classList.contains("checked")) {
        count++;
      }
    });
    return count;
  };
  //8
  newComment.addEventListener("click", () => {
    let comentario = document.getElementById("Comentario").value;
    const starsSelected = cantidadestrellas();
    if (comentario.trim() === '' && starsSelected == 0) {
      alert("Por favor introduzca un comentario y una puntuacion")
    } else if (comentario.trim() === '') {
      alert("Por favor introduzca un comentario")
    } else if (starsSelected == 0) {
      alert("Por favor introduzca una puntuacion")
    } else {
      agregarcomentario(starsSelected, comentario);
    }
  });
});