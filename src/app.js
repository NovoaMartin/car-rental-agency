require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDi = require('./config/di.js');
const { init: initCarModule } = require('./modules/car/module');
const { init: initUserModule } = require('./modules/user/module');
const { init: initReservationModule } = require('./modules/reservation/module');

const app = express();
const port = process.env.PORT || 80;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded());

nunjucks.configure('src/modules', {
  autoescape: true,
  express: app,
});

const container = configureDi();

initCarModule(app, container);
initUserModule(app, container);
initReservationModule(app, container);

app.listen(port, () => { console.log(`app listening at port ${port}`); });
