const express = require('express');
const path = require('path');

const app = express();

const PORT = 5000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(createPath('HomePage'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(createPath('ContactsPage'));
});

app.get('/about', (req, res) => {
  res.redirect(createPath('ContactsPage'));
});

app.use((req, res) => {
  res
    .status(404)
    .sendFile(createPath('NotFoundPage'));
  // res.statusCode = 404;
  // res.sendFile(createPath('NotFoundPage'));
});
