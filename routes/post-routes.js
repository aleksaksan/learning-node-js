const express = require('express');
const router = express.Router();
const postsJSON = require('../data/posts.json');
const writePost = require('../helpers/writePost');
const deletePost = require('../helpers/deletePost');
const createPath = require('../helpers/createPath');

router.get('/posts/:id', (req, res) => {
  const title = 'Post';
  
  const post = postsJSON.posts.find(el => el.id === req.params.id)
  res.render(createPath('PostPage'), { title, post });
});

//POST//

router.post('/add-post', (req, res) => {
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

//DELETE//

router.delete('/posts/:id', (req, res) => {
  const title = 'Post';
  
  deletePost(req.params.id);
  
  const posts = postsJSON.posts;

  res.render(createPath('PostsPage'), { title, posts });
});

module.exports = router;