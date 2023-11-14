const errorMiddleware = (err, req, res, next) => {
    try {
        const status = err.status || 500;
        const error = err.error || 'INTERNAL_ERROR';
        const message = err.message || 'Something went wrong';

        // if (process.env.NODE_ENV === 'development') {
        //     console.log(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Error:: ${error}, Message:: ${message}`);
        // }

        console.log(error);

        res.status(status).json({ status, error, message });
    } catch (error) {
        next(error);
    }
};

module.exports = errorMiddleware;
