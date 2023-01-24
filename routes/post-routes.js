const express = require('express');
const {
  getPost,
  addPost,
  deletePost,
  getPosts
} = require('../controllers/post-controller');

const router = express.Router();

router.get('/posts/:id', getPost);
router.post('/add-post', addPost);
router.delete('/posts/:id', deletePost);
router.get('/posts', getPosts);

module.exports = router;