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

        // configuramos la request del Fetch
        const settings = '';

        // enviamos los datos
        realizarRegister(settings)

        // Reiniciamos el formulario
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        
        // hacemos el fetch a la api, con el path correspondiente según la config de la API, indicando como 2do parametro los datos a enviar
        // fetch(`${url}/users`, settings)
        


    };


});