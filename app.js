import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { probarConexion } from './db/connection.js';
import authRouter from './routes/auth.routes.js';
import proveedoresRouter from './routes/proveedores.routes.js';
import equiposRouter from './routes/equipos.routes.js';
import clientesRouter from './routes/clientes.routes.js';
import ventasRouter from './routes/ventas.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Conexión a la base de datos
probarConexion();

// Middlewares globales
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de Vistas (EJS + Bootstrap 5)
app.get('/', (req, res) => res.render('index'));
app.get('/vista/login', (req, res) => res.render('login'));
app.get('/vista/equipos', (req, res) => res.render('modulo', { titulo: 'Equipos', endpoint: '/api/equipos' }));
app.get('/vista/proveedores', (req, res) => res.render('modulo', { titulo: 'Proveedores', endpoint: '/api/proveedores' }));
app.get('/vista/clientes', (req, res) => res.render('modulo', { titulo: 'Clientes', endpoint: '/api/clientes' }));
app.get('/vista/ventas', (req, res) => res.render('modulo', { titulo: 'Ventas', endpoint: '/api/ventas' }));

// Rutas de API REST
app.use('/api/auth', authRouter);
app.use('/api/proveedores', proveedoresRouter);
app.use('/api/equipos', equiposRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/ventas', ventasRouter);

// Capturar ruta no encontrada (404)
app.use(function(req, res, next) {
  next(createError(404, 'La ruta solicitada no existe'));
});

// Manejo de errores globales
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    data: null,
    message: err.message || 'Error interno del servidor'
  });
});

export default app;