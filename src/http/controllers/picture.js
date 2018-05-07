import PictureModel from '../../models/picture';

class Picture {
  static index(req, res) {
    const filters = {};

    if (req.query) {
      if (req.query.name) {
        filters.title = new RegExp(req.query.name, 'i');
      }
    }

    PictureModel.all(filters, (data) => {
      res.status(200).json(data);
    });
  }

  static myPhotos(req, res) {
    const filters = { author: req.session.user.fullname };

    PictureModel.all(filters, (data) => {
      res.status(200).json(data);
    });
  }

  static store(req, res) {
    const picture = req.body;
    picture.url = `/render/${req.file.filename}`;
    picture.author = req.session.user.fullname;

    PictureModel.add(picture, (err) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: 'Picture couldn\'t be added to database.',
          errors: err,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'Picture successfully added to database.',
          uploaded: picture,
        });
      }
    });
  }

  static render(req, res) {
    res.sendFile(`${process.env.ROOT_DIR}/uploads/${req.params.name}`);
  }
}

export default Picture;
