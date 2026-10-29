import { pool } from "../db/connection.js";

class ClientesModel {
    todos() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `clientes`';
                const [rows] = await pool.query(sql);
                return resolve(rows);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    uno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `clientes` WHERE id = ?';
                const [rows] = await pool.query(sql, [id]);
                return resolve(rows[0] || null);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    crear(nombre, apellido, correo, telefono) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'INSERT INTO `clientes` (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)';
                const [result] = await pool.query(sql, [nombre, apellido, correo, telefono]);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    actualizar(id, nombre, apellido, correo, telefono) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'UPDATE `clientes` SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id = ?';
                const [result] = await pool.query(sql, [nombre, apellido, correo, telefono, id]);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'DELETE FROM `clientes` WHERE id = ?';
                const [result] = await pool.query(sql, [id]);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}

export default new ClientesModel();