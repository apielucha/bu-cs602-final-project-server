import UserModel from '../../models/user';

class Auth {
  static register(req, res) {
    const user = req.body;

    UserModel.add(user, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: 'User couldn\'t be added to database.',
          errors: err,
        });
      } else {
        const { password, timestamp, ...secureUser } = data;

        req.session.isAuthenticated = true;
        req.session.user = secureUser;

        res.status(200).json({
          status: 200,
          message: 'User successfully registered.',
          data: secureUser,
          sessionID: req.sessionID,
        });
      }
    });
  }

  static login(req, res) {
    UserModel.get(req.body.email, (data) => {
      if (data === null || data.password !== req.body.password) {
        res.status(400).json({
          status: 400,
          message: 'Incorrect user or password.',
        });
      } else {
        const { password, timestamp, ...secureUser } = data;

        req.session.isAuthenticated = true;
        req.session.user = secureUser;

        res.status(200).json({
          status: 200,
          message: 'Authenticated successfully.',
          user: secureUser,
          sessionID: req.sessionID,
        });
      }
    });
  }

  static logout(req, res) {
    req.session.destroy();

    // res.status(302).setHeader('Location', `${process.env.GUI_URL}/login`);
    res.status(200).json({
      status: 200,
      message: 'Logged out successfully.',
      sessionID: req.sessionID,
    });
  }

  static testAuth(req, res) {
    res.status(req.session.isAuthenticated ? 204 : 403).end();
  }
}

export default Auth;
