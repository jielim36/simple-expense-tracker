var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const {Pool} = require('pg');
const pgSession = require('connect-pg-simple')(session);
const { DBUSER, DBHOST, DBNAME, DBPASSWORD, DBPORT } = require('./config/config');

var indexRouter = require('./routes/web/index');
var authRouter = require('./routes/web/auth')
var expenseApiRouter = require('./routes/api/expense');
var authApiRouter = require('./routes/api/auth');

var app = express();

const dbPool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASSWORD,
  port: DBPORT,
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'sid',//设置cookie的name，默认值为: connect.sid
  secret: 'jielim36',//加密签名
  saveUninitialized: false,//是否为每次请求都设置一个cookie来存储session
  resave: true,//是否在每次请求时重新保存session （每次请求服务器时都会重置过期时间，也就是说如果在过期时间中未曾向服务器发送请求，才会过期。
  // store: new pgSession({
  //   dbPool,
  //   tableName: 'sessions'
  // }),
  cookie: {
    maxAge: 1000*60*60 * 24 * 7,//过期时间为一个星期
    httpOnly: true,
  },
}));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', expenseApiRouter);
app.use('/api', authApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  //响应我们自己的404页面
  res.render('404');
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
