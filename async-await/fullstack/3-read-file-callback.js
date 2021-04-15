const fs = require('fs');
const filename = '3-read-file-callback.js';
// const filename = 'does-not-exist.js';

fs.readFile(filename, (err, fileData) => {
    if (err) return console.error(err)

    console.log(`${filename}: ${fileData.length}`);
})