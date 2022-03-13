
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/

const expres = require('express');
const router = expres.Router();
const userCtrl = require('../controllers/user');


router.post('/signup' , userCtrl.signup);
router.post('/login', userCtrl.login);


  module.exports = router ;