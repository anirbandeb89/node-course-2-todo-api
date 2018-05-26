const SHA256 = require("crypto-js/sha256");

var message = 'I am user 1';
var hash = SHA256(message).toString();

console.log(`Message : ${message}`);
console.log(`Hash : ${hash}`);

var data={
    id:4
}

var token={
    data,
    hash :SHA256(JSON.stringify(data)+'something').toString()
}

var resultHash = SHA256(JSON.stringify(token.data)+'something').toString()

if(resultHash === token){
    console.log('Data was not changed');
}else{
    console.log('Data was changed');
}

