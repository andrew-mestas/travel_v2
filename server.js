const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5555;

app.get('/', (req, res) => {
  res.send({MSG: 'API'});
});

module.exports = exports = app.listen(PORT, () => console.log('server up on port: ' + PORT));
