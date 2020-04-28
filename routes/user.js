const express = require('express');
const {check} = require('express-validator');
const User = require('../controllers/user');
const uploadImage = require('../controllers/uploadImage');

const multer = require('multer');
const validate = require('../middlewares/validate');

const router = express.Router();


//INDEX
router.get('/', User.index);

//STORE
router.post('/', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('username').not().isEmpty().withMessage('You username is required'),
], validate, User.store);

//SHOW
router.get('/show', User.show);

//UPDATE
router.put('/update', uploadImage.uploadFile ,User.update);


//DELETE
router.delete('/destroy', User.destroy);

module.exports = router;