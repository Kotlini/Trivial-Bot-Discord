const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/commande', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "pages", "commande.html"));
})

app.listen(port);
module.exports = app;
