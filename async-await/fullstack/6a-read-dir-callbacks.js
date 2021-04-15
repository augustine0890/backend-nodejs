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

mapAsync(['file1.js', 'file2.js'], fs.readFile, (err, filesData) => {
    if (err) return console.error(err);
    console.log(filesData);
})