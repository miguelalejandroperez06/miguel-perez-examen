import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

    if (!token) {
        return res.status(401).json({
            data: null,
            message: 'Token inexistente. Debe iniciar sesion para continuar.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                data: null,
                message: 'El token ha expirado. Inicie sesion nuevamente.'
            });
        }
        return res.status(403).json({
            data: null,
            message: 'Token invalido.'
        });
    }
};

export const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                data: null,
                message: `Advertencia: el rol '${req.usuario?.rol || 'sin rol'}' no tiene permiso para realizar esta operacion.`
            });
        }
        next();
    };
};