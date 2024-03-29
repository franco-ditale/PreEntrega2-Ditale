async function registrarUsuario(usuario) {
    const response = await fetch(`https://lightningneko.com/auth_test?id=${usuario.username}&pass=${usuario.password}`, {
        method: 'POST'
    })
    console.log(autenticarUsuario);
}

function autenticarUsuario(username, password) {
    return fetch(`https://lightningneko.com/auth_test?id=${username}&pass=${password}`, {
        method: 'GET',
    })
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("registrationForm");
    if (formulario) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('password-confirm').value;

            if (password === confirmPassword) {
                registrarUsuario({ username, email, password })
                    .then(data => {
                        console.log('Usuario registrado exitosamente:', data);
                        Swal.fire({
                            icon: "success",
                            title: "Has creado la cuenta correctamente"
                        });
                        setTimeout(() => {
                            window.location.href = "./iniciosesion.html";
                        }, 2000);
                    })
                    .catch(error => {
                        console.error('Error al registrar usuario:');
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Error al registrar usuario. Por favor, inténtalo nuevamente."
                        });
                    });
            } else {
                console.error('Las contraseñas no coinciden');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Las contraseñas no coinciden!"
                });
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const formularioLogin = document.getElementById("formularioInicioSesion");
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username-is").value;
            const password = document.getElementById("password-is").value;

            autenticarUsuario(username, password)
                .then(data => {
                    if (data.ok) {
                        console.log('Usuario autenticado:', data);
                        Swal.fire({
                            icon: "success",
                            title: "¡Bienvenido " + username + "!"
                        });
                        setTimeout(() => {
                            window.location.href = "./main.html";
                        }, 2000);
                    } else {
                        console.error("Error al autenticar usuario:");
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Datos incorrectos. Por favor, inténtalo nuevamente."
                        });
                    }

                })
        });
    }
});







