const {MongoClient, ObjectID} = require('mongodb');  // Destructuring Library.. Below is an example

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if(err){
        return console.log('Unable to connect to DB');
    }
    var db = client.db('TodoApp');
    
    db.collection('Todos').find().toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch object',err);
    });
    
    db.collection('Todos').find({complete:false}).toArray().then((docs)=>{     //find with param
        console.log('Find with param');
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch object',err);
    });

    //count
    db.collection('Todos').find().count().then((count)=>{     //find with param
        console.log('Todos count'+count);
    },(err)=>{
        console.log('Unable to fetch object',err);
    });


    //count with find param
    db.collection('Todos').find({complete:true}).count().then((count)=>{     //find with param
        console.log('Todos count'+count);
    },(err)=>{
        console.log('Unable to fetch object',err);
    });

    client.close();
});