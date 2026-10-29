import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

export const probarConexion = async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`Conectado exitosamente a la base de datos: ${process.env.DB_NAME}`);
        connection.release();
    } catch (error) {
        console.error(`Error conectando a la base de datos: ${error.message}`);
    }
};