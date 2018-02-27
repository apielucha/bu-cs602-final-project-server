import DB from './_db';

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
    const validationErrors = Picture._validate(picture);

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

  static _validate(picture) {
    const errors = [];

    const missing = key => `Key '${key}' is missing.`;
    const wrongType = (key, type) => `Key '${key}' must be of type '${type}'.`;

    if (!picture.url) { errors.push(missing('url')); }
    if (typeof picture.url !== 'string') { errors.push(wrongType('url', 'string')); }

    if (!picture.message) { errors.push(missing('message')); }
    if (typeof picture.message !== 'string') { errors.push(wrongType('message', 'string')); }

    return errors;
  }
}

export default Picture;
