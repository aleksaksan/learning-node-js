const fs = require('fs');
const path = require('path');
const oldData = require('../data/posts.json');


const deletePost = async (postId) => {

  const createPath = () => path.resolve(__dirname, '../data', 'posts.json');
  
  const newData = {
    posts: oldData.posts.filter(post => post.id !== postId)
  };

  fs.writeFile(createPath(), JSON.stringify(newData), (err) => {
    if (err) console.log(err);
  });
};

module.exports = deletePost;
