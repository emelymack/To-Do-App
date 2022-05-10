window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form')
    const nombre = document.querySelector('#inputNombre');
    const apellido = document.querySelector('#inputApellido');
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');
    const url = 'https://ctd-todo-api.herokuapp.com/v1'



    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault() // detenemos el form para que no se envíe 

        //creamos el body de la request a la api (objeto)
        let body = {
            firstName: nombre.value,
            lastName: apellido.value,
            email: email.value,
            password: password.value
        }

        // configuramos la request del Fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // enviamos los datos
        realizarRegister(settings)

        // Reiniciamos el formulario
        form.reset()
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        
        // hacemos el fetch a la api, con el path correspondiente según la config de la API, indicando como 2do parametro los datos a enviar
        fetch(`${url}/users`, settings)
        .then( response =>{
            console.log(response);

            if(response.ok !== true){
                alert('Alguno de los datos es incorrecto. Vuelva a intentarlo')
            }

            return response.json()
        }) 
        .then( data => {
            console.log('Realizando registro...');
            console.log(data);

            if(data.jwt){
                // guardo en LocalStorage 
                localStorage.setItem('jwt', JSON.stringify(data.jwt))

                // redireccionamos al login
                location.replace('./index.html')
            }
            
        })
        .catch( err => {
            console.log("ERROR: "+ err);
        })
    

    };


});