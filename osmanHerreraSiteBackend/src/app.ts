import dotenv from 'dotenv';
import path from 'path';

// --- 0. CARGA DE VARIABLES DE ENTORNO ---
// Esto busca el .env subiendo dos niveles desde la carpeta 'dist'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import rateLimit from 'express-rate-limit';
import emailRoutes from './routes/email-routes';

const app = express();

// --- 1. CONFIGURACIÓN DE PROXY (Necesario para Nginx) ---
app.set('trust proxy', 1);

// --- 2. SEGURIDAD: CORS Y WHITELIST ---
const whiteList = [
    'https://www.osmanherrera.dev',
    'https://osmanherrera.dev',
    'http://www.osmanherrera.dev',
    'http://osmanherrera.dev',
    'http://localhost:5173',
    'http://localhost:4200',
];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200
};

// --- 3. LIMITADOR DE PETICIONES (Relajado para pruebas) ---
const emailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 100, // Lo subimos a 100 para que no te bloquee mientras testeamos
    message: { ok: false, msg: 'Límite de envíos excedido.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        console.warn(`[RATE LIMIT] IP bloqueada: ${req.ip}`);
        res.status(options.statusCode).json(options.message);
    }
});

// --- 4. MIDDLEWARES GLOBALES ---
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

// --- 5. RUTAS DE LA API ---
app.use('/api/email', emailLimiter, (req: Request, res: Response, next: NextFunction) => {
    const origin = req.get('origin');
    if (origin && !whiteList.includes(origin)) {
        return res.status(403).json({
            ok: false,
            msg: 'Acceso denegado: Petición no autorizada.'
        });
    }
    next();
}, emailRoutes);

// --- 6. MANEJO DE SPA ---
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- 7. MANEJADOR DE ERRORES GLOBAL ---
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[LOG ERROR] ${req.method} ${req.url}: ${err.message}`);
    const status = err.message === 'No permitido por CORS' ? 403 : 500;
    res.status(status).json({
        ok: false,
        msg: 'Solicitud no permitida o error interno del servidor.'
    });
});

// --- 8. INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
    // Este log es para confirmar si leyó el .env correctamente
    console.log(`🔧 MAILER_EMAIL detectado: ${process.env.MAILER_EMAIL ? 'SÍ' : 'NO'}`);
});

export default app;