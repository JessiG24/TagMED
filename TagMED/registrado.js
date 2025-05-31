const btnIniciarSesion = document.querySelector('.iniciar-sesion');
const btnRegistrarse = document.querySelector('.registrarse');

let registrado = {}; 

function crearFondoModal() {
    const fondo = document.createElement('div');
    fondo.classList.add('fondo-modal');
    fondo.style.position = 'fixed';
    fondo.style.top = '0';
    fondo.style.left = '0';
    fondo.style.width = '100vw';
    fondo.style.height = '100vh';
    fondo.style.backgroundColor = 'rgba(0,0,0,0.6)';
    fondo.style.display = 'flex';
    fondo.style.justifyContent = 'center';
    fondo.style.alignItems = 'center';
    fondo.style.zIndex = '1000';
    return fondo;
}

function cerrarModal(fondo) {
    document.body.removeChild(fondo);
}

function aplicarEstilosFormulario(form) {
    form.style.backgroundColor = 'white';
    form.style.padding = '20px';
    form.style.borderRadius = '12px';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '10px';
    form.style.width = '300px';
    form.style.boxShadow = '0 0 15px rgba(0,0,0,0.3)';
    form.querySelectorAll('input, button').forEach(el => {
        el.style.padding = '10px';
        el.style.borderRadius = '8px';
        el.style.border = '1px solid #ccc';
    });
    form.querySelectorAll('button').forEach(btn => {
        btn.style.backgroundColor = '#2ECC71';
        btn.style.color = 'white';
        btn.style.fontWeight = 'bold';
        btn.style.cursor = 'pointer';
    });
}

function mostrarFormularioRegistro() {
    const fondo = crearFondoModal();

    const form = document.createElement('form');
    form.innerHTML = `
        <h2 style="text-align:center;">Registro de usuario</h2>
        <input type="text" id="nombre" placeholder="Nombre completo" required>
        <input type="email" id="correo" placeholder="Correo electrónico" required>
        <input type="tel" id="telefono" placeholder="Teléfono" required>
        <input type="password" id="contrasena" placeholder="Contraseña" required>
        <input type="password" id="confirmar" placeholder="Confirmar contraseña" required>
        <button type="submit">Registrarse</button>
        <button type="button" id="cerrarRegistro">Cancelar</button>
    `;

    aplicarEstilosFormulario(form);
    fondo.appendChild(form);
    document.body.appendChild(fondo);

    form.querySelector('#cerrarRegistro').addEventListener('click', () => cerrarModal(fondo));

    form.addEventListener('submit', e => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const contrasena = document.getElementById('contrasena').value;
        const confirmar = document.getElementById('confirmar').value;

        if (contrasena !== confirmar) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        registrado = {
            nombre,
            correo,
            telefono,
            contrasena
        };

        alert("¡Registro exitoso! Bienvenido a nuestra comunidad TAGMED");
        cerrarModal(fondo);
    });
}

function mostrarFormularioLogin() {
    const fondo = crearFondoModal();

    const form = document.createElement('form');
    form.innerHTML = `
        <h2 style="text-align:center;">Iniciar sesión</h2>
        <input type="email" id="login-correo" placeholder="Correo electrónico" required>
        <input type="password" id="login-contrasena" placeholder="Contraseña" required>
        <button type="submit">Ingresar</button>
        <button type="button" id="cerrarLogin">Cancelar</button>
    `;

    aplicarEstilosFormulario(form);
    fondo.appendChild(form);
    document.body.appendChild(fondo);

    form.querySelector('#cerrarLogin').addEventListener('click', () => cerrarModal(fondo));

    form.addEventListener('submit', e => {
        e.preventDefault();
        const correoLogin = document.getElementById('login-correo').value;
        const contrasenaLogin = document.getElementById('login-contrasena').value;

        if (!registrado.correo || correoLogin !== registrado.correo) {
            const respuesta = confirm("Usuario no registrado, por favor regístrese");
            cerrarModal(fondo);
            if (respuesta) mostrarFormularioRegistro();
        } else if (contrasenaLogin !== registrado.contrasena) {
            alert("Contraseña incorrecta.");
        } else {
            alert("Inicio de sesión exitoso. ¡Bienvenido!");
            cerrarModal(fondo);
            window.location.href = "planes.html";

        }
    });
}

btnIniciarSesion.addEventListener('click', mostrarFormularioLogin);
btnRegistrarse.addEventListener('click', mostrarFormularioRegistro);
