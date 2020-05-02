const express = require('express');
const ChatController = require('../controllers/ChatRoomController');
const router = express.Router();

router.get('/get-all', ChatController.findAllChatRoomByIdUser);

//router.get('/logout', controllerUser.removeToken);
module.exports = router;