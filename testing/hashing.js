const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });
var hashedPassword = '$2a$10$jMUjdMEs3jmm/USLxPDXheHRDniai85OtVmsUJ96XOzk.xCBWdVs.';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// let data = {
//   id: 10
// };

// let token = jwt.sign(data, '123abc');
// console.log(token);
// let decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// let message = 'I am user no 3';
// let hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`message: ${hash}`);

// let data = {
//   id: 4
// };

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data)).toString()
// }

// let resultHash = SHA256(JSON.stringify(token.data)).toString();

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data was changed');
// }