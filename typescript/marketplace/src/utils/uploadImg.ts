import multer from 'multer';

const imageFilter = (req: any, file: any, cb: any) => {
  // only image
  if (!file.originalname.match(/\.(jpg|jpep|png|gif)$/)) {
    return cb(new Error('Only image files are allowed.'), false);
  }
  cb(null, true);
};

export const upload = multer({
  fileFilter: imageFilter,
  // storage
  storage: multer.memoryStorage(),
});
