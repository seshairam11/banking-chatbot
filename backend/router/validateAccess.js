const express = require('express');
const router = express.Router();
const { signupController } = require('../controllers/SignupController');
const { loginController } = require('../controllers/loginController');
const { UpdateUserDetails } = require('../controllers/UpdateUserDetails');
const { liveChat } = require('../controllers/chatController');
const { passageController, listPassageController, deletePassageController, updatePassageController } = require('../controllers/passageController');
const {testController} = require('../controllers/testController');


router.route('/signup').post(signupController);
router.route('/signin').post(loginController);
router.route('/updateuserdetails').post(UpdateUserDetails);
router.route('/livechat').post(liveChat);
router.route('/createpassage').post(passageController);
router.route('/listpassage').post(listPassageController);
router.route('/updatepassage').post(updatePassageController);
router.route('/deletepassage').post(deletePassageController);
router.route('/test').get(testController);


module.exports = router;