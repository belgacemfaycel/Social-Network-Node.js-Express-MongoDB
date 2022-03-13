

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
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