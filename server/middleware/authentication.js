var {User} = require('./../models/user');

var authentication = (req,res,next)=>{
    var token = req.header('x-auth');
    
    //modelMethod, so access by Uppercase User() i,e the User we imported in the top
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();   // we can use  res.status(401).send(); but this PRmise.reject will be catch by the 
                                       //below catch block and log
        }
            req.user = user;
            req.token = token;
            next();
    }).catch((e)=>{
        res.status(401).send();
    });
};
module.exports = {authentication}; 