const bcrypt = require('./bcrypt');
var fs = require('fs');

const rawPassword = process.argv[2];

fs.appendFile('hash.txt', bcrypt.hash(rawPassword) + "\n", (err) => {
  if(err){
    throw err;
  }
});

// bcrypt.compare(pass, hash);
