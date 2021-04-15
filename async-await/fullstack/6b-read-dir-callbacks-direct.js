const fs = require('fs');

function mapAsync(arr, fn, onFinish) {
    let prevError; // prevent call multiple times the errors
    let nRemaining = arr.length;
    const results = [];

    arr.forEach(function(item, i) {
        fn(item, function(err, data) {
            if (prevError) return

            if (err) {
                prevError = err
                return onFinish(err)
            }
            results[i] = data;
            nRemaining--;
            if (!nRemaining) onFinish(null, results)
        })
    })
}

fs.readdir('./', function(err, files) {
    if (err) return console.error(err)

    mapAsync(files, fs.readFile, (err, results) => {
        if (err) return console.error(err)

        results.forEach((data, i) => console.log(`${files[i]}: ${data.length}`))
    
        console.log('done!')
    })
})