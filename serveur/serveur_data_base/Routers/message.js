const express = require('express');
const router=express.Router();
const msgCntrl = require('../Controllers/message');
router.post('/send',msgCntrl.send);
router.post('/sen',msgCntrl.sendd);
module.exports=router;