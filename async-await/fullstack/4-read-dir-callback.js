const fs = require('fs');
let directoryPath = __dirname;

fs.readdir(directoryPath, (err, fileList) => {
    if (err) return console.error(err)

    console.log('Current directory filenames:', fileList);
})