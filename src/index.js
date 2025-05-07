//import cors from 'cors';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const DATA_FILE = './data.json';

app.use(express.json());
//app.use(cors());

// Cargar notas desde archivo
let notes = [];
try {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  notes = JSON.parse(data);
} catch (err) {
  console.error('No se pudo leer data.json. Iniciando con notas vacías.');
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

// Obtener todas las notas
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Crear una nueva nota
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Se requieren título y contenido' });
  }
  const note = { id: nextId++, title, content };
  notes.push(note);
  saveNotes();
  res.status(201).json(note);
});

// Eliminar una nota
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  notes.splice(index, 1);
  saveNotes();
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
