import dotenv from 'dotenv';
import Server from './http/server';

class App {
  static main() {
    App._init();

    const server = new Server(8080);
    server.run();
  }

  static _init() {
    dotenv.config();
  }
}

App.main();
