import dotenv from 'dotenv';
import path from 'path';

import Server from './http/server';

class App {
  static main() {
    App._init();

    const server = new Server(8080);
    server.run();
  }

  static _init() {
    dotenv.config();
    process.env.ROOT_DIR = path.join(__dirname, '/../');
  }
}

App.main();
