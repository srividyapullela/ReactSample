import * as express from 'express';
import * as expressSession from 'express-session';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { GMESSRouter } from './api/router/gmess.router';
import { GMESSInterceptor } from './api/interceptor/gmess.interceptor';

class App {

    public express: express.Application;
    public gmessRouter: GMESSRouter = new GMESSRouter();
    public gmessInterceptor: GMESSInterceptor = new GMESSInterceptor();

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.gmessRouter.init();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json({limit: "50mb"}));
        this.express.use(expressSession({
                    name: 'server-session-cookie-id',
                    secret: 'secrettoken',
                    resave: false,
                    saveUninitialized: true,
                    rolling: true,
                    cookie: {
                    path: "/",
                    }
        }));
        this.express.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
        this.express.use(this.gmessInterceptor.beforeEachRequest);
        this.express.use(express.static("./dist"));
        this.express.use('/ssgme', express.static(process.cwd()+"/app/dist/"));
    }

    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let contentAPIRouter = express.Router();
        // placeholder route handler
        contentAPIRouter.get('/*', (req, res, next) => {
            res.sendFile(process.cwd()+"/app/dist/index.html");
        });
        this.express.use('/ssgme/adminAPI', this.gmessRouter.router);
        this.express.use('/ssgme', contentAPIRouter);
        //this.express.use('/ssgme', contentAPIRouter);
        //this.express.use('/adminAPI', this.gmessRouter.router);
    }
}

export default new App().express;
