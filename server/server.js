var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/user');
var _ = require('lodash');

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
app.get('/todo/:id',(req,res)=>{
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

    user.save().then((doc)=>{
        res.send(doc);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});




app.listen(3000,()=>{
    console.log('Server listening at port 3000');
});
