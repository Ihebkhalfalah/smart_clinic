const mongoose= require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const userSchemas =mongoose.Schema({
    username:{ type: String , unique:true , required:true},
    email:{ type: String , unique:true , required:true},
    password:{ type: String ,  required:true},
    Tokens : [{
        token  : {
type:String,required:true
        }
    }],
    isMedecin :{type:Boolean,require: true}
})
userSchemas.method({
    add(Token) {
     
   
  // const Tokens= this.Tokens;
  this.Tokens.push({token:Token})
   //this.Tokens=Tokens;
  this.save()
     
    }})
userSchemas.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchemas);