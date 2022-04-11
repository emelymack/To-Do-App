    const nombre = document.querySelector('#inputNombre');
    const apellido = document.querySelector('#inputApellido');
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');

/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    let errores = [];

    let regexTexto = /[A-Za-z]/

    if(nombre.value == "" && apellido.value == ""){
        errores.push("El nombre y el apellido no deben estar vacíos");
    } else if(!regexTexto.test(nombre.value) && !regexTexto.test(apellido.value)){
        errores.push("El nombre y el apellido no deben contener números ni caracteres especiales")
    }
}

function normalizarTexto(texto) {
    
    let texto = {
        nombreCompleto: `${nombre.value[0].toUpperCase()} ${nombre.value.slice(1).toLowerCase()} ${apellido.value}`
    }
    
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const errores = []
    const emailRegex = /^[A-Z0-9ü][a-z0-9ü_\d$@$!%*?&]{10,15}$/
    if(email.value === ''){
        errores.push('El email no debe estar vacío')
    } else if(!emailRegex.test(email.value)){
        errores.push('El email no es válido. Intente de nuevo')
    }
}

function normalizarEmail(email) {
    let userEmail = {
        email: email.value.trim()
    }
    return userEmail
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    
}

