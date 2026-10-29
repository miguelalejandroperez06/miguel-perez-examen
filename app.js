import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { probarConexion } from './db/connection.js';
import proveedoresRouter from './routes/proveedores.routes.js';
import equiposRouter from './routes/equipos.routes.js';
import clientesRouter from './routes/clientes.routes.js';

const app = express();

// conexion a la base de datos
probarConexion();

// Middlewares globales de lectura de datos y logs
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// rutas de api 
app.use('/api/proveedores', proveedoresRouter);
app.use('/api/equipos', equiposRouter);
app.use('/api/clientes', clientesRouter);

// Capturar ruta no encontrada (404)
app.use(function(req, res, next) {
  next(createError(404, 'La ruta solicitada no existe'));
});

// manejo de errores globales
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    data: null,
    message: err.message || 'Error interno del servidor'
  });
});

export default app;