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
  

  obtenerNombreUsuario()
  consultarTareas()

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    // ANIMAR ALERT
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
      let firstName = data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1)
      let lastName = data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1)
      
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
      botonesCambioEstado()
      botonBorrarTarea()
    })
    .catch(err => console.error(err))

  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault(); // prevenimos el envío x defecto para poder trabajar con el value

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
    .then(tarea => {
      console.log(tarea)
      consultarTareas()
    })
    .catch(err => console.log(err))

     
    //  o como se imprime

    // reseteamos el form
    formCrearTarea.reset()
    //consultarTareas()
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    console.log("Renderizando...");

    // obtenemos listados y limpiamos cualquier contenido interno
    const pendientes = document.querySelector('.tareas-pendientes')
    const finalizadas = document.querySelector('.tareas-terminadas')
    pendientes.innerHTML = ""
    finalizadas.innerHTML = ""


    // buscamos el numero de finalizadas y lo inicializamos en 0
    const cantFinalizadas = document.querySelector('#cantidad-finalizadas')
    let contador = 0
    cantFinalizadas.innerText = contador


    // verificamos si cada tarea queda pendiente o no y la enviamos a la lista correspondiente
    listado.forEach(tarea => {
      // variable para manipular la fecha
      let fecha = new Date(tarea.createdAt)

      if(tarea.completed){
        contador++
        finalizadas.innerHTML += `
          <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change completa" id="${tarea.id}"><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </li>
        `
      } else {
        pendientes.innerHTML += `
        <li class="tarea">   
          <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
          <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
          </div>
        </li>
        `

      }

      // actualizamos el contador en la pantalla
      cantFinalizadas.innerText = contador;
    });
    
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    let btnCambioEstado = document.querySelectorAll('.change')
    
    btnCambioEstado.forEach(btn => {
      btn.addEventListener('click', (e) => {

        let idTarea = e.target.id;
        console.log("Cambiando tarea ${idTarea} de estado...");

        // si contiene la clase 'completa' (i.e. si está en la lista "Terminadas") y se hace click en el boton, se manda a las pendientes (i.e. su estado "completed" pasa a ser false), sino, cuando se clickea en el boton la tarea pasa a estar completa.
        let nuevoEstado = e.target.classList.contains('completa') ? false : true;

        const bodyReq = {
          completed: nuevoEstado
        }
        const settings = {
          method: "PUT",
          body: JSON.stringify(bodyReq),
          headers: {
            authorization: jwt,
            'Content-type': "application/json"
          }
        }

        fetch(`${url}/tasks/${idTarea}`, settings)
        .then(response => response.json())
        .then(tarea => {
          console.log(tarea)
          consultarTareas()
        })
        .catch(err => console.error(err))
        
      })
    })

  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {

    let btnDelete = document.querySelectorAll('.borrar')
    
    btnDelete.forEach( btn => {
      btn.addEventListener('click', (e) => {

        let idTarea = e.target.id;
        console.log(`Eliminando tarea "${idTarea}"...`);

        const settings = {
          method: "DELETE",
          headers: {
            authorization: jwt,
            'Content-type': "application/json"
          }
        }

        fetch(`${url}/tasks/${idTarea}`, settings)
        .then(response => response.json())
        .then(tarea => {
          console.log(tarea);
        })
        .catch(err => console.error(err))

      })
    })
    
    consultarTareas()
  };

});