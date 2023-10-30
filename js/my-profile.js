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
    }
    
    if (apellido === "") {
      document.getElementById("apellido").style.borderColor = "red";
      document.getElementById("apellido-error").style.display = "block";
    } else {
      document.getElementById("apellido").style.borderColor = "";
      document.getElementById("apellido-error").style.display = "none";
    }
    
    if (email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("email").style.borderColor = "red";
    } else {
      document.getElementById("email").style.borderColor = "";
    }
  });
