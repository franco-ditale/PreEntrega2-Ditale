function buscarUsuario(username) {
    return cuentasRegistradas.find(user => user.usuarioNuevo === username);
}

function buscarContraseña(user, password) {
    return user.contraseñaNueva === password;
}

function agregarRegistros(cuentasRegistradas, usuario) {
    return cuentasRegistradas.push(usuario);
}

const cuentasRegistradas = [];

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
    if (formulario) { // Verificar si el formulario existe en el DOM
        formulario.addEventListener("submit", crearCuentaAndRedireccion);
    } else {
        console.error("No se encontró el formulario de registro en el DOM.");
    }

    const crearCuentaBtn = document.getElementById("btn-registrar");
    if (crearCuentaBtn) { // Verificar si el botón de registro existe en el DOM
        crearCuentaBtn.addEventListener("click", function (event) {
            crearCuentaAndRedireccion(event); // Pasar el evento como parámetro
        });
    } else {
        console.error("No se encontró el botón de registro en el DOM.");
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
            agregarRegistros(cuentasRegistradas, usuario);
            console.log(cuentasRegistradas);
            return true;
        } else {
            alert("Por favor, ingresa al menos un nombre de usuario y un correo electrónico.");
        }
    } else {
        alert("Las contraseñas no coinciden");
    }
}

function crearCuentaAndRedireccion(event) {
    event.preventDefault(); // Detener el envío del formulario por defecto
    if (crearCuenta()) {
        alert("Redireccionando");
        location.href = "./iniciosesion.html";
    } else {
        alert("Algo no funciona");
    }
}

/* INICIO SESIÓN */

function iniciarSesionYRedireccionar() {
    const username = document.getElementById("username-is").value;
    const password = document.getElementById("password-is").value;

    if (username && password) {
        const usuarioEncontrado = buscarUsuario(username);

        if (usuarioEncontrado && buscarContraseña(usuarioEncontrado, password)) {
            alert("¡Bienvenido " + username + "!");
            window.location.href = "./main.html"; // Redireccionar a otra sección HTML
        } else {
            alert("Datos incorrectos. Por favor, inténtalo nuevamente.");
        }
    } else {
        alert("Por favor, ingresa tu nombre de usuario y contraseña.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const formularioLogin = document.getElementById("formularioInicioSesion");
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function(event) {
            event.preventDefault();
            iniciarSesionYRedireccionar();
        });
    } else {
        console.error("No se encontró el formulario de inicio de sesión en el DOM.");
    }

    const iniciarSesionBtn = document.getElementById("btn-iniciarSesion");
    if (iniciarSesionBtn) {
        iniciarSesionBtn.addEventListener("click", function() {
            iniciarSesionYRedireccionar();
        });
    } else {
        console.error("No se encontró el botón de inicio de sesión en el DOM.");
    }
});



/* CAMBIAR CONTRASEÑA */

/* function cambiarContraseña() {
    const usuarioParaReset = document.getElementById("username-cambiar").value;
    const emailUsuario = document.getElementById("email-cambiar").value;
    const cambioDeContraseña = document.getElementById("password-cambiar").value;
    const cambioDeContraseñaConfirmar = document.getElementById("password-confirm-cambiar").value;

    if (!usuarioParaReset || !emailUsuario || !cambioDeContraseña || !cambioDeContraseñaConfirmar) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (cambioDeContraseña !== cambioDeContraseñaConfirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let usuarioEncontrado = buscarUsuario(usuarioParaReset);

    if (usuarioEncontrado && usuarioEncontrado.email === emailUsuario) {
        usuarioEncontrado.contraseñaNueva = cambioDeContraseña;
        alert("Has restablecido tu contraseña correctamente");
        location.href = "./main.html";
    } else {
        alert("Los datos no coinciden o no existen.");
    }
}

document.getElementById("btn-cambiar").addEventListener("click", cambiarContraseña); */















/* CAMBIO DE CONTRASEÑA 

alert("Cambio de contraseña");

function cambiarContraseña() {

    let resetContraseña = false;

    while (!resetContraseña) {
        const usuarioParaReset = document.getElementById("username-cambiar").value;
        const emailUsuario = document.getElementById("email-cambiar").value;

        let usuarioEncontrado = buscarUsuario(usuarioParaReset);

        if (usuarioEncontrado && usuarioEncontrado.email === emailUsuario) {

            let cambioDeContraseña = prompt("Ingresar Nueva Contraseña");
            let cambioDeContraseñaConfirmar = prompt("Confirmar Contraseña");

            if (cambioDeContraseña === cambioDeContraseñaConfirmar) {
                usuarioEncontrado.contraseñaNueva = cambioDeContraseña;
                alert("Has restablecido tu contraseña correctamente");
                resetContraseña = true;

                let ingresarUsuario = prompt("Ingresar Usuario");
                let ingresarContraseña = prompt("Ingresar Contraseña");

                let encontrarUsuario = buscarUsuario(ingresarUsuario);

                if (encontrarUsuario && buscarContraseña(encontrarUsuario, ingresarContraseña)) {
                    alert("Bienvenido " + ingresarUsuario)
        
                } else {
                    alert("Datos Incorrectos");
                }

            } else {
                alert("Las contraseñas no coinciden");
            }
        } else {
            alert("Los datos no existen");
        }
    }
}

cambiarContraseña(); */




