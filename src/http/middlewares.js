import expressSession from 'express-session';

class Middlewares {
  static httpsRedirect(port) {
    return (req, res, next) => {
      if (!req.secure) {
        const host = req.headers.host.replace(port, port + 363);
        const { url } = req;

        res.redirect(`https://${host}${url}`);
      } else {
        next();
      }
    };
  }

  static session() {
    return expressSession({
      name: 'sessionID',
      secret: 'CS602proj3ct!',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 60 * 1000, // 10 minutes
        secure: true,
        httpOnly: true,
      },
    });
  }

  static CORS() {
    return (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'https://localhost:8443');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    };
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
