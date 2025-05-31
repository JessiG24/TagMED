const modal = document.getElementById("modalChat");
const botonChat = document.querySelector(".chat-bot");
const cerrarChat = document.getElementById("cerrarChat");
const chatContenido = document.getElementById("chatContenido");
const chatInput = document.getElementById("chatInput");
const enviarChat = document.getElementById("enviarChat");

let estado = "inicio";

botonChat.addEventListener("click", () => {
  modal.style.display = "flex";
  resetearChat();
});



cerrarChat.addEventListener("click", () => {
  modal.style.display = "none";
  resetearChat();
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    resetearChat();
  }
});

function agregarMensaje(texto, tipo = "bot") {
  const div = document.createElement("div");
  div.classList.add("mensaje", tipo);
  div.innerHTML = texto;
  chatContenido.appendChild(div);
  chatContenido.scrollTop = chatContenido.scrollHeight;
}

function resetearChat() {
  estado = "inicio";
  chatContenido.innerHTML = '';
  agregarMensaje("Bienvenido a TagMED, ¿en qué puedo ayudarte hoy?<br>Escribe <strong>1</strong> si eres usuario, <strong>2</strong> si eres marca.");
}

enviarChat.addEventListener("click", manejarChat);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") manejarChat();
});

function manejarChat() {
  const texto = chatInput.value.trim();
  if (!texto) return;

  agregarMensaje(texto, "user");

  if (estado === "inicio") {
    if (texto === "1") {
      estado = "usuario";
      agregarMensaje(`Opciones:<br>1️⃣ Tengo problemas para iniciar sesión<br>2️⃣ No sé cómo subir las fotos en mi perfil<br>3️⃣ Otro`);
    } else if (texto === "2") {
      estado = "marca";
      agregarMensaje(`Opciones:<br>1️⃣ Tengo problemas para iniciar sesión<br>2️⃣ No sé cómo subir fotos de mi marca<br>3️⃣ ¿Cómo veo los comentarios?<br>4️⃣ ¿Cómo me registro?<br>5️⃣ Otro`);
    } else {
      agregarMensaje("Por favor escribe 1 si eres usuario o 2 si eres marca.");
    }
  }

  else if (estado === "usuario") {
    if (texto === "1") {
      agregarMensaje("Por favor digita tu correo:");
      estado = "usuario_correo";
    } else if (texto === "2") {
agregarMensaje(`<br>
<video width="100%" height="200" controls autoplay muted>
  <source src="imagenes/ensayo.mp4" type="video/mp4">
  Tu navegador no soporta este formato de video.
</video>`);

      estado = "final";
    } else if (texto === "3") {
      agregarMensaje("Por favor deja tu duda y nos pondremos en contacto contigo.");
      estado = "usuario_duda";
    } else {
      agregarMensaje("Opción no válida. Elige 1, 2 o 3.");
    }
  }

  else if (estado === "usuario_correo") {
    if (validarCorreo(texto)) {
      agregarMensaje("Se ha enviado una contraseña nueva al correo proporcionado.");
      estado = "final";
    } else {
      agregarMensaje("Por favor ingresa un correo válido.");
    }
  }

  else if (estado === "usuario_duda") {
    agregarMensaje("Gracias por tu mensaje. Nos pondremos en contacto contigo.");
    setTimeout(() => {
      modal.style.display = "none";
      resetearChat();
    }, 3000);
    estado = "final";
  }

  else if (estado === "marca") {
    if (texto === "1") {
      agregarMensaje("Por favor digita tu correo:");
      estado = "marca_correo";
    } else if (texto === "2") {
agregarMensaje(`<br>
<video width="100%" height="200" controls autoplay muted>
  <source src="imagenes/ensayo.mp4" type="video/mp4">
  Tu navegador no soporta este formato de video.
</video>`);
      estado = "final";
    }else if (texto === "3") {
agregarMensaje(`<br>
<video width="100%" height="200" controls autoplay muted>
  <source src="imagenes/ensayo.mp4" type="video/mp4">
  Tu navegador no soporta este formato de video.
</video>`);
      estado = "final"; 
      }else if (texto === "4") {
agregarMensaje(`<br>
<video width="100%" height="200" controls autoplay muted>
  <source src="imagenes/ensayo.mp4" type="video/mp4">
  Tu navegador no soporta este formato de video.
</video>`);
      estado = "final"; 
      }
    
    else if (texto === "5") {
      agregarMensaje("Por favor deja tu duda y nos pondremos en contacto contigo.");
      estado = "marca_duda";
    } else {
      agregarMensaje("Opción no válida. Elige entre 1 a 5.");
    }
  }

  else if (estado === "marca_correo") {
    if (validarCorreo(texto)) {
      agregarMensaje("Se ha enviado una contraseña nueva al correo proporcionado.");
      estado = "final";
    } else {
      agregarMensaje("Por favor ingresa un correo válido.");
    }
  }

  else if (estado === "marca_duda") {
    agregarMensaje("Gracias por tu mensaje. Nos pondremos en contacto contigo.");
    setTimeout(() => {
      modal.style.display = "none";
      resetearChat();
    }, 3000);
    estado = "final";
  }

  chatInput.value = "";
}
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}
