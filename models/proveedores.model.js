import { pool } from "../db/connection.js";

class ProveedoresModel {
    todos() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `proveedores`';
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
                const sql = 'SELECT * FROM `proveedores` WHERE id = ?';
                const [rows] = await pool.query(sql, [id]);
                return resolve(rows[0] || null);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    crear(nombre, correo, telefono) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'INSERT INTO `proveedores` (nombre, correo, telefono) VALUES (?, ?, ?)';
                const [result] = await pool.query(sql, [nombre, correo, telefono]);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    actualizar(id, nombre, correo, telefono) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'UPDATE `proveedores` SET nombre = ?, correo = ?, telefono = ? WHERE id = ?';
                const [result] = await pool.query(sql, [nombre, correo, telefono, id]);
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
                const sql = 'DELETE FROM `proveedores` WHERE id = ?';
                const [result] = await pool.query(sql, [id]);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}

export default new ProveedoresModel();