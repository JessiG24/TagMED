const btnIniciarSesion = document.querySelector('.iniciar-sesion');
const btnRegistrarse = document.querySelector('.registrarse');

let marcaRegistrada = {}; // Objeto para guardar la marca registrada


function crearFondoModal() {
    const fondo = document.createElement('div');
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


function cerrarModal(fondo) {
    document.body.removeChild(fondo);
}

function mostrarFormularioRegistroMarca() {
    const fondo = crearFondoModal();

    const form = document.createElement('form');
    form.innerHTML = `
        <h2 style="text-align:center;">Registro de Marca</h2>
        <input type="text" id="nombreMarca" placeholder="Nombre de la marca" required>
        <input type="text" id="direccion" placeholder="Dirección exacta" required>
        <input type="text" id="nombreAdmin" placeholder="Nombre del administrador" required>
        <input type="tel" id="telAdmin" placeholder="Teléfono del administrador" required>
        <input type="tel" id="telLocal" placeholder="Teléfono del local" required>
        <input type="password" id="contrasena" placeholder="Contraseña" required>
        <input type="password" id="confirmar" placeholder="Confirmar contraseña" required>

        <div id="drop-area" style="border: 2px dashed #2ECC71; border-radius: 12px; padding: 20px; text-align: center; color: #333;">
            <p>Por favor arrastre la imagen de su marca</p>
            <input type="file" id="logoInput" accept="image/*" style="display: none;">
            <img id="previewLogo" src="" alt="Vista previa del logo" style="max-width: 100px; margin-top: 10px; display: none;">
        </div>

        <button type="submit">Registrarse</button>
        <button type="button" id="cancelarRegistro">Cancelar</button>
    `;

    aplicarEstilosFormulario(form);
    fondo.appendChild(form);
    document.body.appendChild(fondo);

    form.querySelector('#cancelarRegistro').addEventListener('click', () => cerrarModal(fondo));

    const dropArea = form.querySelector('#drop-area');
    const logoInput = form.querySelector('#logoInput');
    const preview = form.querySelector('#previewLogo');

    dropArea.addEventListener('click', () => logoInput.click());

    dropArea.addEventListener('dragover', e => {
        e.preventDefault();
        dropArea.style.backgroundColor = '#f0fdf5';
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = 'transparent';
    });

    dropArea.addEventListener('drop', e => {
        e.preventDefault();
        dropArea.style.backgroundColor = 'transparent';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            mostrarVistaPrevia(file);
        }
    });

    logoInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            mostrarVistaPrevia(file);
        }
    });

    let logoBase64 = "";

    function mostrarVistaPrevia(file) {
        const reader = new FileReader();
        reader.onload = () => {
            logoBase64 = reader.result;
            preview.src = logoBase64;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        const nombreMarca = document.getElementById('nombreMarca').value;
        const direccion = document.getElementById('direccion').value;
        const nombreAdmin = document.getElementById('nombreAdmin').value;
        const telAdmin = document.getElementById('telAdmin').value;
        const telLocal = document.getElementById('telLocal').value;
        const contrasena = document.getElementById('contrasena').value;
        const confirmar = document.getElementById('confirmar').value;

        if (contrasena !== confirmar) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        marcaRegistrada = {
            nombreMarca,
            direccion,
            nombreAdmin,
            telAdmin,
            telLocal,
            contrasena,
            logo: logoBase64
        };

        alert("¡Registro exitoso! Bienvenido a nuestra comunidad TAGMED");
        cerrarModal(fondo);
    });
}

function mostrarFormularioLoginMarca() {
    const fondo = crearFondoModal();

    const form = document.createElement('form');
    form.innerHTML = `
        <h2 style="text-align:center;">Iniciar sesión</h2>
        <input type="text" id="loginMarca" placeholder="Nombre de la marca" required>
        <input type="password" id="loginPass" placeholder="Contraseña" required>
        <button type="submit">Ingresar</button>
        <button type="button" id="cancelarLogin">Cancelar</button>
    `;

    aplicarEstilosFormulario(form);
    fondo.appendChild(form);
    document.body.appendChild(fondo);

    form.querySelector('#cancelarLogin').addEventListener('click', () => cerrarModal(fondo));

    form.addEventListener('submit', e => {
        e.preventDefault();

        const loginMarca = document.getElementById('loginMarca').value;
        const loginPass = document.getElementById('loginPass').value;

        if (!marcaRegistrada.nombreMarca || loginMarca !== marcaRegistrada.nombreMarca) {
            const respuesta = confirm("Usuario no registrado, por favor regístrese");
            cerrarModal(fondo);
            if (respuesta) mostrarFormularioRegistroMarca();
        } else if (loginPass !== marcaRegistrada.contrasena) {
            alert("Contraseña incorrecta.");
        } else {
            alert("Inicio de sesión exitoso. ¡Bienvenido!");
            cerrarModal(fondo);
        }
    });
}

btnIniciarSesion.addEventListener('click', mostrarFormularioLoginMarca);
btnRegistrarse.addEventListener('click', mostrarFormularioRegistroMarca);
