import express from 'express';
import proveedoresController from '../Controllers/proveedores.controller.js';

const router = express.Router();

/* GET: Obtener todos los proveedores */
router.get('/', async (req, res) => {
    try {
        const response = await proveedoresController.mostrarTodos();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* GET: Obtener un proveedor por ID */
router.get('/:id', async (req, res) => {
    try {
        const response = await proveedoresController.mostrarUno(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error);
    }
});

/* POST: Crear un nuevo proveedor */
router.post('/', async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;
        const response = await proveedoresController.crear(nombre, correo, telefono);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* PUT: Actualizar un proveedor existente */
router.put('/:id', async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;
        const response = await proveedoresController.editar(req.params.id, nombre, correo, telefono);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

/* DELETE: Eliminar un proveedor por ID */
router.delete('/:id', async (req, res) => {
    try {
        const response = await proveedoresController.eliminar(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;