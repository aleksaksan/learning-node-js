const express = require('express');
const {
  getPost,
  addPost,
  deletePost
} = require('../controllers/post-controller');

const router = express.Router();

router.get('/posts/:id', getPost);
router.post('/add-post', addPost);
router.delete('/posts/:id', deletePost);

module.exports = router;