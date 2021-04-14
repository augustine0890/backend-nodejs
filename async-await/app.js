console.log('First!');

setTimeout(function second() {
    console.log('Timed Out!');
}, 0)

console.log('Final!');

// ES6 job queue
const bar = () => console.log('bar');
const baz = () => console.log('baz');

const foo = () => {
    console.log('foo')
    setTimeout(bar, 0)
    new Promise((resolve, reject) =>
        resolve('should be right after baz, before bar')
    ).then(resolve => console.log(resolve))
    baz()
}
foo()