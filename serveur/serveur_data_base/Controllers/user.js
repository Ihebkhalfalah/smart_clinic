const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const cookieParser = require("cookie-parser");

exports.signup = async (req, res, Next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      isMedecin: req.body.role=='Medecin',
      password: hash,
    });

    user
      .save()
      .then(() => res.status(201).json({ message: "user crée" }))
      .catch((error) => res.status(400).json({ error }));
  }); 
};
exports.signin = (req, res, Next) => {
  console.log(req.body)
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "email incorret " });
      }
     
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "mot de passe incorrect " });
          }
console.log(user._id)
          const Token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          user.add(Token);

          res
            .cookie("jwt", Token, {
              expires: new Date(Date.now() + 86400000),
            })
            .status(200)
            
            .json({
              role: user.isMedecin
            })
        })
      })
};

exports.logout = (req, res) => {
  res.clearCookie("jwt", { path: "/" });

  res.status(200).send("user logged out");
};
exports.getAllMedecin = (req, res, Ncext) => {
  


 

  User.find({ isMedecin: true })
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
    
    
};