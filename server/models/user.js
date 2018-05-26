var mongoose = require('mongoose');
var validator = require('validator');



var User = mongoose.model('User',{
    email:{
        type: String,
        required:true,
        minLength:1,
        trim:true,
        unique:true,
        validator:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        } 
    },
    password:{
        type: String,
        required:true,
        minLength:6
    },
    tokens:[{
        access:{
            type: String,
            reuired:true
        },
        toke:{
            type: String,
            reuired:true
        }
    }]

});

module.exports={
    User
};