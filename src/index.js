const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let notes = [];
let nextId = 1;

// GET /notes
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
  res.status(201).json(note);
});

// DELETE /notes/:id
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  notes.splice(index, 1);
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
