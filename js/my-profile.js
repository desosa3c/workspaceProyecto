document.getElementById("botonGuardar").addEventListener("click", function() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;
    
    if (nombre === "") {
      document.getElementById("nombre").style.borderColor = "red";
    } else {
      document.getElementById("nombre").style.borderColor = "";
    }
    
    if (apellido === "") {
      document.getElementById("apellido").style.borderColor = "red";
    } else {
      document.getElementById("apellido").style.borderColor = "";
    }
    
    if (email === "") {
      document.getElementById("email").style.borderColor = "red";
    } else {
      document.getElementById("email").style.borderColor = "";
    }
  });
