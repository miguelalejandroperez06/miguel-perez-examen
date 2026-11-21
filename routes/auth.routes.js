import express from 'express';
import authController from '../Controllers/auth.controller.js';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/registro', async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;
        const response = await authController.registrar(nombre, correo, password, rol);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const response = await authController.login(correo, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json(error);
    }
});

router.get('/usuarios', verificarToken, verificarRol('admin'), async (req, res) => {
    try {
        const response = await authController.listarUsuarios();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;