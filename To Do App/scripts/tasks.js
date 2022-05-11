// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if(!localStorage.jwt){
  location.replace('./index.html')
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const url = 'https://ctd-todo-api.herokuapp.com/v1'
  let jwt = JSON.parse(localStorage.jwt)
  const btnCerrarSesion = document.querySelector('#closeApp')
  const formCrearTarea = document.querySelector('.nueva-tarea')
  const nuevaTarea = document.querySelector('#nuevaTarea')
  const pendientes = document.querySelector('.tareas-pendientes')
  const cantFinalizadas = document.querySelector('#cantidad-finalizadas')
  const finalizadas = document.querySelector('.tareas-terminadas')
  

  obtenerNombreUsuario()
  consultarTareas()

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    const cerrarSesion = confirm('¿Desea cerrar sesión?')
    
    if(cerrarSesion){
      // limpiamos el local Storage
      localStorage.clear();

      // redireccionamos al login
      location.replace('./index.html')
    }

  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const username = document.querySelector('.user-info p')
    
    // preparamos los settings del request
    let settings = {
      method: 'GET',
      headers: {
        'authorization': jwt,
        'Content-type': 'application/json'
      }
    }
    
    // hacemos el fetch a la API
    fetch(`${url}/users/getMe`, settings)
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      let firstName = data.firstName[0].toUpperCase() + data.firstName.slice(1)
      let lastName = data.lastName[0].toUpperCase() + data.lastName.slice(1)
      
      // insertamos el nombre en el elemento HTML
      username.innerHTML = `<span>${firstName} ${lastName}</span>`
    })

  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    // preparamos los settings del request
    let settings = {
      method: 'GET',
      headers: {
        'authorization': jwt,
        'Content-type': 'application/json'
      }
    }
    
    console.log('Consultando tareas...');

    fetch(`${url}/tasks`, settings)
    .then(response => response.json())
    .then(tareas => {
      console.log('Tareas del usuario:');
      console.table(tareas);

      renderizarTareas(tareas)
      //botonesCambioEstado()
      //botonBorrarTarea()
    })
    .catch(err => console.log(err))

  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();

    console.log('Creando nueva tarea...');
    console.log(nuevaTarea.value);

    // preparamos el body del request
    let body = {
      description: nuevaTarea.value.trim(),
      completed: false
    }

    // preparamos los settings del request
    let settings = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'authorization': jwt,
        'Content-type': 'application/json'
      }
    }

    // hacemos el fetch
    fetch(`${url}/tasks`, settings)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

    // reseteamos el form
    formCrearTarea.reset()

  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {







  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

});