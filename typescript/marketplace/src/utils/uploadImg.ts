import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import { extname } from 'path';
// import findeRemoveSync = require('find-remove');

const diskStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    const destination = 'uploads/';
    if (!existsSync(destination)) {
      mkdirSync(destination);
    }
    // findeRemoveSync(destination, {
    // age: { seconds: 60 },
    // extensions: '.jpg',
    // limit: 5,
    // });
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        extname(file.originalname).toLowerCase(),
    );
  },
});

function multerError(message: string): Error {
  const err = new Error(message);
  err.name = 'MulterError';

  return err;
}

const imageFilter = (req: any, file: any, cb: any) => {
  // only image
  if (!file.originalname.match(/\.(jpg|jpep|png|gif)$/)) {
    return cb(multerError('Only image files are allowed.'), false);
  }
  cb(null, true);
};

export const imageUpload = multer({
  fileFilter: imageFilter,
  // storage
  // storage: multer.memoryStorage(),
  storage: diskStorage,
});
