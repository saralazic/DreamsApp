var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var typeRouter = require('./routes/type');
var dreamRouter = require('./routes/dream')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 5000;



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});


var mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sara:p0c0kM3r3g@cluster0.abhl2.mongodb.net/dreamsDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => console.log(err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/types', typeRouter);
app.use('/dreams', dreamRouter);


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


