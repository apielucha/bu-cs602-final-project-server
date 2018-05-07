import User from '../../models/user';

class Home {
  static info(req, res) {
    res.status(200).json({
      node: 'v8.9.1',
      environment: process.env.NODE_ENV,
    });
  }

  static test(req, res) {
    // User.all((data) => {
    //   res.json(data);
    // });
    res.json(req.sessionID);
  }

  static postTest(req, res) {
    const user = req.body;

    User.add(user, (err) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: 'User couldn\'t be added to database.',
          errors: err,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'User successfully added to database.',
          data: user,
        });
      }
    });
  }
}

export default Home;
