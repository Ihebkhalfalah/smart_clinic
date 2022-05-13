const mongoose= require('mongoose');
const messageSchemas =mongoose.Schema({
    sender:{ type: String ,  required:true},
    receiver:{ type: String ,  required:true},
    room:{ type: String ,  required:true},
    msg : [{
        room  : {
type:String,required:true
        },  message  : {
            type:String,required:true
                    },  author  : {
                        type:String,required:true
                                },time:  {
                                    type:String,required:true
                                            }
    }]
})


module.exports=mongoose.model('message',messageSchemas);