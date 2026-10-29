==================================================
          PROYECTO TECNO STORE - API REST
==================================================

DESCRIPCIÓN:
Backend para el proyecto "Tecno Store" desarrollado con Node.js, Express y MySQL. Maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para tres entidades utilizando variables de entorno (.env) y promesas.

Integrantes:
- Miguel Pérez
- Leanis Lizarzado
- Marck González

ENTIDADES:
1. Proveedores
2. Equipos
3. Clientes

--------------------------------------------------
1. REQUISITOS
--------------------------------------------------
- Node.js instalado
- XAMPP / MySQL corriendo en phpMyAdmin

--------------------------------------------------
2. PASOS PARA CORRER EL PROYECTO
--------------------------------------------------
1. Clonar el repositorio:
   git clone https://github.com/miguelalejandroperez06/miguel-perez-examen.git

2. Instalar las dependencias de Node:
   npm install

3. Configurar la Base de Datos:
   - Crear la base de datos `tecno_store` en phpMyAdmin.
   - Crear las tablas (proveedores, equipos, clientes).

4. Crear el archivo .env en la raíz del proyecto con lo siguiente:
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=tecno_store
   DB_PORT=3306

5. Iniciar el servidor:
   npx nodemon

Servidor activo en: http://localhost:3000

--------------------------------------------------
3. RUTAS DE LA API (ENDPOINTS)
--------------------------------------------------

PROVEEDORES:
- GET    /api/proveedores          -> Obtener todos los proveedores
- GET    /api/proveedores/:id      -> Obtener un proveedor por ID
- POST   /api/proveedores          -> Crear un proveedor
- PUT    /api/proveedores/:id      -> Editar un proveedor
- DELETE /api/proveedores/:id      -> Eliminar un proveedor

EQUIPOS:
- GET    /api/equipos              -> Obtener todos los equipos
- GET    /api/equipos/:id          -> Obtener un equipo por ID
- GET    /api/equipos/proveedor/:id -> Obtener equipos de un proveedor
- POST   /api/equipos              -> Crear un equipo
- PUT    /api/equipos/:id          -> Editar un equipo
- DELETE /api/equipos/:id          -> Eliminar un equipo

CLIENTES:
- GET    /api/clientes             -> Obtener todos los clientes
- GET    /api/clientes/:id         -> Obtener un cliente por ID
- POST   /api/clientes             -> Crear un cliente
- PUT    /api/clientes/:id         -> Editar un cliente
- DELETE /api/clientes/:id         -> Eliminar un cliente
==================================================