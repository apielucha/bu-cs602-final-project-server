import bodyParser from 'body-parser';
import express from 'express';
import mime from 'mime';
import morgan from 'morgan';
import multer from 'multer';
import randomstring from 'randomstring';

import Middlewares from './middlewares';
import HomeController from './controllers/home';
import AuthController from './controllers/auth';
import PictureController from './controllers/picture';

class Server {
  constructor(port) {
    this._app = express();
    this._port = port;
    this._upload = multer({
      storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, callback) => {
          const rand = randomstring.generate({ charset: 'hex' });
          const extension = mime.getExtension(file.mimetype);
          callback(null, `${rand}.${extension}`);
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

    this._app.use(Middlewares.session());
    this._app.use(Middlewares.accessControlAllowOrigin);
  }

  _routes() {
    this._app.get('/', HomeController.info(this));
    this._app.get('/test', HomeController.test);
    this._app.post('/test', HomeController.postTest);
    // this._app.get('/test', Middlewares.verifyAuth, HomeController.test);

    this._app.post('/login', AuthController.login);
    this._app.get('/logout', AuthController.logout);

    this._app.get('/images', PictureController.index);
    // this._app.get('/', Middlewares.verifyAuth, PictureController.index);
    this._app.post('/images', this._upload.single('test'), PictureController.store);
    this._app.get('/render/:name', PictureController.render);
  }

  run() {
    this._app.listen(this._port, () => {
      /* eslint-disable-next-line no-console */
      console.log(`App listening on localhost:${this._port}`);
    });
  }
}

export default Server;
