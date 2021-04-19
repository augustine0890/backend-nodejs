const fs = require('fs').promises;

printLengths('./');

async function printLengths(dir) {
    const fileList = await fs.readdir(dir);

    const results = fileList.map(
        async file => await fs.readFile(file).then(data => [file, data.length])
    )

    results.forEach(results => console.log(`${results[0]}: ${results[1]}`))

    console.log('done!');
}