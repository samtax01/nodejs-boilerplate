let router = require('express').Router();
let controller = require('../controllers/blogController');
const passport = require('passport');

// List
router.get("/", controller.list)

// Get
router.get("/:id", controller.get)

// Update
router.patch("/:id", controller.update);

// Delete
router.delete("/:id", controller.delete);

// Create
router.post("/",
    passport.authenticate('bearer', {session: false}, null),
    controller.create
);

module.exports = router;