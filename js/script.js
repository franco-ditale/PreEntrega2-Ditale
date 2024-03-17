function buscarUsuario(username) {
    return cuentasRegistradas.find(user => user.usuarioNuevo === username)
}

function buscarContraseña(user, password) {
    return user.contraseñaNueva === password;
}

const cuentasRegistradas = JSON.parse(localStorage.getItem('database')) || [];

function agregarRegistros(usuario) {
    cuentasRegistradas.push(usuario);

    localStorage.setItem("database", JSON.stringify(cuentasRegistradas))
}

class RegistroCuenta {
    constructor(usuarioNuevo, email, contraseñaNueva, contraseñaConfirmar) {
        this.usuarioNuevo = usuarioNuevo;
        this.email = email;
        this.contraseñaNueva = contraseñaNueva;
        this.contraseñaConfirmar = contraseñaConfirmar;
    }
}

/* REGISTRO DE USUARIO */

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("registrationForm");
    if (formulario) {
        formulario.addEventListener("submit", crearCuentaAndRedireccion);
    }

    const crearCuentaBtn = document.getElementById("btn-registrar");
    if (crearCuentaBtn) {
        crearCuentaBtn.addEventListener("click", function (event) {
            crearCuentaAndRedireccion(event);
        });
    }
});

function crearCuenta() {
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password-confirm").value;

    if (password === confirmPassword) {
        if (username && email) {
            const usuario = new RegistroCuenta(username, email, password, confirmPassword);
            agregarRegistros(usuario);
            console.log("Nuevo usuario agregado:", usuario);
            return true;
        } else {
            alert("Por favor, ingresa al menos un nombre de usuario y un correo electrónico.");
            return false;
        }
    } else {
        alert("Las contraseñas no coinciden");
    }
}

function crearCuentaAndRedireccion(event) {
    event.preventDefault();
    const cuentaCreada = crearCuenta();
    const redireccionar = cuentaCreada ? "./iniciosesion.html" : null;
    const mensaje = cuentaCreada ? "Redireccionando, Debes iniciar sesion" : "Algo no funciona";
    alert(mensaje);
    if (redireccionar) {
        location.href = redireccionar;
    }
}

/* INICIO SESIÓN */

document.addEventListener("DOMContentLoaded", function () {
    const formularioLogin = document.getElementById("formularioInicioSesion");
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function (event) {
            event.preventDefault();
        });
    }

    const iniciarSesionBtn = document.getElementById("btn-iniciarSesion");
    if (iniciarSesionBtn) {
        iniciarSesionBtn.addEventListener("click", function () {
            iniciarSesionYRedireccionar();
        });
    }
});

function iniciarSesionYRedireccionar() {

    const username = document.getElementById("username-is").value;
    const password = document.getElementById("password-is").value;

    console.log("Username:", username);
    console.log("Password:", password);
    console.log(cuentasRegistradas);

    const usuarioEncontrado = username ? buscarUsuario(username) : null;

    usuarioEncontrado && buscarContraseña(usuarioEncontrado, password) ?
        (alert("¡Bienvenido " + username + "!"), window.location.href = "./main.html") :
        alert("Datos incorrectos. Por favor, inténtalo nuevamente.");
}







