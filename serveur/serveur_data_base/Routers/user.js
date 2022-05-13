const express = require('express');
const router=express.Router();
const userCntrl = require('../Controllers/user');
const auth = require('../auth/auth');
router.post('/signup',userCntrl.signup);
router.post('/signin',userCntrl.signin);
router.get('/logout',userCntrl.logout);
router.get('/getAllMedecin',userCntrl.getAllMedecin);
module.exports=router;