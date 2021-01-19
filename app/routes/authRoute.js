let router = require('express').Router();
let authController = require('../controllers/authController');
const passport = require('passport');

router.get("/", authController.list)
router.post('/signup', authController.signUp);
router.post('/login', authController.login);


router.post('/renew',
    passport.authenticate('bearer', {session: false}, null),
    // middleware(userValidator.listUsers, 'params')
    authController.newToken
);

module.exports = router;
