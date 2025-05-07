const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//app.use(express.json());

let notes = [];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const note = { id: Date.now(), text: req.body.text };
  notes.push(note);
  res.status(201).json(note);
});

app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== Number(req.params.id));
  res.status(204).end();
});

if (require.main === module) {
  app.listen(port, () => console.log(`App corriendo en puerto ${port}`));
}

/*app.listen(port, () => {
  console.log(`API escuchando en puerto ${port}`);
});*/

module.exports = app;
