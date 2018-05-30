const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");

var data ={
    id:"5b0f0c76403d4075abf68797",
    access :'auth'
}

var token = jwt.sign(data,'123ab');
console.log(token);
var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjBmMGM3NjQwM2Q0MDc1YWJmNjg3OTYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI3NzEyODg2fQ.xuqWlVh5kvW7moNKh1e4ZKEB5xNN9W-DlT25f5LKd_U','123ab');
console.log('decoded',decoded); 