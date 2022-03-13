const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports= (req ,res, next)=> {
try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token , config.token.RANDOM_SECRET_KEY);
    const userId = decodedToken.userId;
    req.userId = userId;
    req.auth = {userId};
    if(req.body.userId && req.body.userId !== userId){
        thron  ('User ID non valide!');
    } else{
        next();
    }
}catch(error){
    res.status(401).json({error : 'Requete non authentifié'});
}};