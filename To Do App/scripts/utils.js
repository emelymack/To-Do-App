/* ---------------------------------- texto --------------------------------- */
function validarNombreCompleto(nombre, apellido) {
    return validarNombre(nombre) && validarApellido(apellido) ? true : false;
}
function validarNombre(nombre){
    let regexTexto = /[A-Za-z]/
    if(!regexTexto.test(nombre) || nombre.length <= 2){
        console.log("err nombre o num regex");
        return false;
    } 
    return true;
}
function validarApellido(apellido){
    let regexTexto = /[A-Za-z]/
    if(!regexTexto.test(apellido) || apellido.length <= 2){
        console.log("err apelido o num regex");
        return false;
    }
    return true;
}

function normalizarNombre(nombre, apellido) {
    let nombreCompleto = {
        nombre: `${nombre[0].toUpperCase()}${nombre.slice(1).toLowerCase()}`.trim(),
        apellido: `${apellido[0].toUpperCase()}${apellido.slice(1).toLowerCase()}`.trim()
    }
    nombre = nombreCompleto.nombre;
    apellido = nombreCompleto.apellido; 
    return nombreCompleto.nombre + ' ' +nombreCompleto.apellido;
}

// /* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!emailRegex.test(email)){
        return false;
    }
    return true;
}

function normalizarEmail(email) {
    let userEmail = {
        email: email.trim()
    }
    return userEmail
}

/* -------------------------------- password -------------------------------- */
function validarPassword(password) {
    return validarEspacios(password) && validarNumeros(password) ? true : false;
}

function compararPasswords(pass_1, pass_2) {
    return pass_1 === (pass_2) ? true : false;
}

/* --------------------------------------------------------------------------- */
function validarEspacios(str){
    let espacios = false;
    let i = 0;
    while (!espacios && (i < str.length)) {
        if (str.charAt(i) == " "){
            espacios = true;
        }
        i++;
    }
        
    if(espacios) {
        console.log("No puede contener espacios en blanco");
        return false;
    }
    return true;
}


function validarNumeros(str){
    let nums = ['0','1','2','3','4','5','6','7','8','9'];
    let numsInStr = 0;
    let i = 0;
    for(let i = 0; i < str.length; i++){
        nums.forEach(num => {
            if(str.charAt(i).includes(num)){
                numsInStr += 1;
                console.log("nums en str:" +numsInStr);
            }
        })
    }
    
    return numsInStr >= 2;
}

