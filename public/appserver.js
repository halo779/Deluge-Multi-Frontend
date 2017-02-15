'use strct';

let bodyParser = require('body-parser');
let compression = require('compression');
let cookieParser = require('cookie-parser');
let express = require('express');
let path = require('path');

let routes = require('./routes/route');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', routes);
module.exports = app;