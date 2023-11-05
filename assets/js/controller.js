
var usuarios = [];
var categorias=[];
var resultadosUsuarioSeleccionado= [];
var preguntas=[];
let cont=0;




//renderizar barra Superior
function renderizarBarraSuperior(coronas,vidas){

  document.getElementById('barraSuperior').innerHTML="";
  document.getElementById('barraSuperior').innerHTML= `
      
    <div class="contenedor-imagen" onclick="seleccionarOpcionMenu('seccion-0')">
      <img class="imagne-perfil" src="assets/img/profile-pics/goku.jpg">
    </div>


    <div class="corona">
      <i class="fa-solid fa-crown"></i>
      <span>${coronas}</span>
    </div>


    <div class="corazon" >
      <i class="fa-solid fa-heart"></i>
      <span>${vidas}</span>
    </div>

  
  `;
}

renderizarBarraSuperior("","");

//seleccionar secciones
function seleccionarOpcionMenu(opcion) {
    // alert('Opcion seleccionada: ' + opcion);
   
    document.getElementById('seccion-0').style.display = 'none';
    document.getElementById('seccion-1').style.display = 'none';
    document.getElementById('seccion-2').style.display = 'none';
  
    document.getElementById(opcion).style.display = 'block'
  }

seleccionarOpcionMenu('seccion-0');






//obtener usuarios del Backend
const obtenerUsuarios = async () => {
  let resultado = await fetch('http://localhost:3000/usuarios', { 
    method: 'GET',
    headers: {
      "Content-Type": "application/json", 
    },
  });

  let informacion = await resultado.json();
  console.log('Lista de usuarios retornada por el backend ()', informacion);
  usuarios = informacion;
  renderizarUsuarios(); //sincrona
}

//renderizar usuarios del Backend
function renderizarUsuarios(){

    usuarios.forEach((usuario)=> {

      

      document.getElementById('usuarios').innerHTML+=`
      <div class="usuario" onclick="seleccionarOpcionMenu('seccion-1'); seleccionarUsuario(${usuario.id}); renderizarBarraSuperior(${usuario.coronas},${usuario.vidas});">
        <img src="${usuario.imagenPerfil}">
        <div class="nombre">${usuario.nombre}</div>
      </div>
    
    `
    });
    
}

obtenerUsuarios();


const seleccionarUsuario = async (id) =>{

  let resultado = await fetch('http://localhost:3000/usuarios/' + id, { 
    method: 'GET',
    headers: {
      "Content-Type": "application/json", 
    },
  });

  let usuarioSeleccionado = await resultado.json();
  console.log('Usuario seleccionado desde el  backend:', usuarioSeleccionado);

  resultadosUsuarioSeleccionado=[];
  resultadosUsuarioSeleccionado=usuarioSeleccionado.resultados;
 
  obtenerCategorias(resultadosUsuarioSeleccionado);

  

  

}


//obtener categorias del Backend
const obtenerCategorias = async (resultados) => {
  let resultado = await fetch('http://localhost:3000/categorias', { 
    method: 'GET',
    headers: {
      "Content-Type": "application/json", 
    },
  });

  let categoriasBackend = await resultado.json();
  console.log('Lista de categorias retornada por el backend ()', categoriasBackend);
  categorias = categoriasBackend;
  renderizarCategorias(resultados); //sincrona
}

//renderizar categorias
function renderizarCategorias(resultados) {
  document.getElementById('categorias').innerHTML = "";

  categorias.forEach((categoria, i) => {
  let categoriaAprobada = resultados.find((resultado) => resultado.category === categoria.id);

    if (categoriaAprobada && categoriaAprobada.aprobada) {
      document.getElementById('categorias').innerHTML += `
        <div class="categoria" onclick="seleccionarOpcionMenu('seccion-2'); preguntasPorCategoria(${categoria.id});">
          <i class="fa-solid fa-people-roof exito" style="color: ${categoria.color};"></i>
          <div class="nombre">${categoria.nombre}</div>
        </div>
      `;
    } else {
      document.getElementById('categorias').innerHTML += `
        <div class="categoria" onclick="seleccionarOpcionMenu('seccion-2'); preguntasPorCategoria(${categoria.id});">
          <i class="fa-solid fa-people-roof" style="color: ${categoria.color};"></i>
          <div class="nombre">${categoria.nombre}</div>
        </div>
      `;
    }
  });
}


//obtener preguntas por categoria del Backend
const preguntasPorCategoria = async (id) => {
  let resultado = await fetch('http://localhost:3000/categorias/' + id + '/preguntas', { 
    method: 'GET',
    headers: {
      "Content-Type": "application/json", 
    },
  });

  preguntas=[];
  let preguntasBackend = await resultado.json();
  console.log('Lista de preguntas retornadas del Backend', preguntasBackend);
  preguntas = preguntasBackend;
  renderizarPreguntas(); //sincrona
}


//renderizar preguntas

/*
function renderizarPreguntas() {
 document.getElementById('seccion-2').innerHTML = "";
  

  preguntas.forEach((pregunta, i) => {
    const numeroPregunta = i;
    document.getElementById('seccion-2').innerHTML = `
       <div class="contenedor">
        <div class="info-preguntas">
          <div class="numero-pregunta"><span>${numeroPregunta}</span>/5</div>
          <div class="Lapregunta1">Traduce la siguiente palabra:</div>
          <div class="Lapregunta2">${pregunta.palabra}</div>
        </div>
        <main id="preguntas">
          ${renderizarRespuestas(pregunta.respuestas)}
        </main>
      </div>
    `;
  
  });
}

// Renderizar respuestas
function renderizarRespuestas(respuestas) {
  .getElementById('preguntas').innerHTML="";
  const resp = respuestas;
  
  resp.forEach((pregunta, i) => {
 
   document.getElementById('preguntas').innerHTML += 
   `<div class="pregunta">
      <div class="nombre">${pregunta.palabra}</div>
    </div>`});
  
}




// **con este si funciona pero...**
function renderizarRespuestas(respuestas) {
  const respuestasHTML = respuestas.map(pregunta => `
    <div class="pregunta">
      <div class="nombre">${pregunta.palabra}</div>
    </div>
  `).join('');

  return respuestasHTML;
}
*/