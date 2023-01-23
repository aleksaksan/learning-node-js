const express = require('express');
const path = require('path');
const writePost = require('./functions-for-json/writePost');
const postsJSON = require('./data/posts.json');

const app = express();

app.set('view engine', 'ejs');

const PORT = 5000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

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
  const posts = postsJSON.posts;
  // const posts = [
  //   {
  //     id: 1,
  //     text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, autem maxime! Recusandae tempora quos ipsam animi doloribus. Sed ut quam libero hic dolores corrupti, ad pariatur explicabo consequatur omnis facere.',
  //     title: 'First post',
  //     date: '22.01.2023',
  //     author: 'Aleksan',
  //   },
  // ];
  res.render(createPath('PostsPage'), { title, posts });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  // const post = {
  //   id: 1,
  //   text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, autem maxime! Recusandae tempora quos ipsam animi doloribus. Sed ut quam libero hic dolores corrupti, ad pariatur explicabo consequatur omnis facere.',
  //   title: 'First post',
  //   date: '22.01.2023',
  //   author: 'Aleksan',
  // };
  const post = postsJSON.posts.find(el => el.id === req.params.id)
  res.render(createPath('PostPage'), { title, post });
});

app.get('/add-post', (req, res) => {
  const title = 'New Post';
  res.render(createPath('AddPostPage'), { title });
});

//POST//

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = {
    id: new Date(),
    date: (new Date()).toLocaleDateString(),
    title,
    author,
    text,
  };
  writePost(post);
  res.render(createPath('PostPage'), { title, post });
});



///////////////
app.use((req, res) => {
  const title = 'Error';
  res
    .status(404)
    .render(createPath('NotFoundPage'), { title });
  // res.statusCode = 404;
  // res.sendFile(createPath('NotFoundPage'));
});
