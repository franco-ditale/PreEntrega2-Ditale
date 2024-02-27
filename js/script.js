alert("Inicio De sesión");

let ingresoParaLogeados = false;

function buscarUsuario(username) {
    return cuentasRegistradas.find(user => user.usuarioNuevo === username)
}

function buscarContraseña(user, password) {
    return user && user.contraseñaNueva === password;
}

/* REGISTRO DE USUARIO */

class RegistroCuenta {
    constructor(usuarioNuevo, email, contraseñaNueva, contraseñaConfirmar) {
        this.usuarioNuevo = usuarioNuevo;
        this.email = email;
        this.contraseñaNueva = contraseñaNueva;
        this.contraseñaConfirmar = contraseñaConfirmar;
    }
}

const cuentasRegistradas = [];
let continuar = true;

function agregarRegistros(cuentasRegistradas, usuario) {
    return cuentasRegistradas.push(usuario);

}

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

while (!ingresoParaLogeados) {

    let ingresarUsuario = prompt("Ingresar Usuario");
    let ingresarContraseña = prompt("Ingresar Contraseña");

    let encontrarUsuario = buscarUsuario(ingresarUsuario);

    if (encontrarUsuario && buscarContraseña(encontrarUsuario, ingresarContraseña)) {
        alert("Bienvenido " + ingresarUsuario)
        ingresoParaLogeados = true;
    } else {
        alert("Datos Incorrectos");
    }

}




