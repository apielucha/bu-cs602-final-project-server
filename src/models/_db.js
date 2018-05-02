import { MongoClient } from 'mongodb';

class DB {
  static execute(callback) {
    const mongoUrl = 'mongodb://' +
      `${process.env.MONGO_USER}:${process.env.MONGO_PWD}@` +
      `${process.env.MONGO_IP}:${process.env.MONGO_PORT}` +
      `/${process.env.MONGO_DB}`;

    MongoClient.connect(mongoUrl, (err, client) => {
      if (err) throw err;

      const dbo = client.db(process.env.MONGO_DB);
      callback(dbo, () => { client.close(); });
    });
  }
}

export default DB;
