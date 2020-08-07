const User = require('../models/user');
const Family = require('../models/family');

const {ObjectId} = require('mongodb');



// @route POST api/user/{id}
// @desc  Create a new Family
// @access Public
exports.family = async function (req, res) {
    try {
        const userId = req.user._id;

        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
        // res.redirect('/');


        const family = new Family({
            userId: userId,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            nickname: req.body.nickname,
            numphone: req.body.numphone,
            sex: req.body.sex,
            datebirth: req.body.datebirth,
            job: req.body.job,
            address: req.body.address,
            parentage: req.body.parentage,
            relatives: req.body.relatives,
            nation: req.body.nation,
            religion: req.body.religion,
            yourself: req.body.yourself,
            profileImage: req.body.profileImage,
          });
          
       
        // Save the updated event object
        await family.save();
        
        res.status(200).json({ family: family });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// @route PUT api/user/{id}
// @desc Update family details
// @access Public
exports.familyUpdate = async function (req, res) {
    try {
        const update = req.body;
        const id = req.body.id;
        const userId = req.user._id;
        
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const family = await Family.findByIdAndUpdate( {_id: ObjectId(id)}, {$set: update}, {new: true});
         
        await family.save();
        //if there is no image, return success message
        if (!req.file) {
            //console.log('User '+ user.email +' updated profile');
            return res.status(200).json({family, message: 'Family has been updated'});
        }
        
        // There is image
        const family_ = await Family.findByIdAndUpdate( {_id: ObjectId(id)}, {$set: {profileImage: req.file.filename}}, {new: true});
        //console.log('User '+ user_.email +' uploaded image');


        return res.status(200).json({family: family_, message: 'Family has been updated'});

    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};

// @route POST api/user/{id}
// @desc GET the family details of user
// @access Public
exports.familyShowOne = async function (req, res) {
    try {
        const userId = req.user._id;
        const id = req.body.id;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const family = await Family.findById( {_id: ObjectId(id)});

        if (!family) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({family});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route GET api/user/{id}
// @desc GET all families details of user
// @access Public
exports.familyShow = async function (req, res) {
    try {
        const userId = req.user._id;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const family = await Family.find({userId: userId});

        if (!family) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({family});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};



// @route POST api/user/{id}
// @desc Search by name
// @access Public
exports.familySearch = async function (req, res) {
    try {
        const userId = req.user._id;
        const name = req.body.name.trim();
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const family = await Family.find({userId: userId});

        const result = family.filter( (family) => {
		// tìm kiếm chuỗi name_search trong user name. 
		// Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
		return family.fullname.toLowerCase().indexOf(name.toLowerCase()) !== -1
    	})

        if (!result) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({result});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route DELETE api/user/{id}
// @desc Delete The family
// @access Public
exports.destroyFamily = async function (req, res) {
    try {
        const id = req.body.id;

        //Make sure the passed id is that of the logged in user
        //if (user_id.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});

        await Family.findByIdAndDelete({_id: ObjectId(id)});
        res.status(200).json({message: 'The family has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};