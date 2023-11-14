const allowlist = process.env.ORIGIN ?? eval(process.env.ORIGIN);

const CORS_OPTIONS = {
    origin: function (origin, callback) {
        let corsOptions;
        if (allowlist == '*') {
            corsOptions = true;
        } else if (allowlist.indexOf(origin) !== -1) {
            corsOptions = true;
        } else {
            corsOptions = false;
        }
        callback(null, corsOptions);
    },
    methods: ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: process.env.CREDENTIALS === 'true',
    preflightContinue: true,
    optionsSuccessStatus: 200,
};

module.exports = CORS_OPTIONS;
