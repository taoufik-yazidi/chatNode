const express = require('express');
const controllerUser = require('../controllers/UserController');
const mailControlller = require('../controllers/mailController');
const router = express.Router();
router.post('/save', controllerUser.saveUser);
router.get('/identif', controllerUser.findMe);
router.post('/login', controllerUser.login);
router.post('/active', controllerUser.activeAccount);
router.get('/all-users', controllerUser.findAllUser);
router.post('/get-users-by-first-name', controllerUser.findUserByName);
router.post('/getUsersById', controllerUser.findUserById);

//router.get('/logout', controllerUser.removeToken);
module.exports = router;