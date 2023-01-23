const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

router.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'YouTube', link: 'https://youtube.com' },
    { name: 'Google', link: 'https://google.com' },
    { name: 'GitHub', link: 'https://github.com/' },
  ];
  res.render(createPath('ContactsPage'), { contacts, title });
});

module.exports = router;