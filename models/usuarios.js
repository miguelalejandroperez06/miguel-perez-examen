import { pool } from "../db/connection.js";

class UsuariosModel {
    todos() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT id, nombre, correo, rol, creado_en FROM `usuarios`';
                const [rows] = await pool.query(sql);
                return resolve(rows);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    buscarPorCorreo(correo) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `usuarios` WHERE correo = ?';
                const [rows] = await pool.query(sql, [correo]);
                return resolve(rows[0] || null);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    crear(nombre, correo, passwordHash, rol) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'INSERT INTO `usuarios` (nombre, correo, password, rol) VALUES (?, ?, ?, ?)';
                const [result] = await pool.query(sql, [nombre, correo, passwordHash, rol || 'empleado']);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}

export default new UsuariosModel();