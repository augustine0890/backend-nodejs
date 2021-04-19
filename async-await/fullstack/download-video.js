const fs = require('fs');
const got = require('got');
// const https = require('https');

const fileUrl = 'https://byte-by-byte.wistia.com/medias/g341cwjd7s';
const fileName = 'graphs.mp4';

const downloadStream = got.stream(fileUrl);
const fileWriterStream = fs.createWriteStream(fileName);

downloadStream
    .on('downloadProgress', ({ transferred, total, percent }) => {
        const percentage = Math.round(percent * 100);
        console.error(`progress: ${transferred}/${total} (${percentage}%)`);
    })
    .on('error', error => {
        console.error(`Download failed: ${error.message}`);
    });

fileWriterStream
    .on('error', error => {
        console.error(`Could not write file to system: ${error.message}`);
    })
    .on('finish', () => {
        console.log(`File downloaded to ${fileName}`);
    });

downloadStream.pipe(fileWriterStream);