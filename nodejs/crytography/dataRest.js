/*
Symmetric Encryption
- One key: same key used to encrypt and decrypt
- Make data unreadable: if you don't have the key, you can't read the data.
- Crypto.createCipheriv: create symmetric ciphers.
*/
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const password = 'This is a password';
const salt = crypto.randomBytes(32);
const key = crypto.scryptSync(password, salt, 32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);

let ssn = '222-999-0000';
let encrypted = cipher.update(ssn, 'utf-8', 'hex');
encrypted += cipher.final('hex');
console.log('encrypted', encrypted);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
decrypted = decipher.final('utf-8');
console.log('decrypted', decrypted);

/*
Vault used as secure key store
- Master key
- Stores keys to other applications
- API for retrieval
*/