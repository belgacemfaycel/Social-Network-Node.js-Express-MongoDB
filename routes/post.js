const expres = require('express');
const router = expres.Router();
const postCtrl = require('../controllers/post');
const auth  = require('../middelware/auth');

router.post('/' , auth  ,postCtrl.createPost);

  module.exports = router ;