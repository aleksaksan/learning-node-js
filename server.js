const express = require('express');
const postsJSON = require('./data/posts.json');
const postRouter = require('./routes/post-routes');
const contactsRouter = require('./routes/contacts-routes');
const createPath = require('./helpers/createPath');

const app = express();

app.set('view engine', 'ejs');

const PORT = 5000;

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

////////////////////////

// middleware should be before methods
app.use((req, res, next) => {
  console.log(`path:    ${req.path}`);
  console.log(`method:  ${req.method}`);
  next();
});

app.use(express.urlencoded({ extended: false }));

// adding an exclusion to be able folder from outside server 
app.use(express.static('styles'));

// methods:
app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('HomePage'), { title });
});

// redirect (status code: 3xx)
app.get('/about', (req, res) => {
  const title = 'About';
  res.redirect(createPath('ContactsPage'), { title });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts = postsJSON.posts;
  
  res.render(createPath('PostsPage'), { title, posts });
});

app.get('/add-post', (req, res) => {
  const title = 'New Post';
  res.render(createPath('AddPostPage'), { title });
});

app.use(postRouter);
app.use(contactsRouter);

///////////////
app.use((req, res) => {
  const title = 'Error';
  res
    .status(404)
    .render(createPath('NotFoundPage'), { title });
  // res.statusCode = 404;
  // res.sendFile(createPath('NotFoundPage'));
});
