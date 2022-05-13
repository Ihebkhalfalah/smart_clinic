
const model = require("../models/model");

exports.getAllmodel = (req, res, Ncext) => {
  


 

  model.find({})
    .then((users) => {
      if (!users) {
        res.status(401).json({ message: "no model" });
      }
      
          res.status(200)
            
            .json({
              users
            });
        })
        .catch((error) => res.status(500).json({ message: error }));
    
    
};