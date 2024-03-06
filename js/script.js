function buscarUsuario(username) {
    return cuentasRegistradas.find(user => user.usuarioNuevo === username)
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

const formulario = document.getElementById("registrationForm");

formulario.addEventListener("submit", createAccountAndRedirect);

const crearCuentaBtn = document.getElementById("btn-registrar");

crearCuentaBtn.addEventListener("click", function() {
    createAccountAndRedirect(); 
});

function createAccount() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password === confirmPassword) {
        if (username && email) {
            const usuario = new RegistroCuenta(username, email, password, confirmPassword);
            agregarRegistros(cuentasRegistradas, usuario);
            console.log(cuentasRegistradas); 
            return true; 
            alert("Por favor, ingresa al menos un nombre de usuario y un correo electrónico.");
            return false;
        }
    } else {
        alert("Las contraseñas no coinciden");
        return false;
    }
}

function createAccountAndRedirect() {
    if (createAccount()) { 
        window.location.href = "./index.html"; 
    }
}

/* INICIO SESIÓN

alert("Inicio De Sesión")

function iniciarSesion() {

    let intentosRestantes = 3;

    while (intentosRestantes > 0) {
        let ingresarUsuario = prompt("Ingresar Usuario");
        let ingresarContraseña = prompt("Ingresar Contraseña");

        let encontrarUsuario = buscarUsuario(ingresarUsuario);

        if (encontrarUsuario && buscarContraseña(encontrarUsuario, ingresarContraseña)) {
            alert("Bienvenido " + ingresarUsuario);
            return;
        } else {
            alert("Datos Incorrectos, Tienes " + (intentosRestantes - 1) + " intentos");
            intentosRestantes--;
        }
    }

    alert("Se acabaron los intentos. Por favor, inténtalo más tarde.");
}

iniciarSesion();



CAMBIO DE CONTRASEÑA 

alert("Cambio de contraseña");

function cambiarContraseña() {

    let resetContraseña = false;

    while (!resetContraseña) {
        let usuarioParaReset = prompt("Ingrese su usuario actual");
        let emailUsuario = prompt("Ingrese su gmail actual");

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
                    ingresoParaLogeados = true;
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




