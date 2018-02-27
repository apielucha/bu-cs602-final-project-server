import { MongoClient } from 'mongodb';

class DB {
  static execute(callback) {
    const mongoIp = process.env.MONGO_SERVER_IP;
    const mongoPort = process.env.MONGO_SERVER_PORT;
    const mongoUrl = `mongodb://${mongoIp}:${mongoPort}/`;

    MongoClient.connect(mongoUrl, (err, client) => {
      if (err) throw err;

      const dbo = client.db('cs602-project');
      callback(dbo, () => { client.close(); });
    });
  }
}

export default DB;
