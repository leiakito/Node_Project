var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/list',function(req,res){//设置路由名称， req是用户求助信息，res是服务器响应信息
  var person = {name:'云游四海',age:'19'} //声明一个对象 ，添加模拟属性。 模拟数据 
  res.render('list',person);//加载路由模块——————-模块为view文件夹下html res.render()方法, 并且绑定数据         
});

app.get('/1',function(req,res){//设置路由名称，
  res.json("wjdiwaidhjwd");
});

app.get('/2',function(req,res){//设置路由名称，res.status(404).send('sorry, we cannot find that!')
  res.status(404).send('Sorry, we cannot find that!')
});

app.get('/3',function(req,res){
  res.json(null)
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
