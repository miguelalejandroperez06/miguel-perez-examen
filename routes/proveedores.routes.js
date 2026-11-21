import express from 'express';
import proveedoresController from '../Controllers/proveedores.controller.js';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas (sin login)
router.get('/', async (req, res) => {
    try {
        const response = await proveedoresController.mostrarTodos();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await proveedoresController.mostrarUno(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Rutas protegidas (solo admin)
router.post('/', verificarToken, verificarRol('admin'), async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;
        const response = await proveedoresController.crear(nombre, correo, telefono);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', verificarToken, verificarRol('admin'), async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;
        const response = await proveedoresController.editar(req.params.id, nombre, correo, telefono);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', verificarToken, verificarRol('admin'), async (req, res) => {
    try {
        const response = await proveedoresController.eliminar(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;