const bcrypt = require('bcrypt');
const User = require('../models/User');



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
// exports.login = (req , res ,next)=>{
// };