import express from 'express';
import ventasController from '../Controllers/ventas.controller.js';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', verificarToken, async (req, res) => {
    try {
        const response = await ventasController.mostrarTodos();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:id', verificarToken, async (req, res) => {
    try {
        const response = await ventasController.mostrarUno(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post('/', verificarToken, verificarRol('admin', 'empleado'), async (req, res) => {
    try {
        const { clienteId, equipoId, cantidad, total } = req.body;
        const response = await ventasController.crear(clienteId, equipoId, cantidad, total);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', verificarToken, verificarRol('admin'), async (req, res) => {
    try {
        const response = await ventasController.eliminar(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;