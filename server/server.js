var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var _ = require('lodash');

const port = process.env.PORT || 3000 

var app = new express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(req.body);
    var todo = new Todo({
        text:req.body.text
    });


//get all values
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos,
        });
    },(err)=>{
        res.status(400).send(err);
    });
});    

//Get with ID
app.get('/todos/:id',(req,res)=>{
    var id =req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{

       if(!todo){
        return res.status(404).send();
       }
       res.send({todo});
    }).catch((e)=>{
        console.log('Didint find ID,'),id;
    });
});

    todo.save().then((doc)=>{
        console.log('save :',doc);
        res.status(200).send(doc);
    }, (err)=>{
        console.log('Unable to save',err);
        res.status(400).send(err);
    });

   
});

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then((user)=>{
      var token = user.generateAuthToken();
      
      return token;
    }).then((token)=>{                   //chaining promise
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        console.log(e);
        res.status(400).send(e);
    });
});


app.delete('/todos/:id',(req,res)=>{
     var id = req.params.id;

     if(!ObjectID.isValid(id)){
         return res.status(404).send();
     }

     Todo.findByIdAndRemove(id).then((todo)=>{
         if(!todo){
            return res.status(404).send();
         }
         return res.status(200).send(todo);
     }).catch((e)=>{
         res.status(400).send(e);
     });
    
});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime;
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new :true}).then((todo)=>{
    if(!todo){
        return res.status(200).send({todo});
     }
        return res.status(404).send();
  }).catch((e)=>{
      res.status(400).send();
  });

});

app.listen(port,()=>{
    console.log(`Server listening at port ${port}`);
});
