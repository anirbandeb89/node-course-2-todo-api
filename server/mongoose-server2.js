var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');



var user = new user({
    email:'  debanirban89@gmail.com '  
});

user.save().then((doc)=>{
    console.log('Save Doc:',doc);
},(err)=>{
    console.log('Unable to save',err);
});
