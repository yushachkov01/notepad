const createError = require('http-errors');
const express = require('express');
const path = require('path');
const hbs = require('hbs')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/notepad', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Успешно подключились к базе'))


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const secretKey = '622aaf93f186dfee827a08b4bee35dd113574435ac2e945853dad4825e84e13be4342a4a3dc575fc39c4a8c8d549718b808e30fe1bdbde6ac6afd818c7a96a56'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.email = req.session.user.email; // записываем в локалс юзера из сессии

  }
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
