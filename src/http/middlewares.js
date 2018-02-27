import expressSession from 'express-session';

class Middlewares {
  static session() {
    return expressSession({
      name: 'serverSession',
      secret: 'CS602proj3ct!',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 60 * 1000, // 10 minutes
      },
    });
  }

  static accessControlAllowOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  }

  static verifyAuth(req, res, next) {
    if (!req.session.loggedIn) {
      res.status(401).json({
        status: 401,
        message: 'Access denied: user not authenticated.',
        user: {},
      });
    } else {
      next();
    }
  }
}

export default Middlewares;
