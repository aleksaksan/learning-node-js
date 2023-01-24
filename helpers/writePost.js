const fs = require('fs');
const path = require('path');
const oldData = require('../data/posts.json');


const writePost = async (data) => {

  const createPath = () => path.resolve(__dirname, '../data', 'posts.json');

  const newData = {
    posts: [data,...oldData.posts]
  };

  fs.writeFile(createPath(), JSON.stringify(newData), (err) => {
    if (err) console.log(err);
  });
};

module.exports = writePost;
