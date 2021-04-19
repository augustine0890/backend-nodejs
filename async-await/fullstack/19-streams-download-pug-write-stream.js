const fs = require('fs');
const https = require('https');

const fileUrl = 'https://images.unsplash.com/photo-1485358370836-4fb8998c06f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80';

https.get(fileUrl, res => {
    const fileStream = fs.createWriteStream('pug.jpeg');

    res.on('data', data => fileStream.write(data)).on('end', () => {
            fileStream.end()
            console.log('file saved!');
    })
})
