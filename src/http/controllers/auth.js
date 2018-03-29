import User from '../../models/user';

class AuthController {
  static login(req, res) {
    User.get(req.body.email, (data) => {
      if (data === null || data.password !== req.body.password) {
        res.status(400).json({
          status: 400,
          message: 'Incorrect user or password.',
        });
      } else {
        req.session.loggedIn = true;
        req.session.user = { name: req.body.name };

        res.status(302).setHeader('Location', `${process.env.GUI_URL}/`);
        res.json({
          status: 302,
          message: 'Authenticated successfully. Redirecting to home page.',
          user: req.session.user,
        });
      }
    });
  }

  static logout(req, res) {
    delete req.session.loggedIn;
    delete req.session.user;

    res.status(302).setHeader('Location', `${process.env.GUI_URL}/login`);
    res.json({
      status: 302,
      message: 'Logged out successfully. Redirecting to login page.',
      user: req.session.user,
    });
  }
}

export default AuthController;
