const express = require('express');
const inviController = require('../controllers/invitationController');
const router = express.Router();

router.post('/invite-user', inviController.invite);
router.get('/invitation-Received', inviController.invitationReceived);
router.post('/accept-invitation', inviController.acceptInvitation);

//router.get('/logout', controllerUser.removeToken);
module.exports = router;