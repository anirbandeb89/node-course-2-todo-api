//const mongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  // Destructuring Library.. Below is an example

var obj = new ObjectID();
console.log(obj);
// var user = {name:"Anirban", location:"Pune"};
// var {name} = user;  // De-structuring object in ES6
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if(err){
        return console.log('Unable to connect to DB');
    }
       
        client.close();
});