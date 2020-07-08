const auth = require('./auth');
const user = require('./user');
const socialAuth = require('./socialAuth');
const normal = require('./normal');
const authenticate = require('../middlewares/authenticate');

const passport = require('passport');


module.exports = app => {
    app.get('/', (req, res) => {
        res.render('home');
    });
    
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/normal', normal);
    app.use('/api/social', socialAuth);


     // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // yêu cầu xác thực bằng facebook
    app.get('/auth/facebook', 
    passport.authenticate('facebook', {scope: ['email']}));

    // xử lý sau khi user cho phép xác thực với facebook
    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        session: false
        }), (req, res) => {
            if (req.user._id) {
                res.json({
                    success: true,
                    _id: req.user._id
            })
            } else {
                res.json({
                    success: false
            })
            }
        }
    );
};