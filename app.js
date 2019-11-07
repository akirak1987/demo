var createError = require('http-errors');
var express = require('express');
var engine = require('ejs-mate');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var olRouter = require('./routes/ol');
var websocketRouter = require('./routes/websocket');
var paginationRouter = require('./routes/pagination');

var app = express();
app.engine('ejs',engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/demo1', olRouter);
app.use('/demo2', websocketRouter);
app.use('/demo3', paginationRouter); 

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js'));
app.use('/js', express.static(__dirname + '/node_modules/holderjs'));
app.use('/js', express.static(__dirname + '/node_modules/jspdf/dist'));
app.use('/js', express.static(__dirname + '/node_modules/socket.io-client/dist'));
app.use('/js', express.static(__dirname + '/node_modules/moment'));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));

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
