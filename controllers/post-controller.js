const postsJSON = require('../data/posts.json');
const writePost = require('../helpers/writePost');
const deletePostFromJSON = require('../helpers/deletePost');
const createPath = require('../helpers/createPath');

const getPost = (req, res) => {
  const title = 'Post';
  const post = postsJSON.posts.find(el => el.id === req.params.id)
  res.render(createPath('PostPage'), { title, post });
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
  res.render(createPath('PostPage'), { title, post });
};

const deletePost = (req, res) => {
  const title = 'Post';
  
  deletePostFromJSON(req.params.id);
  
  const posts = postsJSON.posts;

  res.render(createPath('PostsPage'), { title, posts });
};

const getPosts = (req, res) => {
  const title = 'Posts';
  const posts = postsJSON.posts;
  
  res.render(createPath('PostsPage'), { title, posts });
}

module.exports = {
  getPost,
  addPost,
  deletePost,
  getPosts,
}