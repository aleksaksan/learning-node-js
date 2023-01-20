const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 5000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('HomePage'), { title });
});

// var to ejs:

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'YouTube', link: 'https://youtube.com' },
    { name: 'Google', link: 'https://google.com' },
    { name: 'GitHub', link: 'https://github.com/' },
  ];
  res.render(createPath('ContactsPage'), { contacts, title });
});

// redirect (status code: 3xx)
app.get('/about', (req, res) => {
  const title = 'About';
  res.redirect(createPath('ContactsPage'), { title });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  res.render(createPath('PostsPage'), { title });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  res.render(createPath('PostPage'), { title });
});

app.get('/add-post', (req, res) => {
  const title = 'New Post';
  res.render(createPath('AddPostPage'), { title });
});

app.use((req, res) => {
  const title = 'Error';
  res
    .status(404)
    .render(createPath('NotFoundPage'), { title });
  // res.statusCode = 404;
  // res.sendFile(createPath('NotFoundPage'));
});
