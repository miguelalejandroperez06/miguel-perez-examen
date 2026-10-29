import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
//hola
//import indexRouter from './routes/index';
// import usersRouter from './routes/users';
//import tiendaRouter from './routes/tienda.routes.js';
//import proveedoresRouter from './routes/proveedores.routes.js';
import proveedoresRouter from './routes/proveedores.routes.js';
import equiposRouter from './routes/equipos.routes.js';
import clientesRouter from './routes/clientes.routes.js';
const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use('/api/proveedores', proveedoresRouter);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/equipos', equiposRouter);
app.use('/api/clientes', clientesRouter);
//app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/tienda', tiendaRouter);
//app.use('/users', usersRouter);

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

export default app;