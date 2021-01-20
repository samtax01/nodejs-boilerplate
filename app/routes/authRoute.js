let router = require('express').Router();
let authController = require('../controllers/authController');
const passport = require('passport');

router.get("/", authController.list)
router.post('/signup', authController.signUp);
router.post('/login', authController.login);


router.post('/renew',
    passport.authenticate('bearer', {session: false}, null),
    authController.renewToken
);

router.patch('/update',
    passport.authenticate('bearer', {session: false}, null),
    authController.update
);

module.exports = router;
