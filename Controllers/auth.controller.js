import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import usuariosModel from '../models/usuarios.model.js';

dotenv.config();

class AuthController {
    registrar(nombre, correo, password, rol) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nombre || !correo || !password) {
                    return reject({
                        data: null,
                        message: "Faltan datos obligatorios: nombre, correo y password"
                    });
                }

                const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexCorreo.test(correo)) {
                    return reject({
                        data: null,
                        message: "El formato del correo electrónico no es válido"
                    });
                }

                if (password.length < 6) {
                    return reject({
                        data: null,
                        message: "La contraseña debe tener al menos 6 caracteres"
                    });
                }

                const rolAsignado = (rol === 'admin' || rol === 'empleado') ? rol : 'empleado';

                const existente = await usuariosModel.buscarPorCorreo(correo);
                if (existente) {
                    return reject({
                        data: null,
                        message: "Ya existe un usuario registrado con ese correo"
                    });
                }

                const passwordHash = await bcrypt.hash(password, 10);
                const result = await usuariosModel.crear(nombre, correo, passwordHash, rolAsignado);

                return resolve({
                    data: { id: result.insertId, nombre, correo, rol: rolAsignado },
                    message: "Usuario registrado exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al registrar el usuario"
                });
            }
        });
    }

    login(correo, password) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!correo || !password) {
                    return reject({
                        data: null,
                        message: "Debe enviar correo y password"
                    });
                }

                const usuario = await usuariosModel.buscarPorCorreo(correo);
                if (!usuario) {
                    return reject({
                        data: null,
                        message: "Credenciales incorrectas"
                    });
                }

                const passwordValida = await bcrypt.compare(password, usuario.password);
                if (!passwordValida) {
                    return reject({
                        data: null,
                        message: "Credenciales incorrectas"
                    });
                }

                const payload = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    rol: usuario.rol
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES || '2h'
                });

                return resolve({
                    data: {
                        token,
                        usuario: payload
                    },
                    message: "Inicio de sesión exitoso"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al iniciar sesión"
                });
            }
        });
    }

    listarUsuarios() {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarios = await usuariosModel.todos();
                return resolve({
                    data: usuarios,
                    message: "Usuarios obtenidos exitosamente"
                });
            } catch (error) {
                return reject({
                    data: null,
                    message: "Error al obtener usuarios"
                });
            }
        });
    }
}

export default new AuthController();