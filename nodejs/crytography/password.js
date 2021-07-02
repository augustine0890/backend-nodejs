const crypto = require('crypto');
const bcrypt = require('bcrypt');

// md5
const hash = crypto.createHash('md5');
hash.update('password1');
console.log(hash.digest('hex'));

// sha256
const shaHash = crypto.createHash('sha256');
shaHash.update('password1');
console.log(shaHash.digest('hex'));

// Salt
const pw = 'password';
const salt = crypto.randomBytes(256).toString('hex');
console.log(salt);

/*
Algorithms: Argon2, PBKDF2, scrypt, bcrypt
PBKDF@ is a simple cryptographic key derivation function, which is resistant to dictionary attacks and rainbow table attacks
@iterations: the number of iterations.
@keyLenBytes: the size of the result in bytes.
*/
const hashedPwd = crypto.pbkdf2Sync(pw, salt, 100000, 512, 'sha512');
console.log(hashedPwd.toString('hex'));

// bcrypt
const saltRounds = 10;
const plaintextPassword = '$#%123*&^';
const otherPlaintextPassword = '&^)7632^*';

const generateHash = (password) => {
  return bcrypt.hashSync(password, saltRounds, null);
};
const hashedPlaintextPw = generateHash(plaintextPassword);

const correctPw = bcrypt.compareSync(plaintextPassword, hashedPlaintextPw);
console.log('TRUE', correctPw);

const wrongPw = bcrypt.compareSync(otherPlaintextPassword, hashedPlaintextPw);
console.log('FALSE', wrongPw);
