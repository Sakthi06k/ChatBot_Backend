const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
            count:String,
            name:String,
            email:{
                type:String,
                lowercase:true
                
            },
            address:String,
            pass:String,
            chat:["Chat new"] 
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;