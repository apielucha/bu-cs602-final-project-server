class Home {
  static info(server) {
    return (req, res) => {
      res.status(200).json({
        node: 'v8.9.1',
        environment: process.env.NODE_ENV,
        port: server._port,
      });
    };
  }

  static test(req, res) {
    res.json({
      session: req.session,
    });
    // TestModel.all(() => { res.end('http_ok 200'); });
  }
}

export default Home;
