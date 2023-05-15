const express = require('express')
const { registerUser, authUser, allUsers, healthCheck } = require('../controllers/userControllers');
const { protect } = require('../midlleware/authMiddleware');

const router = express.Router();

router.route("/").post(registerUser).get(protect,allUsers);
router.route("/login").post(authUser);
router.route("/health").get(healthCheck);


module.exports=router;