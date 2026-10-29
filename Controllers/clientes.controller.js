import clientesModel from '../models/clientes.model.js';

class ClientesController {
    mostrarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const clientes = await clientesModel.todos();
                return resolve({
                    data: clientes,
                    message: "Clientes obtenidos exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al obtener los clientes"
                });
            }
        });
    }

    mostrarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const cliente = await clientesModel.uno(id);
                if (!cliente) {
                    return reject({
                        data: null,
                        message: "Cliente no encontrado"
                    });
                }
                return resolve({
                    data: cliente,
                    message: "Cliente encontrado"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al buscar el cliente"
                });
            }
        });
    }

    crear(nombre, apellido, correo, telefono) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nombre || !apellido || !correo || !telefono) {
                    return reject({
                        data: null,
                        message: "Faltan datos obligatorios del cliente"
                    });
                }
                const result = await clientesModel.crear(nombre, apellido, correo, telefono);
                return resolve({
                    data: { id: result.insertId, nombre, apellido, correo, telefono },
                    message: "Cliente creado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al crear el cliente"
                });
            }
        });
    }

    editar(id, nombre, apellido, correo, telefono) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nombre || !apellido || !correo || !telefono) {
                    return reject({
                        data: null,
                        message: "Faltan datos obligatorios para actualizar"
                    });
                }
                const result = await clientesModel.actualizar(id, nombre, apellido, correo, telefono);
                if (result.affectedRows === 0) {
                    return reject({
                        data: null,
                        message: "No se encontró el cliente a actualizar"
                    });
                }
                return resolve({
                    data: { id, nombre, apellido, correo, telefono },
                    message: "Cliente actualizado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al actualizar el cliente"
                });
            }
        });
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await clientesModel.eliminar(id);
                if (result.affectedRows === 0) {
                    return reject({
                        data: null,
                        message: "No se encontró el cliente a eliminar"
                    });
                }
                return resolve({
                    data: null,
                    message: "Cliente eliminado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al eliminar el cliente"
                });
            }
        });
    }
}

export default new ClientesController();