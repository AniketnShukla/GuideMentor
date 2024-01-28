import { logEvents } from './logger.js';

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if(err.name ==='CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }
    
    logEvents(`${err.name}: ${err.message}\t${err.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export {
    notFound,
    errorHandler 
}