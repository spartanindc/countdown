//Tools

const express  = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const moment   = require('moment');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const app  = express();
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8080;

//Configuration

const configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

//Express Setup

app.use(morgan('common'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

//Passport Setup

app.use(session({ secret: 'operationcantwaitanylonger' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
require('./app/routes.js')(app, passport);

//Server Launch
app.listen(port);
console.log('Server is running at ' + port);

//exports
module.exports = {app, jsonParser};
