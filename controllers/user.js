const User = require('../models/user');
const Event = require('../models/event');
const Family = require('../models/family');
const Author = require('../models/authorTree');
const Tree = require('../models/genealogy');


const sendEMail = require('../controllers/sendEmail');
const {ObjectId} = require('mongodb');


// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
    const users = await User.find({});
    res.status(200).json({users});
};


// @route POST api/user
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
    try {
        const {email} = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({email});

        if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account. You can change this users role instead.'});

        const password = '_' + Math.random().toString(36).substr(2, 9); //generate a random password
        const newUser = new User({...req.body, password});

        const user_ = await newUser.save();

        //Generate and set password reset token
        user_.generatePasswordReset();

        // Save the updated user object
        await user_.save();

        //Get mail options
        let domain = "http://" + req.headers.host;
        let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
        let html = `<p>Hi ${user.username}<p><br><p>A new account has been created for you on ${domain}. Please click on the following <a href="${link}">link</a> to set your password and login.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`

        await new sendEMail(user, html).newAccountCreated();

        res.status(200).json({message: 'An email has been sent to ' + user.email + '.'});

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
    try {
        const id = req.params.id;
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) return res.status(401).json({message: 'User does not exist'});

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;
        const userId = req.user._id;

        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const user = await User.findByIdAndUpdate(userId, {$set: update}, {new: true});

        //if there is no image, return success message
        if (!req.file) {
            console.log('User '+ user.email +' updated profile');
            return res.status(200).json({user, message: 'User has been updated'});
        }
        
        // There is image
        const user_ = await User.findByIdAndUpdate(userId, {$set: {profileImage: req.file.filename}}, {new: true});
        console.log('User '+ user_.email +' uploaded image');

        return res.status(200).json({user: user_, message: 'User has been updated'});

    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route DELETE api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        const user_id = req.user._id;

        //Make sure the passed id is that of the logged in user
        //if (user_id.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});

        await User.findByIdAndDelete(user_id);
        res.status(200).json({message: 'User has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// @route POST api/user/{id}
// @desc  Create a new Event
// @access Public
exports.events = async function (req, res) {
    try {
        const userId = req.user._id;

        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
        // res.redirect('/');

        const event = new Event({
            userId: userId,
            event: req.body.event,
            time: req.body.time,
            date: req.body.date,
            catelogy: req.body.catelogy,
            group: req.body.group,
            bio: req.body.bio,
            address: req.body.address,
            eventImage: req.body.eventImage,
          });
        // Save the updated event object
        await event.save();

        res.status(200).json({ event: event });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// @route PUT api/user/{id}
// @desc Update event details
// @access Public
exports.eventUpdate = async function (req, res) {
    try {
        const update = req.body;
        const id = req.body.id;
        
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const event = await Event.findByIdAndUpdate( {_id: ObjectId(id)}, {$set: update}, {new: true});

        //if there is no image, return success message
        if (!req.file) {
            //console.log('User '+ user.email +' updated profile');
            return res.status(200).json({event, message: 'Event has been updated'});
        }
        
        // There is image
        const event_ = await Event.findByIdAndUpdate( {_id: ObjectId(id)}, {$set: {eventImage: req.file.filename}}, {new: true});
        //console.log('User '+ user_.email +' uploaded image');

        return res.status(200).json({event: event_, message: 'Event has been updated'});

    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route POST api/user/{id}
// @desc GET the event details of user
// @access Public
exports.eventShowOne = async function (req, res) {
    try {
        const userId = req.user._id;
        const id = req.body.id;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const event = await Event.findById({_id: ObjectId(id)});

        if (!event) return res.status(401).json({message: 'There are no events to display'});

        res.status(200).json({event});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route GET api/user/{id}
// @desc GET all events details of user
// @access Public
exports.eventShow = async function (req, res) {
    try {
        const userId = req.user._id;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const event = await Event.find({userId: userId});

        if (!event) return res.status(401).json({message: 'There are no events to display'});

        res.status(200).json({event});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};

// @route DELETE api/user/{id}
// @desc Delete The Event
// @access Public
exports.destroyEvent = async function (req, res) {
    try {
        const id = req.body.id;

        //Make sure the passed id is that of the logged in user
        //if (user_id.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});

        await Event.findByIdAndDelete({_id: ObjectId(id)});
        res.status(200).json({message: 'The event has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

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



// @route POST api/user/{id}
// @desc  Create a new Geanealogy Tree
// @access Public
exports.authorTree = async function (req, res) {
    try {
        const userId = req.user._id;

        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
        // res.redirect('/');


        const auth = new Author({
            userId: userId,
            treename: req.body.treename,
            author: req.body.author,
            address: req.body.address,
            numGen: 1,
            numMem: 1,
            profileImage: req.body.imgauth,
          });
    
        //Save author of tree
        await auth.save();

        const root = new Tree({
            userId: userId,
            authId: auth._id,
            parentId: auth._id,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            sex: req.body.sex,
            numphone: req.body.numphone,
            dob: req.body.dob,
            domicile: req.body.domicile,
            dod: req.body.dod,
            burialplace: req.body.burialplace,
            profileImage: req.body.imgroot,
            rank: req.body.rank,
          });
    
        // Save root node 
        await root.save();

        res.status(200).json({ auth, root});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// @route POST api/user/{id}
// @desc  Create a new Leaf Genealogy Tree  
// @access Public
exports.tree = async function (req, res) {
    try {
        const userId = req.user._id;
        const parentId = req.body.parentId;

        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
        // res.redirect('/');

        const parent = await Tree.findById(parentId);
        const auth = await Author.findById(req.body.authId);

        if (!parent) {
            return res.status(401).json({message: 'The parent node does not exist'});
        }

        // const Gen = await Tree.findOne({ parentId: parentId });

        // if (!Gen) {
        //     auth.numGen = auth.numGen + 1;
        // }


        const leaf = new Tree({
            userId: userId,
            authId: req.body.authId,
            parentId: parentId,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            sex: req.body.sex,
            numphone: req.body.numphone,
            dob: req.body.dob,
            domicile: req.body.domicile,
            dod: req.body.dod,
            burialplace: req.body.burialplace,
            profileImage: req.body.profileImage,
            rank: req.body.rank,
          });
    
        // Save root node 
        await leaf.save();

       
        auth.numMem = auth.numMem + 1;
        
        await auth.save();


        return res.status(200).json({leaf, message: 'Genealogy has been updated'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// @route POST api/user/{id}
// @desc  Create a new Leaf Genealogy Tree is Spouse
// @access Public
exports.treeSpouse = async function (req, res) {
    try {
        const userId = req.user._id;
        const spouseId = req.body.spouseId;

        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
        // res.redirect('/');

        const spouse = await Tree.findById(spouseId);

        if (!spouse) {
            return res.status(401).json({message: 'The spouse node does not exist'});
        }

        const leaf = new Tree({
            userId: userId,
            spouseId: spouseId,
            authId: req.body.authId,
            isSpouse: true,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            numphone: req.body.numphone,
            sex: req.body.sex,
            dob: req.body.dob,
            domicile: req.body.domicile,
            dod: req.body.dod,
            burialplace: req.body.burialplace,
            profileImage: req.body.profileImage,
            rank: req.body.rank,
          });
    
        // Save root node 
        await leaf.save();

        const auth = await Author.findById(req.body.authId);

        auth.numMem = auth.numMem + 1;
        
        await auth.save();

        return res.status(200).json({leaf, message: 'Genealogy has been updated'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



// @route PUT api/user/{id}
// @desc Update Leaf Genealogy 
// @access Public
exports.leafUpdate = async function (req, res) {
    try {
        const update = req.body;
        const leafId = req.body.leafId;
        
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const leaf = await Tree.findByIdAndUpdate( {_id: ObjectId(leafId)}, {$set: update}, {new: true});
        
        await leaf.save();
        //if there is no image, return success message
        if (!req.file) {
            //console.log('User '+ user.email +' updated profile');
            return res.status(200).json({leaf, message: 'Genealogy has been updated'});
        }
        
        // There is image
        const leaf_ = await Tree.findByIdAndUpdate( {_id: ObjectId(leafId)}, {$set: {profileImage: req.file.filename}}, {new: true});
        //console.log('User '+ user_.email +' uploaded image');

        return res.status(200).json({leaf_, message: 'Genealogy has been updated'});

    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route POST api/user/{id}
// @desc GET one Leaf Genealogy Tree by ID
// @access Public
exports.leafShowOne = async function (req, res) {
    try {
        const leafId = req.body.leafId;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const leaf = await Tree.findById( {_id: ObjectId(leafId)});

        if (!leaf) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({leaf});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route GET api/user/{id}
// @desc GET ALL Leaf Genealogy Tree of Author
// @access Public
exports.leafShowAll = async function (req, res) {
    try {
        const authId = req.body.authId;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const leaf = await Tree.find({authId: authId});

        if (!leaf) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({leaf});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route GET api/user/{id}
// @desc GET ALL Leaf Genealogy Tree of Parent Node
// @access Public
exports.leafShow = async function (req, res) {
    try {
        const parentId = req.body.parentId;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const leaf = await Tree.find({parentId: parentId});

        if (!leaf) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({leaf});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route GET api/user/{id}
// @desc GET ALL Leaf Spouse Genealogy Tree of Parent Node
// @access Public
exports.leafSpouseShow = async function (req, res) {
    try {
        const spouseId = req.body.spouseId;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const leafspouse = await Tree.find({spouseId: spouseId});

        if (!leafspouse) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({leafspouse});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};




// @route PUT api/user/{id}
// @desc Update Author Genealogy Tree 
// @access Public
exports.authorUpdate = async function (req, res) {
    try {
        const update = req.body;
        const authId = req.body.authId;
        
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const auth = await Author.findByIdAndUpdate( {_id: ObjectId(authId)}, {$set: update}, {new: true});
         
        //if there is no image, return success message
        if (!req.file) {
            //console.log('User '+ user.email +' updated profile');
            return res.status(200).json({auth, message: 'Genealogy has been updated'});
        }
        
        // There is image
        const auth_ = await Author.findByIdAndUpdate( {_id: ObjectId(authId)}, {$set: {profileImage: req.file.filename}}, {new: true});
        //console.log('User '+ user_.email +' uploaded image');

        return res.status(200).json({auth_, message: 'Genealogy has been updated'});

    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};

// @route POST api/user/{id}
// @desc GET one Author Genealogy Tree by ID
// @access Public
exports.authShowOne = async function (req, res) {
    try {
        const authId = req.body.authId;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const auth = await Author.findById( {_id: ObjectId(authId)});

        if (!auth) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({auth});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route GET api/user/{id}
// @desc GET ALL Author Genealogy Tree by ID
// @access Public
exports.authShowAll = async function (req, res) {
    try {
        const userId = req.user._id;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const auth = await Author.find({userId: userId});

        if (!auth) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({auth});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};

// @route DELETE api/user/{id}
// @desc Delete one Genealogy Tree
// @access Public
exports.destroyTree = async function (req, res) {
    try {
        const authId = req.body.authId;

        //Make sure the passed id is that of the logged in user
        //if (user_id.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});

        await Tree.deleteMany({ authId: authId });

        await Author.findByIdAndDelete({_id: ObjectId(authId)});

        res.status(200).json({message: 'The Genealogy Tree has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// @route DELETE api/user/{id}
// @desc Delete one Genealogy Tree
// @access Public
exports.destroyLeaf = async function (req, res) {
    try {
        const leafId = req.body.leafId;

        //Make sure the passed id is that of the logged in user
        //if (user_id.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});

        const leaf = await Tree.findOne({parentId: leafId});
        
        //console.log(leaf);
        if (leaf) return res.status(401).json({message: 'Cannot be deleted because this node has branches'});

        const leafspouse = await Tree.findOne({spouseId: leafId});
        //console.log(leafspouse);
        if (leafspouse) return res.status(401).json({message: 'Cannot be deleted because this node has branches'});

        const leaf_ = await Tree.findById({_id: leafId});
        
        const auth = await Author.findById(ObjectId(leaf_.authId));

        auth.numMem = auth.numMem - 1;
        
        await auth.save();

        await Tree.findByIdAndDelete({_id: ObjectId(leafId)});

        res.status(200).json({message: 'The Leaf Genealogy Tree has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route POST api/user/{id}
// @desc Upload Image
// @access Public
exports.uploadimage = async function (req, res) {
    try {
       
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');


        //if there is no image, return success message
        if (!req.file) {
            return res.status(401).json({message: 'There is no image. Please check out again'});
        }
        
        // There is image
        return res.status(200).json({profileImage: req.file.filename});

    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};



// @route GET api/user/{id}
// @desc GET ALL Users linked with Family 
// @access Public
exports.friends = async function (req, res) {
    try {
        const userId = req.user._id;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const friends = await Family.find({email: req.user.email}, 'userId')
                                    .populate({
                                        path: "userId",
                                        select: "email username numphone profileImage",
                                        model: User,
                                    });

        if (!friends) return res.status(401).json({message: 'There are no info to display'});


        res.status(200).json({friends});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route GET api/user/{id}
// @desc GET ALL Author Genealogy Tree isPublish by ID 
// @access Public
exports.publicGenealogy = async function (req, res) {
    try {
        const userId = req.body.userId;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const auth = await Author.find({userId: userId, isPublish: true});

        if (!auth) return res.status(401).json({message: 'There are no info to display'});

        res.status(200).json({auth});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};



// @route GET api/user/{id}
// @desc Share the Genealogy
// @access Public
exports.shareGenealogy = async function (req, res) {
    try {
        const userId = req.user._id;
        const authId = req.body.authId;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const auth = await Author.findById( {_id: ObjectId(authId)});

        if (!auth) return res.status(401).json({message: 'There are no info to display'});

        auth.isPublish = true;

        await auth.save();

        res.status(200).json({auth});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};



// @route GET api/user/{id}
// @desc Remove Share the Genealogy
// @access Public
exports.removeShareGenealogy = async function (req, res) {
    try {
        const userId = req.user._id;
        const authId = req.body.authId;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const auth = await Author.findById( {_id: ObjectId(authId)});

        if (!auth) return res.status(401).json({message: 'There are no info to display'});

        auth.isPublish = false;

        await auth.save();

        res.status(200).json({auth});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};


// @route GET api/user/{id}
// @desc GET ALL Author Tree linked with numphone of Node 
// @access Public
exports.numphoneLink = async function (req, res) {
    try {
        const userId = req.user._id;
        
        //Make sure the passed id is that of the logged in user
        //if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
        if (!req.isAuthenticated()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});
        // if they aren't redirect them to the home page
       // res.redirect('/');

        const tree = await Tree.find({numphone: req.body.numphone}, 'authId')
                                    .populate({
                                        path: "authId",
                                        select: "treename author address numMem profileImage",
                                        model: Author,
                                    });

        if (!tree) return res.status(401).json({message: 'There are no info to display'});


        res.status(200).json({tree});
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }
};