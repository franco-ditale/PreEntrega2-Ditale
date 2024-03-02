let ingresoParaLogeados = false;

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

alert("Registro de cuenta");
let continuar = true;

while (continuar) {
    let registrarUsuario = prompt("Elija Usuario");
    let registrarEmail = prompt("Elija Email");
    let registrarContraseña = prompt("Elija Contraseña");
    let registrarContraseñaConfirmar = prompt("Confirmar Contraseña");

    if (registrarContraseña === registrarContraseñaConfirmar) {
        if (registrarUsuario && registrarEmail) {
            const usuario = new RegistroCuenta(registrarUsuario, registrarEmail, registrarContraseña, registrarContraseñaConfirmar);

            agregarRegistros(cuentasRegistradas, usuario)

            alert("Has sido registrado correctamente");
            continuar = false;
        } else {
            alert("Por favor, ingresa al menos un nombre de usuario o correo electrónico.");
        }
    } else {
        alert("Estimado Usuario, Las contraseñas no coinciden")
    }
}

console.log(cuentasRegistradas);


/* INICIO SESIÓN */

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



/* CAMBIO DE CONTRASEÑA  */
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

cambiarContraseña();




