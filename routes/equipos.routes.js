import express from 'express';
import equiposController from '../Controllers/equipos.controller.js';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', async (req, res) => {
    try {
        const response = await equiposController.mostrarTodos();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/proveedor/:proveedorId', async (req, res) => {
    try {
        const response = await equiposController.mostrarPorProveedor(req.params.proveedorId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await equiposController.mostrarUno(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Rutas protegidas
router.post('/', verificarToken, verificarRol('admin', 'empleado'), async (req, res) => {
    try {
        const { nombre, marca, modelo, precio, stock, proveedorId } = req.body;
        const response = await equiposController.crear(nombre, marca, modelo, precio, stock, proveedorId);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', verificarToken, verificarRol('admin', 'empleado'), async (req, res) => {
    try {
        const { nombre, marca, modelo, precio, stock, proveedorId } = req.body;
        const response = await equiposController.editar(req.params.id, nombre, marca, modelo, precio, stock, proveedorId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', verificarToken, verificarRol('admin'), async (req, res) => {
    try {
        const response = await equiposController.eliminar(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;