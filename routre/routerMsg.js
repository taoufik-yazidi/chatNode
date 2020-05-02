const express = require('express');
const MsgController = require('../controllers/msgController');
const router = express.Router();

router.post('/send', MsgController.sendMsg);
router.post('/getMsg', MsgController.getAllMsgInChat);

//router.get('/logout', controllerUser.removeToken);
module.exports = router;