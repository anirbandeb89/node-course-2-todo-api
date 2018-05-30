const {MongoClient, ObjectID} = require('mongodb');  // Destructuring Library.. Below is an example


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if(err){
        return console.log('Unable to connect to DB');
    }
    console.log('Connected to mongo server');

    var db = client.db('TodoApp');

   //Delete Many
    // db.collection('todos').deleteMany({text:'I need to dance'}).then((result)=>{
    //    console.log(result);   
    // },(e)=>{
    //     console.log('Error',e);
    // });

    // db.collection('todos').deleteOne({text:'I need to shop'}).then((result)=>{
    //     console.log(result);   
    //  },(e)=>{
    //      console.log('Error',e);
    //  });

     //findOneAndDelete
    //  db.collection('todos').findOneAndDelete({completed:false}).then((doc)=>{
    //     console.log(doc);   
    //  },(e)=>{
    //      console.log('Error',e);
    //  });


    


});