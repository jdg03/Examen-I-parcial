const express = require('express');
const usuarios = require('./data/usuarios.json');
const categorias = require('./data/categorias.json');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Get all usuarios
app.get('/usuarios', (req, res) => {
  res.send(usuarios);
});

// Get a usuario by id
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(p => p.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado.');
  res.send(usuario);
});

// Create a new usuario
app.post('/usuarios', (req, res) => {
  const usuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    imagenPerfil: req.body.imagenPerfil,
    coronas: req.body.coronas,
    vidas: req.body.vidas,
    resultados: req.body.resultados,
  };
  usuarios.push(usuario);
  res.send(usuario);
});

// Update a usuario
app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(p => p.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('The usuario with the given ID was not found.');

  usuario.nombre = req.body.nombre;
  usuario.imagenPerfil = req.body.imagenPerfil;
  usuario.coronas = req.body.coronas;
  usuario.vidas = req.body.vidas;
  usuario.resultados = req.body.resultados;

  res.send(usuario);
});

// Delete a usuario
app.delete('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(p => p.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado.');

  const index = usuarios.indexOf(usuario);
  usuarios.splice(index, 1);

  res.send(usuario);
});

/////////// Categorias

app.get('/categorias', (req, res) => {
  const respuesta = [];
  categorias.forEach(item => {
    respuesta.push({
      id: item.id,
      nombre: item.nombre,
      icono: item.icono,
      color: item.color
    });
  });
  res.send(respuesta);
});


// Obtener pregutas de una categoria
app.get('/categorias/:id/preguntas', (req, res) => {
  const categoria = categorias.find(item => item.id == req.params.id)
  res.send(categoria ? categoria.preguntas : {}) ;
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
