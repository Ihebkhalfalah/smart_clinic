const mongoose= require('mongoose');
const model =mongoose.Schema({
    nom:{ type: String ,  required:true},
   
})


module.exports=mongoose.model('model',model);