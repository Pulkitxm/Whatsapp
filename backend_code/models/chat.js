const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  chats: Array
});

chatSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Chat', chatSchema)