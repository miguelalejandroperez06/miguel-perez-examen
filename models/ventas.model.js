import { pool } from "../db/connection.js";

class VentasModel {
    todos() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = `
                    SELECT v.id, v.cantidad, v.total, v.fecha,
                           c.nombre AS cliente, e.nombre AS equipo
                    FROM ventas v
                    INNER JOIN clientes c ON v.clienteId = c.id
                    INNER JOIN equipos e ON v.equipoId = e.id
                `;
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
                const sql = 'SELECT * FROM `ventas` WHERE id = ?';
                const [rows] = await pool.query(sql, [id]);
                return resolve(rows[0] || null);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }

    crear(clienteId, equipoId, cantidad, total) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'INSERT INTO `ventas` (clienteId, equipoId, cantidad, total) VALUES (?, ?, ?, ?)';
                const [result] = await pool.query(sql, [clienteId, equipoId, cantidad, total]);
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
                const sql = 'DELETE FROM `ventas` WHERE id = ?';
                const [result] = await pool.query(sql, [id]);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}

export default new VentasModel();