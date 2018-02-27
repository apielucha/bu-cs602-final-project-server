class AuthController {
  static login(req, res) {
    req.session.loggedIn = true;
    req.session.user = { username: req.body.name };

    res.status(200).json({
      status: 200,
      message: 'Authenticated successfully.',
      user: req.session.user,
    });
  }

  static logout(req, res) {
    delete req.session.loggedIn;
    delete req.session.user;

    res.status(200).json({
      status: 200,
      message: 'Logged out successfully.',
      user: {},
    });
  }
}

export default AuthController;
