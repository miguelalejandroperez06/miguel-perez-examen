import { v4 as uuidv4 } from 'uuid';
import { registros } from '../db/db.js';

class TiendaController {
    listarTodos() {
        const proveedores = registros.filter((registro) => registro.tipo === 'proveedor');

        return {
            data: proveedores,
            status: proveedores.length > 0 ? 200 : 404,
            message: proveedores.length > 0 ? 'Proveedores encontrados' : 'No hay proveedores registrados',
        };
    }

    listarUno(idProveedor) {
        const proveedor = registros.find(
            (registro) => registro.tipo === 'proveedor' && registro.id === idProveedor
        );

        return {
            data: proveedor === null ? null : proveedor,
            status: proveedor ? 200 : 404,
            message: proveedor ? 'Proveedor encontrado' : 'Proveedor no encontrado',
        };
    }

    crearProveedor(nombre, correo, telefono) {
        if (!nombre || !correo || !telefono) {
            return {
                data: null,
                status: 400,
                message: 'Faltan datos del proveedor',
            };
        }

        const nuevoProveedor = {
            id: uuidv4(),
            tipo: 'proveedor',
            nombre,
            correo,
            telefono,
        };
        registros.push(nuevoProveedor);
        return {
            data: nuevoProveedor,
            status: 200,
            message: 'Proveedor creado',
        };
    }

    editarProveedor(idProveedor, nombre, correo, telefono) {
        const proveedorIndex = registros.findIndex(
            (registro) => registro.tipo === 'proveedor' && registro.id === idProveedor
        );

        if (proveedorIndex === -1) {
            return {
                data: null,
                status: 400,
                message: 'Proveedor no encontrado',
            };
        }

        if (!nombre || !correo || !telefono) {
            return {
                data: null,
                status: 400,
                message: 'Faltan datos del proveedor',
            };
        }

        registros[proveedorIndex] = {
            ...registros[proveedorIndex],
            nombre,
            correo,
            telefono,
        };

        return {
            data: registros[proveedorIndex],
            status: 200,
            message: 'Proveedor actualizado',
        };
    }

    eliminarProveedor(idProveedor) {
        for (let i = 0; i < registros.length; i++) {
            if (registros[i].tipo === 'proveedor' && registros[i].id === idProveedor) {
                registros.splice(i, 1);

                return {
                    data: null,
                    status: 200,
                    message: 'Proveedor eliminado',
                };
            }
        }

        return {
            data: null,
            status: 400,
            message: 'Proveedor no encontrado',
        };
    }

    listarTodosLosEquipos() {
        const equipos = registros.filter(
            (registro) => registro.tipo === 'equipo'
        );

        return {
            data: equipos,
            status: 200,
            message: equipos.length > 0
                ? 'Equipos encontrados'
                : 'No hay equipos registrados',
        };
    }

    listarUnEquipo(idEquipo) {
        const equipo = registros.find(
            (registro) =>
                registro.tipo === 'equipo' &&
                registro.id === idEquipo
        );

        return {
            data: equipo || null,
            status: equipo ? 200 : 404,
            message: equipo
                ? 'Equipo encontrado'
                : 'Equipo no encontrado',
        };
    }
    
    crearEquipo(nombre, marca, modelo, precio, stock) {
        if (!nombre || !marca || !modelo || !precio || !stock) {
            return {
                data: null,
                status: 400,
                message: 'Faltan datos indispensables',
            };
        }

        const nuevoEquipo = {
            id: uuidv4(),
            tipo: 'equipo',
            nombre,
            marca,
            modelo,
            precio,
            stock,
        };

        registros.push(nuevoEquipo);

        return {
            data: nuevoEquipo,
            status: 201,
            message: 'Equipo creado',
        };
    }

    editarEquipo(idEquipo, nombre, marca, modelo, precio, stock) {
        const equipoIndex = registros.findIndex(
            (registro) => registro.tipo === 'equipo' && registro.id === idEquipo
        );

        if (equipoIndex === -1) {
            return {
                data: null,
                status: 404,
                message: 'Equipo no encontrado',
            };
        }

        if (!nombre || !marca || !modelo || !precio || !stock) {
            return {
                data: null,
                status: 400,
                message: 'Faltan datos indispensables',
            };
        }

        registros[equipoIndex] = {
            ...registros[equipoIndex],
            nombre,
            marca,
            modelo,
            precio,
            stock,
        };

        return {
            data: registros[equipoIndex],
            status: 200,
            message: 'Equipo actualizado',
        };
    }

    eliminarEquipo(idEquipo) {
        for (let i = 0; i < registros.length; i++) {
            if (registros[i].tipo === 'equipo' && registros[i].id === idEquipo) {
                registros.splice(i, 1);

                return {
                    data: null,
                    status: 200,
                    message: 'Equipo eliminado',
                };
            }
        }

        return {
            data: null,
            status: 404,
            message: 'Equipo no encontrado',
        };
    }

    listarEquiposPorProveedor(idProveedor) {
        const proveedor = registros.find(
            (registro) => registro.tipo === 'proveedor' && registro.id === idProveedor
        );

        if (!proveedor) {
            return {
                data: null,
                status: 404,
                message: 'Proveedor no encontrado',
            };
        }

        const equipos = registros.filter(
            (registro) => registro.tipo === 'equipo' && registro.proveedorId === idProveedor
        );

        return {
            data: equipos,
            status: 200,
            message: equipos.length > 0
                ? 'Equipos del proveedor encontrados'
                : 'El proveedor no tiene equipos registrados',
        };
    }

    relacionarEquipoConProveedor(idEquipo, idProveedor) {
        const equipoIndex = registros.findIndex(
            (registro) => registro.tipo === 'equipo' && registro.id === idEquipo
        );

        if (equipoIndex === -1) {
            return {
                data: null,
                status: 404,
                message: 'Equipo no encontrado',
            };
        }

        const proveedor = registros.find(
            (registro) => registro.tipo === 'proveedor' && registro.id === idProveedor
        );

        if (!proveedor) {
            return {
                data: null,
                status: 404,
                message: 'Proveedor no encontrado',
            };
        }

        registros[equipoIndex].proveedorId = idProveedor;

        return {
            data: registros[equipoIndex],
            status: 200,
            message: 'Equipo relacionado con el proveedor',
        };
    }

    
}

const tiendaController = new TiendaController();
export default tiendaController;