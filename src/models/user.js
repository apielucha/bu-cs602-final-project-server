import DB from './_db';
import Validator from './_validator';

class User {
  static all(callback) {
    DB.execute((dbo, end) => {
      dbo.collection('users')
        .find()
        .toArray((err, data) => {
          if (err) throw err;

          end();
          callback(data);
        });
    });
  }

  static add(user, callback) {
    const validationErrors = Validator.check(user, {
      firstname: 'string',
      lastname: 'string',
      email: 'string',
      password: 'string',
    });
    /* eslint-disable-next-line no-param-reassign */
    user.fullname = `${user.firstname} ${user.lastname}`;

    if (validationErrors.length) {
      callback(validationErrors);
    } else {
      DB.execute((dbo, end) => {
        dbo.collection('users')
          .insertOne(user, (err) => {
            if (err) throw err;

            end();
            callback();
          });
      });
    }
  }

  static get(email, callback) {
    DB.execute((dbo, end) => {
      dbo.collection('users')
        .findOne({ email }, (err, data) => {
          if (err) throw err;

          end();
          callback(data);
        });
    });
  }
}

export default User;
