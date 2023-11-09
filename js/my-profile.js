document.getElementById("botonGuardar").addEventListener("click", function() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    
    if (nombre === "") {
      document.getElementById("nombre").style.borderColor = "red";
      document.getElementById("nombre-error").style.display = "block";
    } else {
      document.getElementById("nombre").style.borderColor = "";
      document.getElementById("nombre-error").style.display = "none";
    }if (apellido === "") {
      document.getElementById("apellido").style.borderColor = "red";
      document.getElementById("apellido-error").style.display = "block";
    } else {
      document.getElementById("apellido").style.borderColor = "";
      document.getElementById("apellido-error").style.display = "none";
    }
  });
    
 

  // evento en el botón "Guardar Cambios".
  document.getElementById("botonGuardar").addEventListener("click", function() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const segundoNombre = document.getElementById("segundo-nombre").value;
    const segundoApellido = document.getElementById("segundo-apellido").value;
    const telefono = document.getElementById("telefono").value;

  
    if (nombre && apellido) {
        // Guarda los datos en el almacenamiento local.
        const userProfile = {
            nombre,
            "segundo-nombre": segundoNombre,
            apellido,
            "segundo-apellido": segundoApellido,
            telefono,
        };
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        alert("Datos guardados exitosamente.");

} 
  

});


//verifica si hay datos guardados en el almacenamiento local con la clave "formData" y llena los campos automaticamente
document.addEventListener("DOMContentLoaded", function() {
  // Llena el formulario con los datos guardados.
  const storedData = localStorage.getItem("formData");
  if (storedData) {
    const formData = JSON.parse(storedData);
    document.getElementById("nombre").value = formData.nombre;
    document.getElementById("segundo-nombre").value = formData.segundoNombre;
    document.getElementById("apellido").value = formData.apellido;
    document.getElementById("segundo-apellido").value = formData.segundoApellido;
    document.getElementById("email").value = formData.email;
    document.getElementById("telefono").value = formData.telefono;
  }
  
  const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    
    if (nombre === "") {
      document.getElementById("nombre").style.borderColor = "red";
      document.getElementById("nombre-error").style.display = "block";
    } else {
      document.getElementById("nombre").style.borderColor = "";
      document.getElementById("nombre-error").style.display = "none";
    }if (apellido === "") {
      document.getElementById("apellido").style.borderColor = "red";
      document.getElementById("apellido-error").style.display = "block";
    } else {
      document.getElementById("apellido").style.borderColor = "";
      document.getElementById("apellido-error").style.display = "none";
    }

  let img_defaut = "https://i.pinimg.com/736x/e5/91/dc/e591dc82326cc4c86578e3eeecced792.jpg";
  let file = document.getElementById("foto");
  let img = document.getElementById("img");

  if(localStorage.getItem("foto")){ // consulta si ya existe una img en el almacenamiento local
    img_defaut = localStorage.getItem("foto");
    img.src = img_defaut;
  }else{
    img.src = img_defaut;
  }
  file.addEventListener("change", e=>{ // evento de cambio de img
    if(e.target.files[0]){
      const reader = new FileReader();
      reader.onload = function(e){
        img.src = e.target.result;
        localStorage.setItem("foto",e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }else{
      img.src = img_defaut;
    }
  })
  // Guarda los datos en el almacenamiento local cuando se envía el formulario
  const form = document.getElementById("perfil-usuario");
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = {
      nombre: document.getElementById("nombre").value,
      segundoNombre: document.getElementById("segundo-nombre").value,
      apellido: document.getElementById("apellido").value,
      segundoApellido: document.getElementById("segundo-apellido").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  });
});
 
