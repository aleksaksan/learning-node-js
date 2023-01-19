const express = require('express');

const app = express();

const PORT = 5000;

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
