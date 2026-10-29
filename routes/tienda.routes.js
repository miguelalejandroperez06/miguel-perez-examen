import express from 'express';
import tiendaController from '../Controllers/tienda.controller.js';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    const response = tiendaController.listarTodos();
    res.status(response.status).json(response);
});

router.get('/equipos', (req, res) => {
    const response = tiendaController.listarTodosLosEquipos();
    res.status(response.status).json(response);
});

router.get('/equipos/:id', (req, res) => {
    const response = tiendaController.listarUnEquipo(req.params.id);
    res.status(response.status).json(response);
});

router.get('/equipos/proveedor/:id', (req, res) => {
    const response = tiendaController.listarEquiposPorProveedor(req.params.id);
    res.status(response.status).json(response);
});

router.post('/equipos', (req, res) => {
    const { nombre, marca, modelo, precio, stock } = req.body;
    const response = tiendaController.crearEquipo(
        nombre,
        marca,
        modelo,
        precio,
        stock
    );
    res.status(response.status).json(response);
});

router.put('/equipos/:id/proveedor', (req, res) => {
    const { proveedorId } = req.body;
    const response = tiendaController.relacionarEquipoConProveedor(
        req.params.id,
        proveedorId
    );
    res.status(response.status).json(response);
});

router.put('/equipos/:id', (req, res) => {
    const { nombre, marca, modelo, precio, stock } = req.body;
    const response = tiendaController.editarEquipo(
        req.params.id,
        nombre,
        marca,
        modelo,
        precio,
        stock
    );
    res.status(response.status).json(response);
});

router.delete('/equipos/:id', (req, res) => {
    const response = tiendaController.eliminarEquipo(req.params.id);
    res.status(response.status).json(response);
});

export default router;
