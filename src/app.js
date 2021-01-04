require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDi = require('./config/di.js');
const { init } = require('./modules/car/module');

const app = express();
const port = process.env.PORT || 80;

app.use(express.static('public'));

nunjucks.configure('src/modules', {
  autoescape: true,
  express: app,
});

const container = configureDi();

init(app, container);

app.listen(port, () => { console.log(`app listening at port ${port}`); });
