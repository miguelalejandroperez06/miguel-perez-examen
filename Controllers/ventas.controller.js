import ventasModel from '../models/ventas.model.js';

class VentasController {
    mostrarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const ventas = await ventasModel.todos();
                return resolve({
                    data: ventas,
                    message: "Ventas obtenidas exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al obtener las ventas"
                });
            }
        });
    }

    mostrarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const venta = await ventasModel.uno(id);
                if (!venta) {
                    return reject({
                        data: null,
                        message: "Venta no encontrada"
                    });
                }
                return resolve({
                    data: venta,
                    message: "Venta encontrada"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al buscar la venta"
                });
            }
        });
    }

    crear(clienteId, equipoId, cantidad, total) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!clienteId || !equipoId || !cantidad || !total) {
                    return reject({
                        data: null,
                        message: "Faltan datos obligatorios: clienteId, equipoId, cantidad y total"
                    });
                }
                if (isNaN(cantidad) || Number(cantidad) <= 0 || isNaN(total) || Number(total) <= 0) {
                    return reject({
                        data: null,
                        message: "La cantidad y el total deben ser valores numéricos mayores a cero"
                    });
                }

                const result = await ventasModel.crear(clienteId, equipoId, cantidad, total);
                return resolve({
                    data: { id: result.insertId, clienteId, equipoId, cantidad, total },
                    message: "Venta registrada exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al registrar la venta"
                });
            }
        });
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await ventasModel.eliminar(id);
                if (result.affectedRows === 0) {
                    return reject({
                        data: null,
                        message: "No se encontró la venta a eliminar"
                    });
                }
                return resolve({
                    data: null,
                    message: "Venta eliminada exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al eliminar la venta"
                });
            }
        });
    }
}

export default new VentasController();