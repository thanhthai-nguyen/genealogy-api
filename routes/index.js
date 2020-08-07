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
    
    //api xác thực đăng nhập/đăng ký
    app.use('/api/auth', auth);

    //api liên quan đến các chức năng (user account, event, family, genealogy, news )
    app.use('/api/user', authenticate, user);

    //api phụ dành cho việc test
    app.use('/api/normal', normal);

    //api liên kết tài khoản mạng xã hội
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