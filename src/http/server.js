import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import morgan from 'morgan';
import multer from 'multer';

import AuthController from './controllers/auth';
import { File as FileHelper } from '../helpers';
import HomeController from './controllers/home';
import Middlewares from './middlewares';
import PictureController from './controllers/picture';

class Server {
  constructor(port) {
    this._app = express();
    this._port = port;

    this._upload = multer({
      storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, callback) => {
          callback(null, new FileHelper(file).generateRandomName(16));
        },
      }),
    });

    this._middlewares();
    this._routes();
  }

  _middlewares() {
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(morgan('dev'));

    this._app.use(Middlewares.httpsRedirect(this._port));
    this._app.use(Middlewares.session());
    this._app.use(Middlewares.CORS());
  }

  _routes() {
    this._app.get('/', HomeController.info);
    this._app.get('/test', HomeController.test);
    this._app.post('/test', HomeController.postTest);

    this._app.post('/register', AuthController.register);
    this._app.post('/login', AuthController.login);
    this._app.get('/logout', AuthController.logout);
    this._app.post('/testAuth', AuthController.testAuth);

    this._app.get('/pictures', PictureController.index);
    this._app.get('/pictures/me', PictureController.myPhotos);
    // this._app.get('/', Middlewares.verifyAuth, PictureController.index);
    this._app.post('/pictures', this._upload.single('photo'), PictureController.store);
    this._app.get('/render/:name', PictureController.render);
  }

  run(callback) {
    // this._app.listen(port, () => {
    //   /* eslint-disable-next-line no-console */
    //   console.log(`App listening on localhost:${port}`);
    // });

    const credentials = {
      key: fs.readFileSync(`${process.env.ROOT_DIR}/ssl/server.key`),
      cert: fs.readFileSync(`${process.env.ROOT_DIR}/ssl/server.crt`),
    };

    https.createServer(credentials, this._app).listen(
      this._port + 363,
      callback(`App listening on localhost:${this._port + 363}`),
    );
    http.createServer(this._app).listen(
      this._port,
      callback(`App listening on localhost:${this._port}`),
    );
  }
}

export default Server;
