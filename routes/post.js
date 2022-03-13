const expres = require('express');
const router = expres.Router();
const postCtrl = require('../controllers/post');
const auth  = require('../middelware/auth');
const multer = require('../middelware/multer-config');

  router.post('/' , auth ,multer ,postCtrl.createPost);
  router.get('/',auth , postCtrl.getPosts);
  router.get('/:id',auth , postCtrl.getOnePosts);
  router.put('/:id', auth,multer ,postCtrl.updatePost);
  router.delete('/:id',auth , postCtrl.deletePost);
  module.exports = router ;