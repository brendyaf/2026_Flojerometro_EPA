// MOSTRAR / OCULTAR CONTRASEÑA

const passwordInput =
document.getElementById("contraseña");

const togglePassword =
document.getElementById("togglePassword");

const icon =
togglePassword.querySelector("i");

togglePassword.addEventListener("click", ()=>{

  if(passwordInput.type === "password"){

    passwordInput.type = "text";

    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");

  }else{

    passwordInput.type = "password";

    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");

  }

});

// BOTON CERRAR

document
.querySelector(".close-btn")
.addEventListener("click", ()=>{

  window.location.href="/";

});