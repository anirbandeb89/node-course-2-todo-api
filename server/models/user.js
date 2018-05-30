var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require("jsonwebtoken");
var _ = require('lodash');

var UserSchema = new mongoose.Schema({
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
        token:{
            type: String,
            reuired:true
        }
    }]

});


UserSchema.methods.toJSON=function(){
    user = this;
    userObj = user.toObject();
    return _.pick(userObj,['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){   //Not using arrow function coz arrow function doesnot bind this keyword
    var user = this;
    var access ='auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

    user.tokens.push({     //used ES6 type of assigning value
        access,
        token
    });

    return user.save().then(()=>{
        console.log('Token is',token);  
        return token;
    });
}

var User = mongoose.model('User',UserSchema);

module.exports={
    User
};