const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const server = http.createServer((req, res) => {
  console.log('Server request!');

  res.setHeader('Content-Type', 'text/html');

  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

  let basePath = '';

  switch(req.url) {
    case '/':
    case '/home':
    case '/index.html':
      basePath = createPath('HomePage');
      res.statusCode = 200;
      break;
    case '/contacts':
      basePath = createPath('Contacts');
      res.statusCode = 200;
      break;
    case '/about':
      res.statusCode = 301;
      res.setHeader('Location', '/contacts');
      res.end();
      break;
    default:
      basePath = createPath('NotFoundPage');
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.end();
      }
      else {
        res.write(data);
        res.end();
      }
    });
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
