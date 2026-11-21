import express from 'express';
import clientesController from '../Controllers/clientes.controller.js';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', verificarToken, async (req, res) => {
    try {
        const response = await clientesController.mostrarTodos();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:id', verificarToken, async (req, res) => {
    try {
        const response = await clientesController.mostrarUno(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post('/', verificarToken, verificarRol('admin', 'empleado'), async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono } = req.body;
        const response = await clientesController.crear(nombre, apellido, correo, telefono);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', verificarToken, verificarRol('admin', 'empleado'), async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono } = req.body;
        const response = await clientesController.editar(req.params.id, nombre, apellido, correo, telefono);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', verificarToken, verificarRol('admin'), async (req, res) => {
    try {
        const response = await clientesController.eliminar(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;