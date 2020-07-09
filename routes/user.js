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
    check('username').not().isEmpty().withMessage('Your username is required'),
], validate, User.store);

//SHOW
router.get('/show', User.show);

//UPDATE USER 
router.put('/update', uploadImage.uploadFile ,User.update);

//DISPLAY IMAGE
router.get('/image/:filename', uploadImage.displayImage);

//DELETE
router.delete('/destroy', User.destroy);

//CREATE EVENT
router.post('/event', User.events);

//UPDATE EVENT
router.put('/eventupdate', uploadImage.uploadFile ,User.eventUpdate);

//GET THE EVENT BY ID
router.post('/eventshowone', User.eventShowOne);

//GET EVENTS
router.get('/eventshow', User.eventShow);

//DELETE The Event
router.delete('/destroyevent', User.destroyEvent);

//CREATE FAMILY
router.post('/family', User.family);

//UPDATE FAMILY
router.put('/familyupdate',[
    check('firstname').not().isEmpty().withMessage('Your firstname is required'),
    check('lastname').not().isEmpty().withMessage('Your lastname is required'),
], validate, uploadImage.uploadFile ,User.familyUpdate);

//GET THE FAMILY BY ID
router.post('/familyshowone', User.familyShowOne);

//GET FAMILYS
router.get('/familyshow', User.familyShow);

//Search familys by name
router.post('/familysearch', User.familySearch);

//DELETE The Family
router.delete('/destroyfamily', User.destroyFamily);

//Create Genealogy
router.get('/root', User.familyRoot);

//Create leaf
router.post('/leaf', User.familyLeaf);

//Create Spouse leaf
router.post('/spouseleaf', User.familyLeafisSpouse);

//Update Root
router.put('/rootupdate', uploadImage.uploadFile, User.rootUpdate);

//Update Leaf
router.put('/leafupdate', uploadImage.uploadFile, User.leafUpdate);

//GET the family Root details of user
router.post('/rootshowone', User.familyRootShowOne);

//GET the family Leaf details of its root
router.post('/leafshowone', User.familyLeafShowOne);

//GET all Family Root details of user
router.get('/rootshowall', User.familyRootShow);

//GET all Family Leaf details of its Root
router.post('/leafshowall', User.familyLeafShow);

module.exports = router;