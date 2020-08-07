const User = require('../models/user');
const Event = require('../models/event');

const {ObjectId} = require('mongodb');


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