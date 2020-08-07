const express = require('express');
const {check} = require('express-validator');
const User = require('../controllers/user');
const Event = require('../controllers/event');
const Family = require('../controllers/family');
const Genealogy = require('../controllers/genealogy');
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

//UPLOAD IMAGE
router.post('/uploadimg', uploadImage.uploadFile, User.uploadimage);

//DISPLAY IMAGE
router.get('/image/:filename', uploadImage.displayImage);

//DELETE
router.delete('/destroy', User.destroy);

//CREATE EVENT
router.post('/event', Event.events);

//UPDATE EVENT
router.put('/eventupdate', uploadImage.uploadFile ,Event.eventUpdate);

//GET THE EVENT BY ID
router.post('/eventshowone', Event.eventShowOne);

//GET EVENTS
router.get('/eventshow', Event.eventShow);

//DELETE The Event
router.delete('/destroyevent', Event.destroyEvent);

//CREATE FAMILY
router.post('/family', Family.family);

//UPDATE FAMILY
router.put('/familyupdate',[
    check('firstname').not().isEmpty().withMessage('Your firstname is required'),
    check('lastname').not().isEmpty().withMessage('Your lastname is required'),
], validate, uploadImage.uploadFile ,Family.familyUpdate);

//GET THE FAMILY BY ID
router.post('/familyshowone', Family.familyShowOne);

//GET FAMILYS
router.get('/familyshow', Family.familyShow);

//Search familys by name
router.post('/familysearch', Family.familySearch);

//DELETE The Family
router.delete('/destroyfamily', Family.destroyFamily);

//Create Genealogy Tree
router.post('/newtree', Genealogy.authorTree);

//Create Leaf Genealogy Tree
router.post('/newleaf', Genealogy.childs);

//Create Parent Leaf 
router.post('/parentleaf', Genealogy.parents);

//Create Spouse leaf
router.post('/spouseleaf', Genealogy.spouses);

//Update Author Genealogy Tree
router.put('/authorupdate', uploadImage.uploadFile, Genealogy.authorUpdate);

//Update Leaf Genealogy Tree
router.put('/leafupdate', uploadImage.uploadFile, Genealogy.leafUpdate);

//GET the Author details of Genealogy Tree
router.post('/authshowone', Genealogy.authShowOne);

//GET all Author Genealogy Tree details of user
router.get('/authshowAll', Genealogy.authShowAll);

//GET the Leaf Genealogy Tree details 
router.post('/leafshowone', Genealogy.leafShowOne);

//GET all Leaf Genealogy Tree of Parent Node
router.post('/leafshow', Genealogy.leafShow);

//GET all Leaf Spouse Genealogy Tree of Parent Node
router.post('/leafspouseshow', Genealogy.leafSpouseShow);

//GET all Leaf  details of its Genealogy Tree
router.post('/leafshowall', Genealogy.leafShowAll);

//DELETE The Genealogy Tree
router.delete('/destroytree', Genealogy.destroyTree);

//DELETE one Leaf Genealogy Tree
router.delete('/destroyleaf', Genealogy.destroyLeaf);

//GET Friends Linked with Family
router.get('/friends', Genealogy.friends);

//Share the Genealogy
router.post('/sharetree', Genealogy.shareGenealogy);

//Remove Share the Genealogy
router.post('/resharetree', Genealogy.removeShareGenealogy);

//GET ALL Author Genealogy Tree isPublish by ID
router.post('/publictree', Genealogy.publicGenealogy);

//GET Tree Linked with with numphone of Node 
router.post('/linktree', Genealogy.numphoneLink);

module.exports = router;