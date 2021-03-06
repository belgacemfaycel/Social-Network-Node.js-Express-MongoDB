const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.signup = (req , res ,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
               email : req.body.email,
               firstname : req.body.firstname,
               lastname : req.body.lastname,
               password :hash 
        });
        user.save()
        .then(()=> res.status(201).json({message : 'user created !'}))
        .catch(error =>res.status(500).json({error}));
    })
    .catch(error =>res.status(400).json({error}));
};
exports.login = (req , res ,next)=>{
    User.findOne({email : req.body.email})
    .then(user=>{
        if(!user){
            return res.status(401).json({error : 'user not found'});
        }
        bcrypt.compare(req.body.password ,user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({error : 'Mot de passe incorrect !'});
            }
           return  res.status(200).json({
               userId : user._id,
               token: jwt.sign(
                { userId: user._id },
                config.token.RANDOM_SECRET_KEY,
                { expiresIn: config.token.expiresIn }
              )  
           })
        })
        .catch(error =>res.status(500).json({error}))
    })
    .catch(error =>res.status(500).json({error}))
};