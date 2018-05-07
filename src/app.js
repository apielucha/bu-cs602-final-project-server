import dotenv from 'dotenv';
import path from 'path';

import Server from './http/server';

class App {
  static main() {
    App._init();

    new Server(8081).run((message) => {
      /* eslint-disable-next-line no-console */
      console.log(message);
    });
  }

  static _init() {
    dotenv.config();
    process.env.ROOT_DIR = path.join(__dirname, '/../');
  }
}

App.main();
