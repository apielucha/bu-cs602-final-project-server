import DB from './_db';
import Validator from './_validator';

class Picture {
  static all(callback) {
    DB.execute((dbo, end) => {
      dbo.collection('pictures')
        .find(/* { price: { $gte: 0, $lte: 10 } } */)
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
      message: 'string',
    });

    if (validationErrors.length) {
      callback(validationErrors);
    } else {
      DB.execute((dbo, end) => {
        dbo.collection('pictures')
          .insertOne(picture, (err) => {
            if (err) throw err;

            end();
            callback();
          });
      });
    }
  }
}

export default Picture;
