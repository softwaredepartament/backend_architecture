require('dotenv').config({ path: `.env` });

const { logger } = require('./middleware/logger.middleware');
const expressFileupload = require('express-fileupload');
const { loggerCron } = require('./config/logger');
const CORS_OPTIONS = require('./config/cors');
const express = require('express');
const cors = require('cors');

async function app(routes) {
    const app = express();
    const port = process.env.PORT;

    function listener() {
        app.listen(port, () => {
            console.info('=================================');
            console.info(`======== ENV: production ========`);
            console.info(`🚀 App listening on the port ${port}`);
            console.info('=================================');
        });
    }

    function initMiddlewares() {
        app.use(logger());
        app.use(cors(CORS_OPTIONS));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(expressFileupload());
    }

    function initCronjobs() {
        loggerCron();
    }

    function initRoutes(routes) {
        routes.forEach(route => {
            app.use(route);
        });
    }

    async function runner() {
        initCronjobs();
        initMiddlewares();
        initRoutes(routes);
        listener();
    }

    runner();
}

module.exports = app;
