const auth = require('./auth');
const user = require('./user');
const normal = require('./normal');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('home');
    });
    
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/normal', normal);
};