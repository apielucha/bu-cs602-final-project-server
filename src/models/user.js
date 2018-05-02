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

    const upload = {
      ...user,
      fullname: `${user.firstname} ${user.lastname}`,
      timestamp: Date.now(),
    };

    if (validationErrors.length) {
      callback(validationErrors);
    } else {
      DB.execute((dbo, end) => {
        dbo.collection('users')
          .insertOne(upload, (err) => {
            if (err) throw err;

            end();
            callback(null, upload);
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
