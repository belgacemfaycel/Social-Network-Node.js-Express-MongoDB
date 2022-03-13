const expres = require('express');
const router = expres.Router();
const postCtrl = require('../controllers/post');
const auth  = require('../middelware/auth');
const multer = require('../middelware/multer-config');

router.post('/' , auth ,multer ,postCtrl.createPost);

  module.exports = router ;