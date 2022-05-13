
const jwt=require ('jsonwebtoken');

const message =require('../models/message');

exports.send=(async (req,res,Next) => {


    const msg= new message ({
        receiver:req.body.receiver,
        sender:req.body.sender,
        room:req.body.room,
        msg:req.body.msg
    });
    console.log(msg);

msg.save()
.then(()=>(res.status(201)).json({message:'message added'}))
.catch((error)=>res.status(400).json({error}));
});
exports.sendd=(async (req,res,Next) => {



    const userId=req.body.userId
    console.log(userId);
        message.find({ receiver: userId })
          .then((users) => {
            if (!users) {
              res.status(401).json({ message: "no medecin" });
            }
            
                res.status(200)
                  
                  .json({
                    users
                  });
              })
              .catch((error) => res.status(500).json({ message: error }));
});