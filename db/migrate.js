import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const migrar = async () => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT || 3306
        });

        const dbName = process.env.DB_NAME || 'tecno_store';
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        await connection.query(`USE \`${dbName}\``);
        console.log(`Base de datos '${dbName}' lista.`);

        // 1. Tabla usuarios
        await connection.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                correo VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                rol ENUM('admin', 'empleado') NOT NULL DEFAULT 'empleado',
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Tabla proveedores
        await connection.query(`
            CREATE TABLE IF NOT EXISTS proveedores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                correo VARCHAR(100) NOT NULL,
                telefono VARCHAR(30) NOT NULL
            )
        `);

        // 3. Tabla equipos
        await connection.query(`
            CREATE TABLE IF NOT EXISTS equipos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                marca VARCHAR(60) NOT NULL,
                modelo VARCHAR(60) NOT NULL,
                precio DECIMAL(10, 2) NOT NULL,
                stock INT NOT NULL DEFAULT 0,
                proveedorId INT NULL,
                FOREIGN KEY (proveedorId) REFERENCES proveedores(id) ON DELETE SET NULL
            )
        `);

        // 4. Tabla clientes
        await connection.query(`
            CREATE TABLE IF NOT EXISTS clientes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                apellido VARCHAR(100) NOT NULL,
                correo VARCHAR(100) NOT NULL,
                telefono VARCHAR(30) NOT NULL
            )
        `);

        // 5. Tabla ventas (quinta entidad)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ventas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                clienteId INT NOT NULL,
                equipoId INT NOT NULL,
                cantidad INT NOT NULL,
                total DECIMAL(10, 2) NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (clienteId) REFERENCES clientes(id) ON DELETE CASCADE,
                FOREIGN KEY (equipoId) REFERENCES equipos(id) ON DELETE CASCADE
            )
        `);

        console.log('Las 5 tablas fueron creadas correctamente.');

        // Usuarios iniciales por defecto
        const [users] = await connection.query('SELECT id FROM usuarios LIMIT 1');
        if (users.length === 0) {
            const passAdmin = await bcrypt.hash('admin123', 10);
            const passEmpleado = await bcrypt.hash('empleado123', 10);

            await connection.query(
                'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
                [
                    'Administrador', 'admin@tecnostore.com', passAdmin, 'admin',
                    'Vendedor', 'empleado@tecnostore.com', passEmpleado, 'empleado'
                ]
            );
            console.log('Usuarios iniciales creados (admin@tecnostore.com / empleado@tecnostore.com).');
        }

        console.log('Migracion completada.');
    } catch (error) {
        console.error('Error en la migracion:', error.message);
    } finally {
        if (connection) await connection.end();
    }
};

migrar();