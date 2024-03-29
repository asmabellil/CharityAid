var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var membersRouter = require('./routes/members');
var associationsRouter = require('./routes/associations');
var eventsRouter = require('./routes/events');
var tasksRouter = require('./routes/tasks');
var subscribersRouter = require('./routes/subscribers');
var contactsRouter = require('./routes/contacts');
var caissesRouter = require('./routes/caisses');
var chatRouter = require('./routes/chat')

var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var fileupload = require('express-fileupload'); 


// import mongoDB
var mongoose = require("mongoose");
var config = require("./database/mongodb");
var cors = require("cors");

var app = express();

config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({  limit: '50mb', extended: true  }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileupload({useTempFiles: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/members', membersRouter);
app.use('/associations', associationsRouter);
app.use('/events', eventsRouter);
app.use('/tasks', tasksRouter);
app.use('/subscribers', subscribersRouter);
app.use('/contacts', contactsRouter);
app.use('/caisses', caissesRouter);
app.use('/chat', chatRouter);

// CORS HEADERS MIDDELWARE 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
