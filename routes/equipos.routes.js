import express from 'express';
import equiposController from '../Controllers/equipos.controller.js';

const router = express.Router();

/* GET: Obtener todos los equipos */
router.get('/', async (req, res) => {
    try {
        const response = await equiposController.mostrarTodos();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* GET: Obtener equipos por proveedor */
router.get('/proveedor/:proveedorId', async (req, res) => {
    try {
        const response = await equiposController.mostrarPorProveedor(req.params.proveedorId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* GET: Obtener un equipo por ID */
router.get('/:id', async (req, res) => {
    try {
        const response = await equiposController.mostrarUno(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error);
    }
});

/* POST: Crear un nuevo equipo */
router.post('/', async (req, res) => {
    try {
        const { nombre, marca, modelo, precio, stock, proveedorId } = req.body;
        const response = await equiposController.crear(nombre, marca, modelo, precio, stock, proveedorId);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* PUT: Actualizar un equipo existente */
router.put('/:id', async (req, res) => {
    try {
        const { nombre, marca, modelo, precio, stock, proveedorId } = req.body;
        const response = await equiposController.editar(req.params.id, nombre, marca, modelo, precio, stock, proveedorId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* DELETE: Eliminar un equipo por ID */
router.delete('/:id', async (req, res) => {
    try {
        const response = await equiposController.eliminar(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;