const comentariosContainer = document.getElementById("containerComments");

function agregarcomentario(punt, coment){
    let infoUser = JSON.parse(localStorage.getItem('userData'));
    let userName = infoUser.user.userName;

    const comentarioDiv = document.createElement('div');
    comentarioDiv.className = "col-md-6"
    comentarioDiv.innerHTML = `
              <div class="card-body">
                <p>
                Usuario: ${userName}
                Fecha: ${new Date().toLocaleString()}
                Puntuación: ${punt}
                Comentario: ${coment}</p>
              </div>
            `;
      
    comentariosContainer.appendChild(comentarioDiv);
    document.getElementById('puntuacion').value = '';
    document.getElementById('Comentario').value = '';
};

function setProductID(id) {
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
        const productCommentURL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
        
        

        function productComments(comment) {
          const card = document.createElement("div");
          card.className = "col-md-6"
          card.innerHTML = `
              <div class="card-body">
                <p>
                Usuario: ${comment.user}
                Fecha: ${comment.dateTime}
                Puntuación: ${comment.score}
                Comentario: ${comment.description}</p>
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

      const enviar = document.getElementById("newComment");

     enviar.addEventListener("click", function() {
      let comentario = document.getElementById("Comentario").value;
      let puntuacion = document.getElementById("puntuacion").value;
      agregarcomentario(puntuacion,comentario);
     });
});