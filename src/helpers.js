import mime from 'mime';
import randomstring from 'randomstring';

class File {
  constructor(file) {
    this._file = file;
  }

  generateRandomName(length = 32) {
    const rand = randomstring.generate({ length, charset: 'hex' });
    const extension = mime.getExtension(this._file.mimetype);

    return `${rand}.${extension}`;
  }
}

/* eslint-disable-next-line import/prefer-default-export */
export { File };
