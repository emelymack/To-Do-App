window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form')
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');
    const url = 'https://ctd-todo-api.herokuapp.com/v1'

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
       event.preventDefault()

       // creamos el cuerpo de la request
        let bodyReq = JSON.stringify({
            "email": email.value,
            "password": password.value
        })
        
       // configuramos la request del Fetch
       const settings = {
        method: "POST",
        body: bodyReq,
        headers: {
            "Content-type": "application/json"
        }
    }

       // llamamos a la funcion q hace la consulta (realizarLogin)
        realizarLogin(settings);

       // reseteamos el form
        form.reset()


    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
       
        // fetch , enviando los settings como 2do param
        fetch(`${url}/users/login`, settings)
        .then( response => response.json() )
        .then( data => {
            console.log("Realizando login...");
            console.log(data);
            if(data.jwt){
                
            }
        } )
        
    };

});