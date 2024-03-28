function obtenerCuentasRegistradas() {
    return new Promise((resolve, reject) => {
        const data = localStorage.getItem('database');
        if (data) {
            resolve(JSON.parse(data));
        } else {
            reject(new Error('No se encontraron datos en el almacenamiento local'));
        }
    });
}

function buscarUsuario(username) {
    return cuentasRegistradas.find(user => user.usuarioNuevo === username);
}

function buscarContraseña(user, password) {
    return user.contraseñaNueva === password;
}

let cuentasRegistradas = [];

document.addEventListener("DOMContentLoaded", function () {
    obtenerCuentasRegistradas()
        .then((data) => {
            cuentasRegistradas = data;
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
        })
        .catch((error) => {
            console.error(error);
        });
});

function agregarRegistros(usuario) {
    return new Promise((resolve, reject) => {
        try {
            cuentasRegistradas.push(usuario);
            localStorage.setItem("database", JSON.stringify(cuentasRegistradas));
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

class RegistroCuenta {
    constructor(usuarioNuevo, email, contraseñaNueva, contraseñaConfirmar) {
        this.usuarioNuevo = usuarioNuevo;
        this.email = email;
        this.contraseñaNueva = contraseñaNueva;
        this.contraseñaConfirmar = contraseñaConfirmar;
    }
}

function crearCuenta() {
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password-confirm").value;

    if (password === confirmPassword) {
        if (username && email) {
            const usuario = new RegistroCuenta(username, email, password, confirmPassword);
            return agregarRegistros(usuario)
                .then(() => {
                    console.log("Nuevo usuario agregado:", usuario);
                    return true;
                })
                .catch((error) => {
                    console.error(error);
                    return false;
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingresa al menos un nombre de usuario y un correo electrónico."
            });
            
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Las contraseñas no coinciden!"
        });
        
    }
}

function crearCuentaAndRedireccion(event) {
    event.preventDefault();
    crearCuenta()
        .then((cuentaCreada) => {
            if (cuentaCreada) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Has creado la cuenta correctamente"
                });
                setTimeout(() => {
                    window.location.href = "./iniciosesion.html";
                }, 2000);
            } 
        })
        .catch((error) => {
            console.error(error);
            // Manejar error si ocurre durante la creación de la cuenta
        });
}


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

    const usuarioEncontrado = username ? buscarUsuario(username) : null;

    usuarioEncontrado && buscarContraseña(usuarioEncontrado, password) ?
        (Swal.fire({
            icon: "success",
            title: "¡Bienvenido " + username + "!"
        }),
            setTimeout(() => {
                window.location.href = "./main.html";
            }, 2000)
        ) :
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Datos incorrectos. Por favor, inténtalo nuevamente."
        });
}







