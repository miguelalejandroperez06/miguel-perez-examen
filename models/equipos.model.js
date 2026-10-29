import { pool } from "../db/connection.js";

class EquiposModel {
    todos() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `equipos`';
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
                const sql = 'SELECT * FROM `equipos` WHERE id = ?';
                const [rows] = await pool.query(sql, [id]);
                return resolve(rows[0] || null);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    crear(nombre, marca, modelo, precio, stock, proveedorId) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'INSERT INTO `equipos` (nombre, marca, modelo, precio, stock, proveedorId) VALUES (?, ?, ?, ?, ?, ?)';
                const [result] = await pool.query(sql, [nombre, marca, modelo, precio, stock, proveedorId || null]);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    actualizar(id, nombre, marca, modelo, precio, stock, proveedorId) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'UPDATE `equipos` SET nombre = ?, marca = ?, modelo = ?, precio = ?, stock = ?, proveedorId = ? WHERE id = ?';
                const [result] = await pool.query(sql, [nombre, marca, modelo, precio, stock, proveedorId || null, id]);
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
                const sql = 'DELETE FROM `equipos` WHERE id = ?';
                const [result] = await pool.query(sql, [id]);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    porProveedor(proveedorId) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `equipos` WHERE proveedorId = ?';
                const [rows] = await pool.query(sql, [proveedorId]);
                return resolve(rows);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}

export default new EquiposModel();