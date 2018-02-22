import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

class Server {
  constructor(port) {
    this._app = express();
    this._port = port;

    this._middlewares();
    this._routes();
  }

  _middlewares() {
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(morgan('dev'));
  }

  _routes() {
    this._app.get('/', (req, res) => {
      res.end('Welcome to my awesome website!');
    });
  }

  run() {
    this._app.listen(this._port, () => {
      /* eslint-disable-next-line no-console */
      console.log(`App listening on localhost:${this._port}`);
    });
  }
}

export default Server;
