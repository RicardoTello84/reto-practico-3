//import cors from 'cors';

const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const DATA_FILE = './data.json';

app.use(express.json());
//app.use(cors());

/*let notes = [
  { id: 1, title: 'Primera nota', content: '20' },
  { id: 2, title: 'Segunda nota', content: '15' }
];
let nextId = 3;*/

// Cargar notas desde archivo
let notes = [];
try {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  notes = JSON.parse(data);
} catch (err) {
  //console.error('No se pudo leer data.json. Iniciando con notas vacías.');
  console.error('Error al leer el archivo de notas data.json:', err.message);
  notes = [{ id: 0, title: 'sin nota', content: '0' }];
}

let nextId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;

// Guardar notas en el archivo
function saveNotes() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API de Notas funcionando' });
});

//Obtener todas las notas GET /notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// POST /notes
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const note = { id: nextId++, title, content };
  notes.push(note);
  saveNotes();
  res.status(201).json(note);
});

// DELETE /notes/:id
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  //console.log('Intentando eliminar nota con ID:', id);
  //console.log('Notas actuales:', notes);

  const index = notes.findIndex(note => note.id === id);
  if (index === -1) {
    console.log('Nota no encontrada');
    return res.status(404).json({ error: 'Note not found' });
  }
  notes.splice(index, 1);
  saveNotes();
  //console.log('Nota eliminada. Notas restantes:', notes);
  res.status(204).send();
});

//Valida si el puerto esta abierto
if (require.main === module) {
  app.listen(port, () => console.log(`App corriendo en puerto ${port}`));
}

/*app.listen(port, () => {
  console.log(`API escuchando en puerto ${port}`);
});*/

module.exports = app;
