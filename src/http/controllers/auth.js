class AuthController {
  static index(req, res) {
    res.end('This is the login page.');
  }

  static login(req, res) {
    res.end('You are connected.');
  }
}

export default AuthController;
