const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if(err){
        return console.log('Unable to connect to DB');
    }
        console.log('Connected to Mongo DB');
        const db = client.db('TodoApp');

        db.collection('Users').insertOne({
            name:"Anirban",
            location:"Pune"   
        },(err,result)=>{
            if(err){
                return console.log('Unable to connect to DB', err);
            } 
                console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined,2));  // note _id contains Timestamp, Machine ID
                
        });
        client.close();
});