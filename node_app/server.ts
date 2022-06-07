import http from 'http';
import bodyParser from 'body-parser';
import express, {NextFunction, Request, Response} from 'express';
import logging from './config/logging';
import config from './config/config';
import creditRoutes from './source/routes/creditRoute';
const cors = require('cors')

const NAMESPACE = 'Server';
const router = express();

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors())
/** Routes go here */
router.use('/credit', creditRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

// error handler
router.use((err:any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code || 500);
    res.send({
        status: err.code,
        message: err.message,
        timestamp: Date.now(),
        path: req.originalUrl,
    });
});

/** Rules of our API */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});


const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
