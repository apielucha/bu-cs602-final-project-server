import DB from './_db';
import Validator from './_validator';

class Picture {
  static all(filters, callback) {
    DB.execute((dbo, end) => {
      dbo.collection('pictures')
        .find(filters)
        .sort({ timestamp: -1 })
        .toArray((err, data) => {
          if (err) throw err;

          end();
          callback(data);
        });
    });
  }

  static add(picture, callback) {
    const validationErrors = Validator.check(picture, {
      url: 'string',
      title: 'string',
      text: 'string',
    });

    if (validationErrors.length) {
      callback(validationErrors);
    } else {
      const upload = { ...picture, timestamp: Date.now() };

      DB.execute((dbo, end) => {
        dbo.collection('pictures')
          .insertOne(upload, (err) => {
            if (err) throw err;

            end();
            callback();
          });
      });
    }
  }
}

export default Picture;
