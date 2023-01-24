const postsJSON = require('../data/posts.json');
const writePost = require('../helpers/writePost');
const deletePostFromJSON = require('../helpers/deletePost');

const getPost = (req, res) => {
  const post = postsJSON.posts.find(el => el.id === req.params.id);
  res.statusCode = 200;
  res.send(post);
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = {
    id: new Date(),
    date: (new Date()).toLocaleDateString(),
    title,
    author,
    text,
  };
  writePost(post);
  res.statusCode = 201;
  res.send(post);
};

const deletePost = (req, res) => {
  deletePostFromJSON(req.params.id);
  res.statusCode = 200;
  res.send(req.params.id);
};

const getPosts = (req, res) => {
  const posts = postsJSON.posts;
  res.statusCode = 200;
  res.send(posts);
}

module.exports = {
  getPost,
  addPost,
  deletePost,
  getPosts,
}