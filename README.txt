==================================================
          PROYECTO TECNO STORE - API REST
==================================================

DESCRIPCIÓN:
Backend y vistas web para el proyecto "Tecno Store" desarrollado con Node.js, Express, EJS y MySQL. Maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cinco entidades utilizando variables de entorno (.env), promesas, autenticación mediante JSON Web Tokens (JWT), cifrado de contraseñas con bcrypt y control de acceso por roles.

Integrantes:
- Miguel Pérez
- Leanis Lizarzado
- Marck González

ENTIDADES:
1. Usuarios
2. Proveedores
3. Equipos
4. Clientes
5. Ventas

--------------------------------------------------
1. REQUISITOS
--------------------------------------------------
- Node.js instalado
- XAMPP / MySQL corriendo

--------------------------------------------------
2. PASOS PARA CORRER EL PROYECTO
--------------------------------------------------
1. Clonar el repositorio:
   git clone https://github.com/miguelalejandroperez06/miguel-perez-examen.git

2. Instalar las dependencias de Node:
   npm install

3. Configurar archivos excluidos (.env):
   El archivo .env no se sube al repositorio por seguridad (.gitignore). Debe crearse en la raíz del proyecto tomando como base .env.example con la siguiente estructura:
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=tecno_store
   DB_PORT=3306
   JWT_SECRET=clave_secreta_tecnostore_2026
   JWT_EXPIRES=2h

4. Ejecutar la migración de la Base de Datos:
   Para crear automáticamente la base de datos `tecno_store`, las 5 tablas con sus relaciones y los usuarios iniciales con contraseñas cifradas, correr:
   npm run migrate

   Usuarios creados por defecto en la migración:
   - Rol admin: admin@tecnostore.com / admin123
   - Rol empleado: empleado@tecnostore.com / empleado123

5. Iniciar el servidor:
   npm start

Servidor activo en: http://localhost:3000

--------------------------------------------------
3. RUTAS DE LA API (ENDPOINTS) Y VISTAS
--------------------------------------------------

VISTAS WEB (EJS + Bootstrap 5):
- GET    /                         -> Página principal
- GET    /vista/login              -> Formulario de inicio de sesión
- GET    /vista/equipos            -> Vista de equipos
- GET    /vista/proveedores        -> Vista de proveedores
- GET    /vista/clientes           -> Vista de clientes
- GET    /vista/ventas             -> Vista de ventas

AUTENTICACIÓN Y USUARIOS:
- POST   /api/auth/registro        -> Registrar nuevo usuario (Público)
- POST   /api/auth/login           -> Iniciar sesión y obtener token JWT (Público)
- GET    /api/auth/usuarios        -> Listar usuarios registrados (Solo rol: admin)

PROVEEDORES:
- GET    /api/proveedores          -> Obtener todos los proveedores (Público)
- GET    /api/proveedores/:id      -> Obtener un proveedor por ID (Público)
- POST   /api/proveedores          -> Crear un proveedor (Solo rol: admin)
- PUT    /api/proveedores/:id      -> Editar un proveedor (Solo rol: admin)
- DELETE /api/proveedores/:id      -> Eliminar un proveedor (Solo rol: admin)

EQUIPOS:
- GET    /api/equipos              -> Obtener todos los equipos (Público)
- GET    /api/equipos/:id          -> Obtener un equipo por ID (Público)
- GET    /api/equipos/proveedor/:id -> Obtener equipos de un proveedor (Público)
- POST   /api/equipos              -> Crear un equipo (Roles: admin, empleado)
- PUT    /api/equipos/:id          -> Editar un equipo (Roles: admin, empleado)
- DELETE /api/equipos/:id          -> Eliminar un equipo (Solo rol: admin)

CLIENTES:
- GET    /api/clientes             -> Obtener todos los clientes (Requiere Token)
- GET    /api/clientes/:id         -> Obtener un cliente por ID (Requiere Token)
- POST   /api/clientes             -> Crear un cliente (Roles: admin, empleado)
- PUT    /api/clientes/:id         -> Editar un cliente (Roles: admin, empleado)
- DELETE /api/clientes/:id         -> Eliminar un cliente (Solo rol: admin)

VENTAS:
- GET    /api/ventas               -> Obtener todas las ventas (Requiere Token)
- GET    /api/ventas/:id           -> Obtener una venta por ID (Requiere Token)
- POST   /api/ventas               -> Registrar una venta (Roles: admin, empleado)
- DELETE /api/ventas/:id           -> Eliminar una venta (Solo rol: admin)

==================================================

SEGURIDAD:
- Protección contra Inyección SQL mediante consultas parametrizadas en todos los modelos con MySQL.
- Contraseñas cifradas con bcryptjs antes de almacenarse en la base de datos.
- Gestión de sesiones y validación de permisos por rol mediante JSON Web Tokens (JWT).