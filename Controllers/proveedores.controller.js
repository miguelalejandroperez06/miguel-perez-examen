import proveedoresModel from '../models/proveedores.model.js';

class ProveedoresController {
    mostrarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const proveedores = await proveedoresModel.todos();
                return resolve({
                    data: proveedores,
                    message: "Proveedores obtenidos exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al obtener los proveedores"
                });
            }
        });
    }

    mostrarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const proveedor = await proveedoresModel.uno(id);
                if (!proveedor) {
                    return reject({
                        data: null,
                        message: "Proveedor no encontrado"
                    });
                }
                return resolve({
                    data: proveedor,
                    message: "Proveedor encontrado"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al buscar el proveedor"
                });
            }
        });
    }

    crear(nombre, correo, telefono) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nombre || !correo || !telefono) {
                    return reject({
                        data: null,
                        message: "Faltan datos obligatorios del proveedor"
                    });
                }
                const result = await proveedoresModel.crear(nombre, correo, telefono);
                return resolve({
                    data: { id: result.insertId, nombre, correo, telefono },
                    message: "Proveedor creado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al crear el proveedor"
                });
            }
        });
    }

    editar(id, nombre, correo, telefono) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nombre || !correo || !telefono) {
                    return reject({
                        data: null,
                        message: "Faltan datos obligatorios para actualizar"
                    });
                }
                const result = await proveedoresModel.actualizar(id, nombre, correo, telefono);
                if (result.affectedRows === 0) {
                    return reject({
                        data: null,
                        message: "No se encontró el proveedor a actualizar"
                    });
                }
                return resolve({
                    data: { id, nombre, correo, telefono },
                    message: "Proveedor actualizado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al actualizar el proveedor"
                });
            }
        });
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await proveedoresModel.eliminar(id);
                if (result.affectedRows === 0) {
                    return reject({
                        data: null,
                        message: "No se encontró el proveedor a eliminar"
                    });
                }
                return resolve({
                    data: null,
                    message: "Proveedor eliminado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al eliminar el proveedor"
                });
            }
        });
    }
}

export default new ProveedoresController();