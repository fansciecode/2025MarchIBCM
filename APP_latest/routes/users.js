const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const multer = require('multer');


router.post('/notifyInfo', userController.notificationInfo);
router.post('/userNotifications',userController.userNotification);
router.post('/verifyOtp', userController.verifyOtp);
router.post('/register', userController.create);
router.post('/updatePassword', userController.updatePassword)
router.post('/authenticate', userController.authenticate);
router.post('/createProfile', userController.createProfile);
router.post('/publicProfile', userController.publicProfile);
router.post('/JoinEvent', userController.JoinEvent);
router.post('/createchat', userController.CreateChat);
router.post('/ChatMessage', userController.ChatMessage);
router.post('/JoinChat', userController.JoinChat);
router.post('/userChatlist',userController.userChatlist);
router.post('/notifcationReponse', userController.notifcationReponse);
router.post('/uploads', userController.uploadImage);
module.exports = router;;