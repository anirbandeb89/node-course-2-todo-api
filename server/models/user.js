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

//Creates a model method as instance method
UserSchema.statics.findByToken = function(token){
   var User = this; 
   var decoded;
   try{
    console.log("Token",token);
    decoded = jwt.verify(token,'abc123');
    console.log(decoded);
   }catch(e){  
       return new Promise((resolve,reject)=>{
           return reject();
       });

    // return PermissionRequestedEvent.reject();    // other way to do the same
   }

   return  User.findOne({    //creating a chain promise 
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
   });         
};

var User = mongoose.model('User',UserSchema);

module.exports={
    User
};