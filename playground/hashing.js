const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");

var data ={
    id:4
}

var token = jwt.sign(data,'123ab');
console.log(token);
var decoded = jwt.verify(token,'123ab');
console.log('decoded',decoded); 