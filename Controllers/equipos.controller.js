import equiposModel from '../models/equipos.model.js';

class EquiposController {
    mostrarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const equipos = await equiposModel.todos();
                return resolve({
                    data: equipos,
                    message: "Equipos obtenidos exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al obtener los equipos"
                });
            }
        });
    }

    mostrarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const equipo = await equiposModel.uno(id);
                if (!equipo) {
                    return reject({
                        data: null,
                        message: "Equipo no encontrado"
                    });
                }
                return resolve({
                    data: equipo,
                    message: "Equipo encontrado"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al buscar el equipo"
                });
            }
        });
    }

    crear(nombre, marca, modelo, precio, stock, proveedorId) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nombre || !marca || !modelo || precio === undefined || stock === undefined) {
                    return reject({
                        data: null,
                        message: "Faltan datos obligatorios del equipo"
                    });
                }
                const result = await equiposModel.crear(nombre, marca, modelo, precio, stock, proveedorId);
                return resolve({
                    data: { id: result.insertId, nombre, marca, modelo, precio, stock, proveedorId },
                    message: "Equipo creado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al crear el equipo"
                });
            }
        });
    }

    editar(id, nombre, marca, modelo, precio, stock, proveedorId) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nombre || !marca || !modelo || precio === undefined || stock === undefined) {
                    return reject({
                        data: null,
                        message: "Faltan datos obligatorios para actualizar el equipo"
                    });
                }
                const result = await equiposModel.actualizar(id, nombre, marca, modelo, precio, stock, proveedorId);
                if (result.affectedRows === 0) {
                    return reject({
                        data: null,
                        message: "No se encontró el equipo a actualizar"
                    });
                }
                return resolve({
                    data: { id, nombre, marca, modelo, precio, stock, proveedorId },
                    message: "Equipo actualizado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al actualizar el equipo"
                });
            }
        });
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await equiposModel.eliminar(id);
                if (result.affectedRows === 0) {
                    return reject({
                        data: null,
                        message: "No se encontró el equipo a eliminar"
                    });
                }
                return resolve({
                    data: null,
                    message: "Equipo eliminado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al eliminar el equipo"
                });
            }
        });
    }

    mostrarPorProveedor(proveedorId) {
        return new Promise(async (resolve, reject) => {
            try {
                const equipos = await equiposModel.porProveedor(proveedorId);
                return resolve({
                    data: equipos,
                    message: "Equipos del proveedor obtenidos exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al obtener los equipos del proveedor"
                });
            }
        });
    }
}

export default new EquiposController();