const express = require('express');
const router=express.Router();
const userCntrl = require('../Controllers/user');
const modelCntrl = require('../Controllers/model');
const auth = require('../auth/auth');

router.get('/getallmodel',modelCntrl.getAllmodel);
module.exports=router;