const fs = require('fs');
const AWS = require('aws-sdk');
const { promisify } = require('util');

const s3 = new AWS.S3();
s3.uploadP = promisify(s3.upload);

const params = {
    Bucket: 'fullstack-printshop',
    Key: 'profile-photos/pug.jpg',
    Body: fs.createReadStream('pug.jpg')
};

(async function() {
    await s3.uploadP(params)
})();