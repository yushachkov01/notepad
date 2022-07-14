const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const saveFormSchema = new Schema({ 
    text:String,
    topic: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },

})

module.exports = mongoose.model('SaveForm', saveFormSchema)
    